import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh';
import FoodDetailView from './FoodDetailView.js';


export default class FoodListView extends Component {
  static navigationOptions = {
    header: [
      visible = false
    ]
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      showProgress: true
    };
    this._refresh = this._refresh.bind(this)
  }

  _refresh() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.fetchFoodList();
        resolve();
      }, 2000)
    });
  }

  componentDidMount() {
    this.fetchFoodList();
  }

  fetchFoodList() {
    console.log('RUNNING API CALL');
    var url = 'https://jsonplaceholder.typicode.com/posts';

    fetch(url
      // {
      //   headers: ''
      // }
    )
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource
            .cloneWithRows(responseData),
          showProgress: false
        });
      })
  }

  //this will depend on the schema of the data we get back from the API
  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('Nutrition', { data: rowData })}
        underlayColor='#ddd'
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
            source={{ uri: rowData.image }}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18
            }}
          />

          <View style={{
            paddingLeft: 20
          }}>
            <Text>
              {rowData.title}
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
          justifyContent: 'center'
        }}>
          <ActivityIndicator
            size="large"
            animating={true} />
        </View>
      );
    }

    return (
      <PTRView onRefresh={this._refresh} >
        <View style={{
          flex: 1,
          justifyContent: 'flex-start'
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