import type {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  Screen1: undefined;
  Screen2: undefined;
};

export type TabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Cart: undefined;
  Favourites: undefined;
};

export type DrawerParamList = {
  TabNavigator: NavigatorScreenParams<TabParamList>;
  Orders: undefined;
};
