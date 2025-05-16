import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function SignupScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}