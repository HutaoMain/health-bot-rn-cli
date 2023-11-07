import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackNavigationType} from '../Types';
import Toast from 'react-native-toast-message';
import {registrationStyles} from '../Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {FIREBASE_AUTH} from '../FirebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackNavigationType>>();

  const handleRegistration = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: `Password do not match.`,
        });
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => userCredential.user)
        .then(user => {
          sendEmailVerification(user);
        });

      Toast.show({
        type: 'success',
        text1: `Please verify your account in your email.`,
      });
      setLoading(false);
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: `Email already in use`,
      });
    }
  };

  const handleGoBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={registrationStyles.registration}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={registrationStyles.backgroundImage}>
        <View
          style={[
            registrationStyles.container,
            {
              marginTop: keyboardVisible ? 20 : 170,
            },
          ]}>
          <Image
            source={require('../assets/logo.jpg')}
            style={[
              registrationStyles.logo,
              ,
              {
                marginBottom: keyboardVisible ? 0 : 30,
                marginTop: keyboardVisible ? 30 : 0,
                width: keyboardVisible ? 70 : 100,
                height: keyboardVisible ? 70 : 100,
              },
            ]}
          />
          <View style={registrationStyles.input_container}>
            <Text style={registrationStyles.input_label}>Email:</Text>
            <TextInput
              style={registrationStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={registrationStyles.input_container}>
            <Text style={registrationStyles.input_label}>Full Name:</Text>
            <TextInput
              style={registrationStyles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={registrationStyles.input_container}>
            <Text style={registrationStyles.input_label}>Password:</Text>
            <TextInput
              style={registrationStyles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={registrationStyles.input_container}>
            <Text style={registrationStyles.input_label}>
              Confirm Password:
            </Text>
            <TextInput
              style={registrationStyles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={[
              registrationStyles.button,
              email && name && password && confirmPassword
                ? registrationStyles.buttonEnabled
                : registrationStyles.buttonDisabled,
            ]}
            disabled={!email || !name || !password || !confirmPassword}
            onPress={handleRegistration}>
            <Text style={registrationStyles.buttonText}>
              {loading ? 'Please wait...' : 'Register'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={registrationStyles.button}
            onPress={handleGoBackToLogin}>
            <Text style={registrationStyles.buttonGoBack}>
              Go back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Register;
