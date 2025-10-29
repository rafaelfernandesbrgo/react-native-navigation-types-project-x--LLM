import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import type {HomeStackParamList} from '../types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Screen1"
        component={Screen1}
        options={{title: 'Home Screen 1'}}
      />
      <Stack.Screen
        name="Screen2"
        component={Screen2}
        options={{title: 'Home Screen 2'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
