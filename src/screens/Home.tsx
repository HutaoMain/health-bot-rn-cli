import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../components/Navbar';
import {
  ImageBackground,
  TouchableOpacity,
  Image,
  View,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeStackProps} from '../Types';

const Home = () => {
  const navigate = useNavigation<HomeStackProps['navigation']>();

  const handleNavigateToChat = () => {
    navigate.navigate('Chat');
  };

  const handleNavigateToProfile = () => {
    navigate.navigate('UserProfile');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={{flex: 1}}>
        <Navbar />
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: 20,
            justifyContent: 'space-around',
            paddingTop: 20,
          }}>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'black',
              width: 150,
              height: 150,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleNavigateToChat}>
            <Image
              source={require('../assets/chatbot.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'black',
              width: 150,
              height: 150,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleNavigateToProfile}>
            <Image
              source={require('../assets/userprofile.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '100%',

              backgroundColor: 'black',
              padding: 20,
              borderRadius: 25,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'left',
                color: 'white',
                borderBottomColor: 'white',
                borderBottomWidth: 2,
                width: '95%',
                marginVertical: 10,
              }}>
              About Us
            </Text>
            <Text style={{fontSize: 18, color: 'white'}}>
              Using a unique combination of chatbot technology and image
              recognition, we are pleased to present Vitabot, your Smart Health
              Companion. Connecting state-of-the-art AI with individualized
              healthcare, Vitabot has insightful discussions while using picture
              recognition to improve diagnoses. Vitabot ushers in a new era of
              preventative and individualized health management by bringing
              together cutting-edge tech and individual aspirations.
            </Text>
          </View>

          {/* <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'black',
              width: 150,
              height: 150,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleNavigateToChat}>
            <Image
              source={require('../assets/chatbot.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: 'black',
              width: 150,
              height: 150,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleNavigateToChat}>
            <Image
              source={require('../assets/chatbot.png')}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 20,
              }}
            />
          </TouchableOpacity> */}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
