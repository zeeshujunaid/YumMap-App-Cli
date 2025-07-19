import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Profilesignup({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
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

  const Setprofile = async () => {
    if (!name || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'No user is currently logged in.');
        return;
      }

      const uid = currentUser.uid;

      // 2. Upload image to Cloudinary
      let imageUrl = '';
      if (selectedImage) {
        imageUrl = await uploadToCloudinary(selectedImage);
      }

      // 3. Save user data to Firestore
      await firestore().collection('users').doc(uid).update({
        name,
        phone,
        ProfileImage: imageUrl,
      });

      setLoading(false);

      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate('MainApp'); // Navigate to the main app screen
    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            {/* Header Background Image */}
            <View style={{overflow: 'hidden'}}>
              <Image
                source={require('../../assets/resbg.png')}
                resizeMode="cover"
                style={{
                  height: 200,
                  width: '100%',
                }}
              />
            </View>

            {/* Profile Image Centered */}
            <View
              style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                marginTop: -40,
                alignItems: 'center',
              }}>
              <View style={{marginTop: -55}}>
                <Image
                  source={
                    selectedImage
                      ? {uri: selectedImage}
                      : require('../../assets/resturantbg.jpg')
                  }
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 75,
                    borderColor: '#FF4D4D',
                    borderWidth: 2,
                  }}
                />
              </View>

              <View style={{marginTop: 40}}>
                <Text
                  style={{fontSize: 12, color: '#666', textAlign: 'center'}}>
                  Please fill in your details
                </Text>
              </View>

              {/* Image Picker Button */}
              <TouchableOpacity
                onPress={handleImagePick}
                style={{
                  backgroundColor: '#fff',
                  height: 40,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                  position: 'absolute',
                  top: 55,
                  right: 120,
                }}>
                <Image
                  source={require('../../assets/cameraicon.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>

              {/* Input Fields */}
              <View
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  width: '100%',
                }}>
                <Text style={{fontSize: 16, color: '#000', marginTop: 20}}>
                  Full Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="none"
                  placeholder="John"
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
                  Enter Your Phone Number
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
              </View>

              {/* Next Button */}
              <View
                style={{width: '100%', paddingHorizontal: 20, marginTop: 20}}>
                <TouchableOpacity
                  onPress={Setprofile}
                  disabled={loading}
                  activeOpacity={0.8}
                  style={{
                    backgroundColor: '#FF4D4D',
                    borderRadius: 12,
                    paddingVertical: 15,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 4,
                  }}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Done
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
