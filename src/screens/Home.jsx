import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth().signOut();
      Alert.alert('Logged Out', 'You have been successfully logged out.');
      navigation.replace('Login'); // Redirect to Login screen
    } catch (error) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Needed to add map on the home screen</Text>

      <View style={styles.logoutButton}>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 20,
    width: '60%',
  },
});
