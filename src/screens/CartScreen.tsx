import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CartScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>
      <Text style={styles.title}>Cart</Text>
      <Text style={styles.subtitle}>Your shopping cart is empty</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e1',
    padding: 20,
  },
  icon: {
    fontSize: 60,
    marginBottom: 20,
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
  },
});

export default CartScreen;
