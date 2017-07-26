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
  Button
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';

import FoodDetailView from './FoodDetailView.js';

const value = null;
const datePickerProps = null;

export default class FoodListView extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      showProgress: true,
      selectedDay: null
    };

    this._refresh = this._refresh.bind(this)
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

  handleDayChange = selectedDay => {
    this.setState({ selectedDay });
  };

  _selectDate() {
    console.log("I AM HERE");
    const value = this.state.selectedDay
      ? this.state.selectedDay.format('DD/MM/YYYY')
      : '';

    // return (
    //   // <form>
    //   //   <p>
    //   //     <label for="input">Please enter a day:</label>
    //   //   </p>
    //   //   <DayPickerInput
    //   //     name="birthday"
    //   //     placeholder="DD/MM/YYYY"
    //   //     format="DD/MM/YYYY"
    //   //     value={value}
    //   //     onDayChange={this.handleDayChange}
    //   //   />
    //   // </form>
    // )
  }

  fetchFoodList() {
    console.log('RUNNING API CALL');

    var url = 'http://nutritiondoctorapi.azurewebsites.net/api/user/identify/lilian';
    const config = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    fetch(url, config)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource
            .cloneWithRows(responseData),
          showProgress: false
        });
        console.log(responseData);
      })
  }


  static navigationOptions = {
    header: [
      title =
      <TouchableHighlight
       style={{
            backgroundColor: "#F08C37",
          }}
        key="foodlistDate"
        onPress={this._selectDate}
      >
        <Text
          style={{
            color: "#FFF",
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 10,
            marginTop: 10
          }} >
          Today, {new Date().toDateString()}
        </Text>
      </TouchableHighlight>
    ]
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('Nutrition', { data: rowData })}
        underlayColor='#ddd'
        key={rowData.userId}
      >
        <View style={{
          flex: 1,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          backgroundColor: '#fff'
        }}>
          <Image
            source={{ uri: rowData.imageUrl }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25
            }}
          />

          <View style={{
            paddingLeft: 20
          }}>
            <Text style={{
            fontWeight: '800',
            color: '#F08C37'
          }}>
              {rowData.foodName}
            </Text>

            <Text>
              {rowData.nutrition.calories.factValue} {rowData.nutrition.calories.factUnit}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.state.showProgress) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#FFF',
        }}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }

    return (
      <PTRView onRefresh={this._refresh} style={{
          backgroundColor: '#FFF',
        }}>
        <View style={{
          flex: 1,
          justifyContent: 'flex-start',
          backgroundColor: '#FFF',
        }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
        </View>
      </PTRView>
    );
  }
}

AppRegistry.registerComponent('NutritionDoctor', () => FoodListView); 