import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Eksik bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }

    Alert.alert('Kayıt Başarılı', 'Artık giriş yapabilirsiniz!');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Kayıt Ol</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.tabText}>Giriş</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={styles.activeTabText}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="İsim"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TextInput
          placeholder="Email adresi"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TextInput
          placeholder="Şifre"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Zaten hesabın var mı?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Giriş yap
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F6EDDB',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    card: {
      backgroundColor: '#FAF5E8',
      borderRadius: 20,
      padding: 24,
      width: '100%',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#4E4034',
      textAlign: 'center',
      marginBottom: 20,
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    tab: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      marginHorizontal: 5,
      backgroundColor: '#EDD6C4',
    },
    activeTab: {
      backgroundColor: '#C6A38B',
    },
    tabText: {
      color: '#4E4034',
      fontWeight: '600',
    },
    activeTabText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    input: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#BCCCE0',
    },
    primaryButton: {
      backgroundColor: '#C6A38B',
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    primaryButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    footerText: {
      marginTop: 20,
      textAlign: 'center',
      color: '#4E4034',
    },
    link: {
      color: '#4E4034',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });