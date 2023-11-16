import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FIREBASE_AUTH, FIRESTORE_DB} from '../FirebaseConfig';
import {signOut} from 'firebase/auth';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import useAuthStore from '../zustand/AuthStore';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {IUser} from '../Types';
import Icon from 'react-native-vector-icons/AntDesign';

const Navbar = () => {
  const [userData, setUserData] = useState<IUser>();
  const auth = FIREBASE_AUTH;

  const user = useAuthStore(state => state.user);
  const clearUser = useAuthStore(state => state.clearUser);

  useEffect(() => {
    const fetch = async () => {
      const q = query(
        collection(FIRESTORE_DB, 'users'),
        where('email', '==', user),
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(doc => {
        const userData = {
          dateOfBirth: doc.data().dateOfBirth,
          email: doc.data().email,
          fullName: doc.data().fullName,
          gender: doc.data().gender,
          phoneNumber: doc.data().phoneNumber,
        };
        console.log('User Data:', userData);
        setUserData(userData);
      });
    };
    fetch();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Toast.show({
          type: 'success',
          text1: `Successfully signout.`,
        });
        clearUser();
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error,
        });
      });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 20,
      }}>
      <View
        style={{
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome,</Text>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>
            {userData?.fullName}
          </Text>
        </View>
      </View>
      <View style={{height: 70}}>
        <TouchableOpacity onPress={handleLogout} style={{alignItems: 'center'}}>
          <Icon name="logout" size={24} />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
