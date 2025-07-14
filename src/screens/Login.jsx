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
      // Step 1: Sign in with Google
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Step 2: Decode the idToken to get the user's email
      const {email} = await GoogleSignin.getCurrentUser().user;

      // Step 3: Check if the user already exists
      const signInMethods = await auth().fetchSignInMethodsForEmail(email);

      if (signInMethods.length === 0) {
        // User does not exist, show alert
        Alert.alert(
          'Account Not Found',
          'Please sign up first using Google Sign-Up.',
        );
        await GoogleSignin.signOut(); // optional: sign out from Google
        return;
      }

      // Step 4: Sign in if user exists
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
    // Keyboard Avoiding View to handle keyboard appearance
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
            <View style={{alignItems: 'center', marginBottom: 30}}>
              <Image
                source={require('../../assets/YumMap.png')}
                style={{height: 90, width: 80}}
              />
              {/* <Text style={{fontSize: 24, fontWeight: 'bold', color: '#000'}}>
                YumMap
              </Text> */}
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
                Welcome Back
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#666',
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                Login to your account
              </Text>
            </View>

            {/* Input Fields */}
            <View style={{gap: 15}}>
              {/* Email Input */}
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
              {/* {pasword input} */}
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
            {/* Forgot Password Link */}
            <TouchableOpacity
              style={{marginTop: 20, marginLeft: 220}}
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{color: '#FF4D4D', textAlign: 'center'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* signup Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#FF4D4D',
                paddingVertical: 14,
                borderRadius: 10,
                marginTop: 30,
              }}
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </TouchableOpacity>

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
                marginTop: 20,
              }}>
              <Image
                source={require('../../assets/signinwithgoogle.png')}
                style={{width: 250, height: 20}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
