import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Animated,
  StyleSheet,
  StatusBar,
} from 'react-native';

export default function Loader({ navigation }) {
  const logoScale = useRef(new Animated.Value(1.8)).current;

  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  

  return (
    <ImageBackground
      source={require('../../assets/yummapbg2.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <StatusBar hidden={true} />
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Animated.Image
          source={require('../../assets/YumMap.png')}
          style={[styles.logo, { transform: [{ scale: logoScale }] }]}
        />

        <Text style={styles.title}>Welcome To</Text>
        <Text style={styles.subtitle}>A Food Discovery App!</Text>

        {/* <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity> */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 240,
    marginBottom: 30,
  },
  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fae7c1',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  // button: {
  //   backgroundColor: '#f7bf56',
  //   paddingVertical: 14,
  //   paddingHorizontal: 40,
  //   borderRadius: 30,
  //   elevation: 5,
  // },
  // buttonText: {
  //   color: '#000',
  //   fontWeight: '600',
  //   fontSize: 16,
  // },
});
