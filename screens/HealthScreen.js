import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

export default function HealthScreen() {
  const [waterCount, setWaterCount] = useState(0);
  const [mealLogged, setMealLogged] = useState(false);
  const colorScheme = useColorScheme();

  const handleDrinkWater = () => setWaterCount(waterCount + 1);
  const handleLogMeal = () => setMealLogged(true);

  return (
    <View style={[styles.container, { backgroundColor: '#F6EDDB' }]}>
      <Text style={styles.header}>💧 Sağlık ve Beslenme</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Günlük su alımı:</Text>
        <Text style={styles.value}>{waterCount} bardak</Text>
        <Button title="💦 Su İçtim" onPress={handleDrinkWater} />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Yemek Girişi:</Text>
        <Text style={styles.value}>{mealLogged ? "✓ Kaydedildi" : "Henüz girilmedi"}</Text>
        <Button title="🍽️ Bugünkü Yemeği Kaydet" onPress={handleLogMeal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  section: {
    marginBottom: 40,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4E4034',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
