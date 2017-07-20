import React, { PureComponent } from 'react';
import CameraView from './Camera/CameraView';
import FoodListView from './FoodListView';
import FoodDetailView from './FoodDetailView';
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

export default class HomeView extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Food' },
      { key: '2', title: 'Camera' },
    ],
  };

  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props => <StatusBar {...props} barStyle = "dark-content" hidden = {false}/>
  _renderFooter = props => <TabBar {...props} pressOpacity={0.5} />;

  _renderScene = SceneMap({
    '1': () => <FoodListView />,
    '2': () => <CameraView onPictureCapture={this.addPicture}/>,
  });

  addPicture = (path) => {
    console.log(path);
    this.setState({ index: 0 });
  }

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

//AppRegistry.registerComponent('NutritionDoctor', () => HomeView);