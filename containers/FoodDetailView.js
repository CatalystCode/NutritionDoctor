import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Table, TableWraper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const styles = StyleSheet.create({
  foodImage:
  {
    height: 280,
    width: 280,
    alignSelf: 'center',
    borderRadius: 140,
    borderColor: '#F08C37',
    borderWidth: 3,
  },
  detailView:
  {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  listItems:
  {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 20
  },
  headerView:
  {
    backgroundColor: '#FFF',
    borderBottomColor: '#ebe6e3',
    borderBottomWidth: 15,
  },
  headerText:
  {
    color: '#92A1A7',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
    marginTop: 10,
  },
  table:
  {
    width: 360,
    height: 800
  },
  tableText:
  {
    textAlign: 'left',
    color: '#F08C37',
    fontSize: 20
  },
  row:
  {
    height: 200,
    paddingBottom: 10,
    paddingTop: 10
  },
  detailViewText:
  {
    marginTop: 30,
    marginLeft: 25,
    fontSize: 14,
    color: 'gray'
  }
});

export default class FoodDetailView extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: [
      title =
      <View style={styles.headerView} key="foodDetail" >
        <Text style={styles.headerText} >
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
    var tableData = []
    if (this.state.data.nutrition) {
      tableData = [
        [
          <Icon name='fire' type='material-community' height={65} width={65} color='#F08C37' />,
          <Icon name='scale-bathroom' type='material-community' height={65} width={65} color='#F08C37' />,
          <Icon name='hexagon-multiple' type='material-community' height={65} width={65} color='#F08C37' />,
          <Icon name='water' type='material-community' height={65} width={65} color='#F08C37'/>
        ],
        [
          'Calories',
          'Fat',
          'Protein',
          'Carbohydrate'
        ],
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
    }

    return (
      <View style={styles.detailView}>
        <Image
          source={{ uri: this.state.data.imageUrl }}
          style={styles.foodImage} >
        </Image>

        <Text style={styles.detailViewText}>
          Per 100g contains
        </Text>

        <Table style={styles.table} borderStyle={{ borderWidth: 0, borderColor: '#FFF' }}>
          <Cols data={tableData} flexArr={[1, 3, 1]} textStyle={styles.tableText} style={styles.row} />
        </Table>
      </View>
    );
  }
}

AppRegistry.registerComponent('NutritionDoctor', () => FoodDetailView);