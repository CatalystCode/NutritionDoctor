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

const App = StackNavigator(
  {
    Camera: { screen: CameraView },
    FoodList: { screen: FoodListView },
    Nutrition: { screen: FoodDetailView },
  },
  {
    headerMode: 'screen'
  });

AppRegistry.registerComponent('NutritionDoctor', () => App);
