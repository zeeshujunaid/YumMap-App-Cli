import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ headerShown: true }} initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen}/>
  </Drawer.Navigator>
);

export default DrawerNavigator;