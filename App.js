import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SafeAreaView, useColorScheme } from 'react-native';
// import { Colors } from './constants/Colors';

// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
import TabNavigator from './navigation/TabNavigator';

// const Stack = createNativeStackNavigator();

// const AppContainer = ({ children }) => {
//   const colorScheme = useColorScheme();
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? 'light'].background }}>
//       {children}
//     </SafeAreaView>
//   );
// };

export default function App() {
  return (
    <NavigationContainer>
      {/* <AppContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </Stack.Navigator>
      </AppContainer> */}

      {/* Giriş ekranları yorumda, direkt MainApp'e yönleniyoruz */}
      <TabNavigator />
    </NavigationContainer>
  );
}
