import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
  Button,
} from 'react-native';
import {useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RestaurantTimingModal from '../components/Timeselecter';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Resturantsignup({navigation}) {
  const [restaurantTimings, setRestaurantTimings] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImagePick = () => {
    Alert.alert(
      'Upload Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({mediaType: 'photo', quality: 0.7}, res => {
              if (!res.didCancel && !res.errorCode) {
                setSelectedImage(res.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({mediaType: 'photo', quality: 0.7}, res => {
              if (!res.didCancel && !res.errorCode) {
                setSelectedImage(res.assets[0].uri);
              }
            });
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const uploadToCloudinary = async imageUri => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'profile.jpg',
    });
    data.append('upload_preset', 'YumMapPics'); // your Cloudinary preset
    data.append('cloud_name', 'dudx3of1n'); // your Cloudinary cloud name

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dudx3of1n/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );

    const file = await res.json();
    return file.secure_url;
  };

  const handleRestaurantSignup = async () => {
    if (!name || !email || !password || !phone || !restaurantTimings || !selectedImage) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Upload image to Cloudinary
      const imageUrl = selectedImage
        ? await uploadToCloudinary(selectedImage)
        : null;

      // Create user with email and password
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const uid = userCredential.user.uid;

      await firestore().collection('Resturantdata').doc(uid).set({
        name,
        email,
        phone,
        timings: restaurantTimings,
        imageUrl,
      });

      setLoading(false);
      Alert.alert('Success', 'Restaurant account created successfully!');
      navigation.navigate('MainApp');

      // Clear input fields
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setSelectedImage(null);
    } catch (error) {
      setLoading(false);
      console.log('Signup Error:', error);
      Alert.alert('Error', error.message);
    }
  }

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
            }}>
            {/* Logo Section */}

            <View style={{overflow: 'hidden'}}>
              <Image
                source={
                  selectedImage
                    ? {uri: selectedImage}
                    : require('../../assets/resturantbg.jpg')
                }
                resizeMode="cover"
                style={{
                  height: 250,
                  width: '100%',
                }}
              />

              {!selectedImage && (
                <View
                  style={{
                    backgroundColor: 'rgba(245, 241, 241, 0.5)',
                    padding: 20,
                    borderRadius: 10,
                    width: '90%',
                    height: 70,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    right: 20,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    Add Your Restaurant Image
                  </Text>
                </View>
              )}
            </View>

            {/* Logo Section ends here*/}

            {/* image picker overlay */}

            <TouchableOpacity
              onPress={handleImagePick}
              style={{
                backgroundColor: '#fff',
                padding: 20,
                height: 40,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                position: 'absolute',
                top: 159,
                right: 10,
              }}>
              <Image
                source={require('../../assets/cameraicon.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>

            {/* image picker overlay ends here*/}

            {/* white layer overlay with text */}
            <View
              style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                marginTop: -40,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 24,
                  color: '#FF4D4D',
                }}>
                Restaurant Signup
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: 'center',
                  marginTop: 10,
                  color: '#000',
                }}>
                Please make your restaurant profile
              </Text>
            </View>

            {/* white layer overlay with text ends here */}

            {/* input fields */}
            <View style={{paddingVertical: 20, paddingHorizontal: 20}}>
              <Text style={{fontSize: 16, color: '#000', marginTop: 20}}>
                Restaurant Name
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="YumMap burgers and fries"
                keyboardType="default"
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  marginTop: 10,
                }}
              />
              <Text style={{fontSize: 16, color: '#000', marginTop: 20}}>
                Enter Restaurant Email{' '}
              </Text>
              <TextInput

                value={email}
                onChangeText={setEmail}
                placeholder="YumMap@gmail.com"
                keyboardType="default"
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  marginTop: 10,
                }}
              />

              <Text style={{fontSize: 16, color: '#000', marginTop: 20}}>
                Create a password
              </Text>
              <TextInput

                value={password}
                onChangeText={setPassword}
                placeholder="********"
                keyboardType="password"
                secureTextEntry={true}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  marginTop: 10,
                }}
              />


              <Text style={{fontSize: 16, color: '#000', marginTop: 20}}>
                Enter Restaurant PhoneNumber{' '}
              </Text>
              <TextInput

                value={phone}
                onChangeText={setPhone}
                placeholder="+1234567890"
                keyboardType="phone-pad"
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  padding: 12,
                  fontSize: 16,
                  width: '100%',
                  marginTop: 10,
                }}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text style={{fontSize: 16, color: '#000', paddingRight: 120}}>
                  Select Opening Date And Time
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 15,
                      borderRadius: 10,
                      width: '30%',
                      height: 50,
                      alignItems: 'center',
                      marginTop: 20,
                    }}
                    onPress={() => setModalVisible(true)}>
                    <Image
                      source={require('../../assets/dateandicon.png')}
                      style={{height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <RestaurantTimingModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={timings => {
                  setRestaurantTimings(timings);
                  setModalVisible(false);
                }}
              />

              {/*input fields ends here */}
            </View>
            <TouchableOpacity
              onPress={handleRestaurantSignup}
              style={{
                marginTop: 30,
                marginHorizontal: 20,
                marginBottom: 30,
                backgroundColor: '#FF4D4D',
                borderRadius: 12,
                paddingVertical: 15,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5, // Android shadow
              }}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                Next
              </Text>
            </TouchableOpacity>

            {/* Keyboard Avoiding View to handle keyboard appearance ends  here*/}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
