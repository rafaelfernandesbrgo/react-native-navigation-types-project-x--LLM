import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import TabNavigator from './TabNavigator';
import OrdersScreen from '../screens/OrdersScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';
import DrawerContext from '../contexts/DrawerContext';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const DRAWER_WIDTH = SCREEN_WIDTH * 0.65;
const PARALLAX_FACTOR = 0.6;
const ROTATION_DEGREES = -15;
const ANIMATION_DURATION = 300;
const VELOCITY_THRESHOLD = 500;

export const DrawerScreens = {
  START: 'START',
  ORDERS: 'ORDERS',
} as const;

export type DrawerScreensType = typeof DrawerScreens[keyof typeof DrawerScreens];

const DrawerNavigator: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<DrawerScreensType>(
    DrawerScreens.START,
  );
  const translateX = useSharedValue(0);

  // Pan gesture to open/close drawer by dragging
  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const newValue = event.translationX;
      if (newValue >= 0) {
        translateX.value = Math.min(newValue, DRAWER_WIDTH);
      }
    })
    .onEnd(event => {
      if (
        translateX.value > DRAWER_WIDTH / 2 ||
        event.velocityX > VELOCITY_THRESHOLD
      ) {
        translateX.value = withTiming(DRAWER_WIDTH, {
          duration: ANIMATION_DURATION,
        });
      } else {
        translateX.value = withTiming(0, {
          duration: ANIMATION_DURATION,
        });
      }
    });

  // Animated style for the main content with rotation
  const animatedMainStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [0, DRAWER_WIDTH],
      [1, 0.8],
      Extrapolation.CLAMP,
    );

    const rotate = interpolate(
      translateX.value,
      [0, DRAWER_WIDTH],
      [0, ROTATION_DEGREES],
      Extrapolation.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      [0, DRAWER_WIDTH],
      [0, 20],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {translateX: translateX.value * PARALLAX_FACTOR},
        {rotate: `${rotate}deg`},
        {scale},
      ],
      borderRadius,
      overflow: 'hidden',
    };
  });

  // Navigate between screens and close drawer
  const handleNavigate = (screen: DrawerScreensType) => {
    setCurrentScreen(screen);
    translateX.value = withTiming(0, {duration: ANIMATION_DURATION});
  };

  // Toggle drawer
  const toggleDrawer = () => {
    if (translateX.value > 0) {
      translateX.value = withTiming(0, {duration: ANIMATION_DURATION});
    } else {
      translateX.value = withTiming(DRAWER_WIDTH, {duration: ANIMATION_DURATION});
    }
  };

  return (
    <DrawerContext.Provider value={{toggleDrawer}}>
      <View style={styles.container}>
        {/* Fixed drawer menu behind */}
        <CustomDrawerContent
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
        />

        {/* Main content with animation */}
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.mainContent, animatedMainStyle]}>
            {/* Header */}
            <SafeAreaView style={styles.header}>
              <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
                <View style={styles.hamburgerIcon}>
                  <View style={styles.hamburgerLine} />
                  <View style={styles.hamburgerLine} />
                  <View style={styles.hamburgerLine} />
                </View>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {currentScreen === DrawerScreens.START ? 'START' : 'Your Orders'}
              </Text>
              <View style={styles.headerRight} />
            </SafeAreaView>

            {/* Screen content */}
            <View style={styles.screenContent}>
              {currentScreen === DrawerScreens.START ? (
                <TabNavigator />
              ) : (
                <OrdersScreen />
              )}
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </DrawerContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuButton: {
    padding: 4,
    width: 40,
    justifyContent: 'center',
  },
  hamburgerIcon: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
  screenContent: {
    flex: 1,
  },
});

export default DrawerNavigator;
