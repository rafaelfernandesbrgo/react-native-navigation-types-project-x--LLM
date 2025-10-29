import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DrawerScreens, DrawerScreensType} from '../navigation/DrawerNavigator';

type CustomDrawerContentProps = {
  currentScreen: DrawerScreensType;
  onNavigate: (screen: DrawerScreensType) => void;
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  currentScreen,
  onNavigate,
}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Beka</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={[
              styles.menuItem,
              currentScreen === DrawerScreens.START && styles.menuItemActive,
            ]}
            onPress={() => onNavigate(DrawerScreens.START)}>
            <Text style={styles.menuText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onNavigate(DrawerScreens.START)}>
            <Text style={styles.menuText}>Your Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => onNavigate(DrawerScreens.START)}>
            <Text style={styles.menuText}>Favourites</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.menuItem,
              currentScreen === DrawerScreens.ORDERS && styles.menuItemActive,
            ]}
            onPress={() => onNavigate(DrawerScreens.ORDERS)}>
            <Text style={styles.menuText}>Your Orders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#1a1a2e',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 60,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginBottom: 8,
  },
  menuItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  menuText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  footer: {
    paddingBottom: 20,
  },
  signOutButton: {
    paddingVertical: 18,
    paddingHorizontal: 15,
  },
  signOutText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default CustomDrawerContent;
