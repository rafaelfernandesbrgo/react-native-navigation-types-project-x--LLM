import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated';

type AnimatedDrawerProps = {
  children: React.ReactNode;
  progress: SharedValue<number>;
};

const AnimatedDrawer: React.FC<AnimatedDrawerProps> = ({
  children,
  progress,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      progress.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP,
    );

    // Parallax effect - move less than the drawer width
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [0, 230 * 0.6], // Parallax factor of 0.6
      Extrapolate.CLAMP,
    );

    // 2D rotation - rotates as if pivoting from bottom-right corner
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [0, -15], // Rotate -15 degrees when drawer is open
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      progress.value,
      [0, 1],
      [0, 20],
      Extrapolate.CLAMP,
    );

    return {
      transform: [
        {translateX},
        {rotate: `${rotate}deg`},
        {scale},
      ],
      borderRadius,
      overflow: 'hidden',
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AnimatedDrawer;
