import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';

export default function Loader({ navigation }) {
  const handleContinue = () => {
    navigation.navigate('Home'); // Update if needed
  };

  const { width, height } = Dimensions.get('window');

  return (
    <ImageBackground
      source={{ uri: 'https://enatega.com/wp-content/uploads/2023/10/Asset-2-1536x717-1.webp' }}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      {/* Overlay for better readability */}
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.4)',
          width: '100%',
          height: '100%',
        }}
      />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        {/* App Logo */}
        <Image
          source={require('../../assets/YumMap.png')}
          style={{
            width: 160,
            height: 160,
            marginBottom: 30,
            borderRadius: 20,
            backgroundColor: '#fff',
            padding: 10,
          }}
        />

        {/* Title */}
        <Text
          style={{
            fontSize: 36,
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
            fontSize: 18,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: 40,
            paddingHorizontal: 10,
          }}
        >
          Discover the best food around you!
        </Text>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={handleContinue}
          style={{
            backgroundColor: '#f7bf56',
            paddingVertical: 14,
            paddingHorizontal: 50,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 6,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
