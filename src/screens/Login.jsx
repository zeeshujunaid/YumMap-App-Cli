import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Screen</Text>
            <Button
                title="Go to Signup"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    );
}