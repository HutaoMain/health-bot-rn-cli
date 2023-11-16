import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Timestamp} from 'firebase/firestore';

export type AuthStackNavigationType = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// interfaces
export interface ConversationInterface {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface IUser {
  dateOfBirth: Timestamp;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
}

export type HomeNavigationStackProps = {
  Home: undefined;
  Chat: undefined;
  UserProfile: undefined;
};

export type HomeStackProps = NativeStackScreenProps<
  HomeNavigationStackProps,
  'Home'
>;
