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
import RestaurantTimingModal from '../components/Timeselecter';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Resturantsignup({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
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
            </View>

            {/* Logo Section ends here*/}

            {/* text with overlay */}
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
            {/* text with overlay ends here */}

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
                placeholder="********"
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
                Enter Restaurant Address{' '}
              </Text>
              <TextInput
                placeholder="123 YumMap Street, Food City"
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
                Enter Restaurant PhoneNumber{' '}
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
              />

              {/*input fields ends here */}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainApp')}
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
