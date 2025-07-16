import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function Login({navigation}) {
  // Configure Google Sign-In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '49476995375-gko8935aoabfglgijlhhsip1gl58e2lv.apps.googleusercontent.com',
    });
  }, []);

  // Function to handle Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      const user = userCredential.user;
      Alert.alert('Success', `Welcome back, ${user.email}!`);
      navigation.navigate('MainApp');
    } catch (error) {
      console.log('Google Login Error:', error);
      Alert.alert('Google Login Error', error.message);
    }
  };

  return (
    // {/* Keyboard Avoiding View to handle keyboard appearance */}
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              justifyContent: 'center',
              paddingVertical: 40,
            }}>
            {/* Logo Section */}
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Image
                source={require('../../assets/YumMap.png')}
                style={{height: 90, width: 80}}
              />
            </View>

            {/* Welcome Section */}
            <View style={{marginBottom: 30}}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: '600',
                  color: '#000',
                  textAlign: 'center',
                }}>
                Welcome
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                Plz signup to enjoy the app
              </Text>
            </View>

            {/* Input Fields */}
            <View style={{gap: 15}}>
              {/* {email input} */}
              <Text style={{fontSize: 16, color: '#000'}}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                keyboardType="email-address"
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                }}
              />
              {/* {password input } */}
              <Text style={{fontSize: 16, color: '#000', marginTop: 15}}>
                Password
              </Text>
              <TextInput
                placeholder="Enter your password"
                secureTextEntry
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                }}
              />
            </View>

            {/* {already have account button , and resturant signup button} */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                width: '100%',
                justifyContent: 'space-around',
              }}>
              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => navigation.navigate('RestaurantSignup')}>
                <Text
                  style={{color: '#FF4D4D', textAlign: 'center', fontSize: 12}}>
                  Signup as a Restaurant?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{marginTop: 20}}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{color: '#4c9efa', textAlign: 'center', fontSize: 12}}>
                  Already Have an Account?
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profilesignup');
              }}
              style={{
                backgroundColor: '#FF4D4D',
                paddingVertical: 14,
                borderRadius: 10,
                marginTop: 30,
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>

            <View
              style={{marginVertical: 20, alignItems: 'center', marginTop: 40}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '80%',
                }}>
                <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
                <Text style={{marginHorizontal: 10, color: '#888'}}>
                  or signin with
                </Text>
                <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
              </View>
            </View>

            {/* Google Sign-In Button */}
            <TouchableOpacity
              onPress={handleGoogleLogin}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 10,
                marginTop: 15,
              }}>
              <Image
                source={require('../../assets/signupwithgoogle.png')}
                style={{width: 250, height: 25}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
