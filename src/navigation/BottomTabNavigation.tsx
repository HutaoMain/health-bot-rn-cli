// import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './HomeStackNavigation';

const BottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size}) => {
          let iconName: any;

          if (route.name === 'BMINavigationStack') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'list-outline' : 'list-outline';
          } else if (route.name === 'Person') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return (
            // <Ionicons
            //   name={iconName}
            //   size={size}
            //   color={focused ? "#E44203" : "black"}
            // />
            <Icon name="lock" size={24} />
          );
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: 'white',
        },
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="HomeStackNavigation"
        component={HomeStackNavigation}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
