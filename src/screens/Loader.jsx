import React, {useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RestaurantContext} from '../context/Resturantcontext';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Loader({navigation}) {
  const {setrestaurantdata} = useContext(RestaurantContext);

  // ✅ Fetch restaurant data from Firestore
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const restaurantdata = await firestore()
          .collection('Resturantdata')
          .get();

        const data = restaurantdata.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Check if data is not empty
        if (data.length > 0) {
          console.log('restaurant data', data);
          setrestaurantdata(data);

          // ✅ Check if user is already logged in
          const currentUser = auth().currentUser;

          if (currentUser) {
            // ✅ Store user UID in AsyncStorage and navigate to MainApp
            console.log('User already logged in:', currentUser.uid);
            await AsyncStorage.setItem('userUid', currentUser.uid);
            navigation.navigate('MainApp');
          } else {
            // ✅ Navigate to Login screen if no user is logged in
            navigation.navigate('Login');
          }
        } else {
          Alert.alert('Plz check your internet connection');
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
        Alert.alert('Error fetching data');
      }
    };

    fetchdata();
  }, []);

  const logoScale = useRef(new Animated.Value(1.8)).current;

  // ✅ Animate logo scaling effect
  useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    // ✅ Background image with overlay
    <ImageBackground
      source={require('../../assets/yummapbg2.png')}
      resizeMode="cover"
      style={{flex: 1}}>
      <StatusBar hidden={true} />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <Animated.Image
          source={require('../../assets/YumMap.png')}
          style={[styles.logo, {transform: [{scale: logoScale}]}]}
        />

        <Text
          style={{
            fontSize: 44,
            fontWeight: 'bold',
            color: '#fae7c1',
            marginBottom: 10,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 2,
          }}>
          Welcome To
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: '#fff',
            textAlign: 'center',
            marginBottom: 40,
            paddingHorizontal: 10,
          }}>
          A Food Discovery App!
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 250,
    height: 240,
    marginBottom: 30,
  },
});
