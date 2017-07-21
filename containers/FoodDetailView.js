import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class FoodDetailView extends Component {
  static navigationOptions = {
    title: 'Nutrition'
  };

  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.data
    };
  }

  //this will depend on the schema of the data we get back from the API
  renderRow(rowData) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        padding: 10
      }}>
        <Text><Text style={styles.bold}>ABC</Text> - DEF</Text>
      </View>
    );
  }

  //this will depend on the schema of the data we get back from the API
  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Image
          source={{ uri: this.state.data.image }}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }}
        />

        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 20
        }}>
          {this.state.data.title}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  bold: {
    fontWeight: '800',
    fontSize: 16
  }
});

AppRegistry.registerComponent('NutritionDoctor', () => FoodDetailView);