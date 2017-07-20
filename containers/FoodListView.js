import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';

import FoodDetailView from './FoodDetailView.js';

export default class FoodListView extends PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      showProgress: true
    };
  }

  componentDidMount() {
    this.fetchFoodList();
  }

  fetchFoodList() {
    var url = '';

    fetch(url, {
      headers: ''
    })
      .then((response) => response.json())
      .then((responseData) => {
        var feedItems =
          responseData.filter((ev) =>
            ev.type == 'PushEvent');
        this.setState({
          dataSource: this.state.dataSource
            .cloneWithRows(feedItems),
          showProgress: false
        });
      })
  }

  pressRow(rowData) {
    this.props.navigator.push({
      title: 'Push Event',
      component: FoodDetailView,
      passProps: {
        pushEvent: rowData
      }
    });
  }

  //this will depend on the schema of the data we get back from the API
  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.pressRow(rowData)}
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
              {rowData.name}
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
      <View style={{
        flex: 1,
        justifyContent: 'flex-start'
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    );
  }
}

//AppRegistry.registerComponent('NutritionDoctor', () => FoodListView);