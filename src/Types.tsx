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
  dateOfBirth: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
}
