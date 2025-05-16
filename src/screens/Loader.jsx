import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Loader(){
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Loading...</Text>
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

