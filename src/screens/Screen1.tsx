import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {HomeStackParamList} from '../types/navigation';

type Screen1Props = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'Screen1'>;
};

const Screen1: React.FC<Screen1Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen 1</Text>
      <Text style={styles.subtitle}>Home Stack - First Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Screen2')}>
        <Text style={styles.buttonText}>Go to Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Screen1;
