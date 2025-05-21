import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';

export default function Loader({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('MainApp');
  };


  return (
    <ImageBackground
      source={require('../../assets/bgyummap.png')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {/* Overlay for better readability */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.6)',
          width: '100%',
          height: '100%',
        }}
      />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        {/* App Logo */}
        <Image
          source={require('../../assets/YumMap.png')}
          style={{
            width: 250,
            height: 240,
            marginBottom: 30,
            padding: 10,
          }}
        />

        {/* Title */}
        <Text
          style={{
            fontSize: 40,
            fontWeight: 'bold',
            color: '#f7bf56',
            marginBottom: 10,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 2,
          }}
        >
          Welcome
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 20,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 40,
            paddingHorizontal: 10,
          }}
        >
          Discover the best food around you!
        </Text>
      </View>
    </ImageBackground>
  );
}
