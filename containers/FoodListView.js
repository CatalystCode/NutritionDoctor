import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight,
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import FoodDetailView from './FoodDetailView.js';
import Moment from 'moment';

const styles = StyleSheet.create({
  headerTouchable:
  {
    backgroundColor: '#FFF',
    borderBottomColor: '#ebe6e3',
    borderBottomWidth: 15
  },
  headerText:
  {
    color: '#92A1A7',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10
  },
  rowDataView:
  {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 0.5,
    backgroundColor: '#FFF'
  },
  rowDataText:
  {
    fontSize: 18,
    fontWeight: '400',
    color: '#F08C37'
  },
  rowDataTextSubtitle:
  {
    color: '#92A1A7',
    marginTop: 10
  },
  viewIndicator: 
  {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  viewList:
  {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
  },
  imageStyle:
  {
    height: 70,
    width: 100,
  }
});

export default class FoodListView extends Component {
  static navigationOptions = {
    header: [
      title =
      <TouchableHighlight
        style={styles.headerTouchable}
        key="foodlistView"
        onPress={this._selectDate} >
        <Text style={styles.headerText} >
          Today, {new Date().toDateString()}
        </Text>
      </TouchableHighlight>
    ]
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      showProgress: true
    };

    this._refresh = this._refresh.bind(this);
  }

  componentDidMount() {
    this.fetchFoodList();
  }

  _refresh() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.fetchFoodList();
        resolve();
      }, 2000)
    });
  }

  _selectDate() {
    /* TODO: Implement calendar date selection */
  }

  fetchFoodList() {
    var url = 'http://nutritiondoctor.azurewebsites.net/api/user/identify/jason';
    const config = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    fetch(url, config)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource
            .cloneWithRows(responseData),
          showProgress: false
        });
      });
  }

  renderRow(rowData) {
    const formattedDate = Moment(rowData.createdDateTime).format('LL');
    if (rowData) {
      return (
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Nutrition', { data: rowData })}
          underlayColor='#ddd'
          key={rowData.userId} >
          <View style={styles.rowDataView}>
            <Image
              source={{ uri: rowData.imageUrl }}
              style={styles.imageStyle}
            />
            <View style={{ paddingLeft: 20 }}>
              <Text style={styles.rowDataText}>
                {rowData.foodName}
              </Text>
              <Text style={styles.rowDataTextSubtitle}>
                {rowData.nutrition.calories.factValue} {rowData.nutrition.calories.factUnit} / 100g
              </Text>
              <Text style={styles.rowDataTextSubtitle}>
                {formattedDate}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    };
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={styles.viewIndicator}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }

    return (
      <PTRView onRefresh={this._refresh} style={{ backgroundColor: '#FFF' }}>
        <View style={styles.viewList}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
        </View>
      </PTRView>
    );
  }
}

AppRegistry.registerComponent('NutritionDoctor', () => FoodListView); 