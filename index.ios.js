/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HomeView from './containers/HomeView';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

export default class NutritionDoctor extends Component {
  render() {
    return (
        <HomeView />
    );
  }
}

AppRegistry.registerComponent('NutritionDoctor', () => NutritionDoctor);