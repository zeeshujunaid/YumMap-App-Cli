import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function Resturantsignup() {
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
              paddingHorizontal: 5,
              paddingVertical: 4,
            }}>
            {/* Logo Section */}
            <View
              style={{
                borderColor: '#000',
                borderWidth: 5,
                borderRadius: 20,
                overflow: 'hidden',
              }}>
              <Image
                source={require('../../assets/resturantbg.jpg')}
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
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: 20,
                borderRadius: 10,
                position: 'absolute',
                top: 80,
                left: 20,
                right: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Add Your Restaurant Image
              </Text>
            </View>
            {/* text with overlay ends here */}


            {/* image picker overlay */}

             <View
              style={{
                backgroundColor: "#fff",
                padding: 20,
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                borderRadius: 10,
                position: 'absolute',
                top: 199,
                // left: 20,
                right: 10,
              }}>
              <Image
                source={require('../../assets/cmbg.png')}
                style={{height: 50, width: 50}}
                />
            </View>

            {/* image picker overlay ends here*/}

            {/* Keyboard Avoiding View to handle keyboard appearance ends  here*/}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
