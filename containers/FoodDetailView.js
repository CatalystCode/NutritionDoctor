import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

export default class FoodDetailView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.data
    };
  }
  
  static navigationOptions = {
    header: [
      title =
      <TouchableHighlight
       style={{backgroundColor: "#F08C37"}}
        key="foodDetail"
      >
        <Text
          style={{
            color: "#FFF",
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10
          }} >
          Nutrition Info
        </Text>
      </TouchableHighlight>
    ]
  };

renderRow(rowData) {
    return (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          backgroundColor: '#fff'
        }}>

          <View style={{
            paddingLeft: 20
          }}>
            <Text>
              {rowData.nutrition}
            </Text>
          </View>
        </View>
    );
  }

  render() {
    let data = [{
      "Fat": parseInt(this.state.data.nutrition.fat),
      "Calories": parseInt(this.state.data.nutrition.calories),
      "Carbohydrate": parseInt(this.state.data.nutrition.carbohydrate),
      "Protein": parseInt(this.state.data.nutrition.protein),
    }];


    return (
      <View style={{
        flex: 1,
        paddingTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>

        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 24,
          fontWeight: '800'
        }}>
          {this.state.data.foodName}
        </Text>

        <Image
          source={{ uri: this.state.data.imageUrl }}
          style={{
            height: 120,
            width: 120,
            borderRadius: 60
          }}
        />
        <ListView
            dataSource={this.state.data}
            renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listItems: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  }
});

AppRegistry.registerComponent('NutritionDoctor', () => FoodDetailView);