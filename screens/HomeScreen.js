import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const handleProfilePress = () => {
    alert('Profil ve Ayarlar buraya gelecek!');
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const plan = [
    { id: '1', time: '10:00', task: 'Dişçi' },
    { id: '2', time: '13:00', task: 'Toplantı' },
    { id: '3', time: '16:00', task: 'Spor' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: '#F6EDDB' }]}>
      <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
        <Ionicons name="person-circle-outline" size={32} color="#4E4034" />
      </TouchableOpacity>

      <Text style={styles.greeting}>🎉 Günaydın, Eren</Text>
      <Text style={styles.date}>📅 Bugün: {dateString}</Text>

      <View style={styles.weatherBox}>
        <Text style={styles.weatherText}>☀️ 24°C, Güneşli</Text>
        <Text style={styles.advice}>
          Bugün hava sıcak, açık renkli ve hafif kıyafetler tercih edebilirsin.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>📝 Bugünkü Planın</Text>
      <FlatList
        data={plan}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.planItem}>
            <Text style={styles.planTime}>{item.time}</Text>
            <Text style={styles.planTask}>{item.task}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  profileButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4E4034',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    color: '#4E4034',
    marginBottom: 16,
  },
  weatherBox: {
    backgroundColor: '#FFD6BA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  weatherText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4E4034',
  },
  advice: {
    color: '#4E4034',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4E4034',
  },
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planTime: {
    fontWeight: 'bold',
    color: '#C6A38B',
    marginRight: 8,
    width: 60,
  },
  planTask: {
    color: '#4E4034',
    fontSize: 16,
  },
});
