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
import HomeView from './containers/HomeView';

/*
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
      inactiveBackgroundColor: '#F3D0A7',
      activeBackgroundColor: '#F08C37',
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
*/
export default class NutritionDoctor extends Component {
  render() {
    return (
        <HomeView />
    );
  }
}

AppRegistry.registerComponent('NutritionDoctor', () => NutritionDoctor);
