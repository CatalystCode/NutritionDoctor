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
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

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

  render() {
    const tableHead = ['Icon', 'Name', 'Value'];
    const tableData = [
      ['', 'Calories', this.state.data.nutrition.calories],
      ['', 'Fat', this.state.data.nutrition.fat],
      ['', 'Protein', this.state.data.nutrition.protein],
      ['', 'Carbohydrate', this.state.data.nutrition.carbohydrate],
    ];


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
            height: 220,
            width: 220,
            borderRadius: 60
          }}
        />
        <Table style={styles.table} borderStyle={{borderWidth: 0.5, borderColor: '#F08C37'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} flexArr={[1, 2, 1, 2]}/>
          <Cols data={tableData2} textStyle={styles.text} heightArr={[20, 50]} widthArr={[60, 120, 60, 120]}/>
        </Table>
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
  table: { width: 360 },
  head: { height: 40 },
  text: { textAlign: 'center' },
});

AppRegistry.registerComponent('NutritionDoctor', () => FoodDetailView);