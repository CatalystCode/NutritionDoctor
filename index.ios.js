import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import FoodListView from './containers/FoodListView';
import FoodDetailView from './containers/FoodDetailView';
import CameraView from './containers/Camera/CameraView';

const HomeTabNavigator = TabNavigator({
  Food: {
    screen: FoodListView,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    }
  },
  Camera: {
    screen: CameraView,
    navigationOptions: {
      tabBarLabel: 'Camera',
      tabBarIcon: ({ tintColor }) => <Icon name="photo-camera" size={35} color={tintColor} />,
    }
  }
});

const App = StackNavigator(
  {
    Home: { screen: HomeTabNavigator },
    FoodList: { screen: FoodListView },
    Nutrition: { screen: FoodDetailView }
  },
  {
    headerMode: 'screen'
  });

AppRegistry.registerComponent('NutritionDoctor', () => App);
