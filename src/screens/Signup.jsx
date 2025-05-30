import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function SignupScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>SIGNUP SCREEN FOR RES AND USER BOTH </Text>
            <Button
                title="Go to Home"
                onPress={() => navigation.navigate('MainApp')}
            />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
