import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation/Mainnavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <MainNavigator />
    </NavigationContainer>
  );
}