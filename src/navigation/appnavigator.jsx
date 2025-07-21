// src/navigation/AppNavigator.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import SignupScreen from '../screens/Signup';
import DrawerNavigator from './drawernavigator';
import Loader from '../screens/Loader';
import Profilesignup from '../screens/Profilesignup'; 
import Resturantsignup from '../screens/Resturantsignup';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='RestaurantSignup'>
        <Stack.Screen name="Loader" component={Loader} />
          <Stack.Screen name="MainApp" component={DrawerNavigator} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Profilesignup" component={Profilesignup} />
          <Stack.Screen name="RestaurantSignup" component={Resturantsignup} />
    </Stack.Navigator>
  );
};

export default AppNavigator;