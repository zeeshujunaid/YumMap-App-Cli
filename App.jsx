import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/appnavigator';
import { RestaurantProvider } from './src/context/Resturantcontext'; // ✅ Corrected

export default function App() {
  return (
    <RestaurantProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </RestaurantProvider>
  );
}
