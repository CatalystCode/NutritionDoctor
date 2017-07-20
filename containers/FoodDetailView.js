import React, { PureComponent } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

export default class FoodDetailView extends PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(props.pushEvent.payload.commits),
      pushEvent: props.pushEvent
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
        <Text><Text style={styles.bold}>{rowData.sha.substring(0, 6)}</Text> - {rowData.message}</Text>
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
          source={{ uri: this.state.pushEvent.IMAGE }}
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
          {this.state.pushEvent.NAME}
        </Text>

        <Text style={{
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 16
        }}>
          Calories: {this.state.pushEvent.CALORIES}
        </Text>

        <ListView
          contentInset={{
            top: -50
          }}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
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

//AppRegistry.registerComponent('NutritionDoctor', () => FoodDetailView);