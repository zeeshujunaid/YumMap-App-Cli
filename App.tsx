import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/appnavigator';
// import {AuthProvider} from './src/context/Authcontext';
// import {navigationRef} from './src/navigation/navigationRef';

export default function App() {
  return (
    <NavigationContainer>
    {/* <NavigationContainer ref={navigationRef}> */}
      {/* <AuthProvider> */}
        <AppNavigator />
      {/* </AuthProvider> */}
    </NavigationContainer>
  );
}
