/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HomeView from './containers/Home/HomeView';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

export default class NutritionDoctor extends Component {
  render() {
    return (
      <View style={styles.container}>
        <HomeView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('NutritionDoctor', () => NutritionDoctor);