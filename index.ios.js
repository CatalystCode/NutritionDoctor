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

const HomeTabNavigator = TabNavigator(
  {
    Camera: {
      screen: CameraView,
      navigationOptions: {
        tabBarLabel: 'Camera',
        tabBarIcon: ({ tintColor }) => <Icon name="photo-camera" size={35} color={tintColor} />
      }
    },
    FoodList: {
      screen: FoodListView,
      navigationOptions: {
        tabBarLabel: 'Food',
        tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
      }
    }
  },  
  {
    tabBarOptions: {
      inactiveBackgroundColor: '#19AFE2',
      activeBackgroundColor: '#33CCFF',
      activeTintColor: '#FFF',
      inactiveTintColor: '#FFF',
    }
  });

const App = StackNavigator(
  {
    Home: { screen: HomeTabNavigator },
    Nutrition: { screen: FoodDetailView }
  },
  {
    headerMode: 'screen'
  });

AppRegistry.registerComponent('NutritionDoctor', () => App);
