import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/appnavigator';
import { RestaurantContext } from './src/context/Resturantcontext';


export default function App() {
  return (
    <NavigationContainer>
      <RestaurantContext>
        <AppNavigator />
      </RestaurantContext>
    </NavigationContainer>
  );
}
