import React, { PureComponent } from 'react';
import CameraView from './Camera/CameraView';
import FoodListView from './FoodListView';
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import { Icon } from 'react-native-elements';

export default class HomeView extends PureComponent {
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Camera', icon: 'photo-camera' },
      { key: '2', title: 'Profile', icon: 'list' },
    ],
  };

  _handleChangeTab = index => this.setState({ index });

  _renderHeader = props => <StatusBar {...props} barStyle = "dark-content" hidden = {false}/>
  _renderFooter = props => 
    <TabBar {...props} 
      pressOpacity={0.5} 
      renderIcon={this._renderIcon} />;

  _renderScene = SceneMap({
    '1': () => <CameraView onPictureCapture={this.addPicture}/>,
    '2': () => <FoodListView />,
  });

  _renderIcon({ route }) {
      return (
        <Icon name={route.icon} size={ 30 } color='#fff' />
      )
  }

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