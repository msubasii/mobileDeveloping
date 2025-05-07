import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const presetColors = ['#FFD6BA', '#CDEAC0', '#BCCCE0', '#FAD2E1', '#E8E8E8'];

export default function ListScreen() {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [categories, setCategories] = useState([
    { name: 'Alınacaklar', color: '#FFD6BA' },
    { name: 'Yapılacaklar', color: '#CDEAC0' },
    { name: 'Sınav', color: '#BCCCE0' },
    { name: 'Ödev', color: '#FAD2E1' },
  ]);
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const addTask = () => {
    if (!newTaskText.trim()) return;
    const task = {
      id: Date.now().toString(),
      text: newTaskText,
      category: selectedCategory,
      color: selectedColor || selectedCategory.color,
      dueDate,
      completed: false,
    };
    setTasks(prev => [...prev, task]);
    resetModal();
  };

  const resetModal = () => {
    setModalVisible(false);
    setNewTaskText('');
    setSelectedCategory(categories[1]);
    setSelectedColor(null);
    setNewCategoryName('');
    setDueDate(null);
    setShowDatePicker(false);
  };

  const addCategory = () => {
    if (!newCategoryName.trim() || !selectedColor) return;
    const newCat = { name: newCategoryName, color: selectedColor };
    setCategories(prev => [...prev, newCat]);
    setSelectedCategory(newCat);
    setNewCategoryName('');
    setSelectedColor(null);
  };

  const toggleTask = id => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.taskItem, { borderLeftColor: item.color }]}
      onPress={() => toggleTask(item.id)}
    >
      <View
        style={[
          styles.checkBox,
          { backgroundColor: item.completed ? '#C6A38B' : '#fff' },
        ]}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.taskText,
            {
              textDecorationLine: item.completed ? 'line-through' : 'none',
            },
          ]}
        >
          {item.text}
        </Text>
        {item.dueDate && (
          <Text style={styles.taskDue}>
            ⏰ {new Date(item.dueDate).toLocaleString('tr-TR')}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.categoryTitle}>🟢 Yapılacaklar</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="add-circle-outline" size={30} color="#4E4034" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz görev yok.</Text>}
      />

      {/* Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent>
        <BlurView intensity={50} tint="light" style={styles.blurContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Yeni Görev</Text>

            <TextInput
              placeholder="Görev başlığı..."
              style={styles.input}
              value={newTaskText}
              onChangeText={setNewTaskText}
            />

            <Text style={styles.label}>Kategori Seç:</Text>
            <View style={styles.categoryRow}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.name}
                  style={[
                    styles.categoryButton,
                    {
                      backgroundColor: cat.color,
                      borderWidth: selectedCategory.name === cat.name ? 2 : 0,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Yeni Kategori Ekle:</Text>
            <TextInput
              placeholder="Kategori adı"
              style={styles.input}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
            />
            <View style={styles.colorRow}>
              {presetColors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorCircle,
                    {
                      backgroundColor: color,
                      borderWidth: selectedColor === color ? 2 : 0,
                    },
                  ]}
                  onPress={() => setSelectedColor(color)}
                />
              ))}
            </View>
            <TouchableOpacity style={styles.smallButton} onPress={addCategory}>
              <Text style={styles.smallButtonText}>➕ Kategori Ekle</Text>
            </TouchableOpacity>

            {/* Tarih Butonu */}
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar-outline" size={20} color="#4E4034" />
              <Text style={{ marginLeft: 8 }}>
                {dueDate
                  ? new Date(dueDate).toLocaleString('tr-TR')
                  : 'Tarih & Saat Seç'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Görevi Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetModal}>
              <Text style={styles.cancelText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      {/* DateTimePicker modal dışarıda */}
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="datetime"
        date={dueDate || new Date()}
        onConfirm={(date) => {
          setDueDate(date);
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
        locale="tr-TR"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EDDB', padding: 20 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E4034',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 6,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4E4034',
    marginRight: 12,
  },
  taskText: {
    fontSize: 16,
    color: '#4E4034',
  },
  taskDue: {
    fontSize: 12,
    color: '#4E4034',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4E4034',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    backgroundColor: '#F1F1F1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#4E4034',
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  categoryButton: {
    padding: 8,
    borderRadius: 8,
    margin: 5,
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginHorizontal: 5,
    borderColor: '#4E4034',
  },
  smallButton: {
    backgroundColor: '#FFF2DD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  smallButtonText: {
    color: '#4E4034',
    fontWeight: 'bold',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BCCCE0',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#C6A38B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#4E4034',
    textDecorationLine: 'underline',
  },
});
