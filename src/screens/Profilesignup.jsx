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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Profilesignup({navigation}) {
  const [selectedImage, setSelectedImage] = useState(null);

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
              <View style={{width: '100%', paddingHorizontal: 20,marginTop: 20}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('MainApp')}
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
                  <Text
                    style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
