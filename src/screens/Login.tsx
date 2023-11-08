import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Keyboard,
} from 'react-native';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackNavigationType} from '../Types';
import useAuthStore from '../zustand/AuthStore';
import Icon from 'react-native-vector-icons/AntDesign';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginStyles} from '../Styles';
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {FIREBASE_AUTH} from '../FirebaseConfig';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  const auth = FIREBASE_AUTH;

  const setUser = useAuthStore(state => state.setUser);

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

  const handleLogin = async () => {
    setLoading(true);
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password);
      if (user.emailVerified) {
        setLoading(false);
        setUser(email);
      } else {
        Toast.show({
          type: 'error',
          text1: `Please verify your email`,
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: `Email or password is incorrect.`,
      });
      console.log(error);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: 'success',
        text1: `Please check your email for change of password.`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: `Please type your email in the email section.`,
      });
    }
  };

  const handleGoToRegisterScreen = () => {
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={loginStyles.login}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={loginStyles.backgroundImage}>
        <View
          style={[
            loginStyles.container,
            {
              marginTop: keyboardVisible ? 20 : 170,
            },
          ]}>
          <Image
            source={require('../assets/logo.jpg')}
            style={[
              loginStyles.logo,
              {
                marginTop: keyboardVisible ? 50 : 100,
                marginBottom: keyboardVisible ? 10 : 50,
              },
            ]}
          />
          <View style={loginStyles.input_container}>
            <Icon name="user" size={24} />
            <TextInput
              style={loginStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={loginStyles.input_container}>
            <Icon name="lock" size={24} />
            <TextInput
              style={loginStyles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View style={loginStyles.forgotContainer}>
            <Text></Text>
            <TouchableOpacity
              style={loginStyles.forgotPass}
              onPress={handleForgotPassword}>
              <Text>Forgot password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
            <Text style={loginStyles.buttonText}>
              {loading ? 'Please wait..' : 'Sign in'}
            </Text>
          </TouchableOpacity>
          <View style={loginStyles.register_container}>
            <Text style={loginStyles.text}>Don't have account yet? </Text>
            <Text
              style={loginStyles.register_text}
              onPress={handleGoToRegisterScreen}>
              Register
            </Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;
