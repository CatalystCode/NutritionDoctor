import React, { Component } from 'react';
import {
  AppRegistry,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class FoodDetailView extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: [
      title =
      <View
        style={{
          backgroundColor: "#FFF",
          borderBottomColor: '#92A1A7',
          borderBottomWidth: 1,
        }}
        key="foodDetail"
      >
        <Text
          style={{
            color: '#92A1A7',
            textAlign: 'center',
            fontSize: 24,
            marginBottom: 10,
            marginTop: 10,
          }} >
          {navigation.state.params.data.foodName}
        </Text>
      </View>
    ]
  });

  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.data
    };
  }

  render() {
    var tintColor = "#F08C37";
    const tableData = [
      [
        <Icon name="fire" type='material-community' height={65} width={65} color={tintColor} />,
        <Icon name="scale-bathroom" type='material-community' height={65} width={65} color={tintColor} />,
        <Icon name="hexagon-multiple" type='material-community' height={65} width={65} color={tintColor} />,
        <Icon name="water" type='material-community' height={65} width={65} color={tintColor} />
      ],
      ['Calories', 'Fat', 'Protein', 'Carbohydrate'],
      [
        this.state.data.nutrition.calories.factValue,
        this.state.data.nutrition.fat.factValue,
        this.state.data.nutrition.protein.factValue,
        this.state.data.nutrition.carbohydrate.factValue
      ],
      [
        this.state.data.nutrition.calories.factUnit,
        this.state.data.nutrition.fat.factUnit,
        this.state.data.nutrition.protein.factUnit,
        this.state.data.nutrition.carbohydrate.factUnit
      ]
    ];
    return (
      <View style={styles.view}>
        <Image
          source={{ uri: this.state.data.imageUrl }}
          style={{
            height: 220,
            width: 300,
            alignSelf: 'center'
          }}
        />
        <Text style={{
          marginTop: 30,
          marginLeft: 15,
          fontSize: 16,
          color: 'gray'
        }}> Per 100g contains </Text>

        <Table style={styles.table} borderStyle={{ borderWidth: 0, borderColor: '#fff' }}>
          <Cols data={tableData} flexArr={[1, 3, 1]} textStyle={styles.text} style={styles.row} />
        </Table>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  view: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  listItems: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20
  },
  table: { width: 360, height: 800 },
  text: { textAlign: 'left', color: '#F08C37', fontSize: 20 },
  row: { height: 200, paddingBottom: 10, paddingTop: 10 }
});

AppRegistry.registerComponent('NutritionDoctor', () => FoodDetailView);