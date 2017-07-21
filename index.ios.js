import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import FoodListView from './containers/FoodListView';
import FoodDetailView from './containers/FoodDetailView';
import CameraView from './containers/Camera/CameraView';

const HomeTabNavigator = TabNavigator({
  Food: { screen: FoodListView },
  Camera: { screen: CameraView }
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
