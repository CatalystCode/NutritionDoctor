import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  NativeModules,
  Alert,
  Text
} from 'react-native';
import Camera from 'react-native-camera';
import { Icon } from 'react-native-elements';

export default class CameraView extends Component {
  static navigationOptions = {
    header: [
      title =
      <View
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
          Nutrition Doctor
        </Text>
       </View> 
    ]
  }

  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.portrait,
        flashMode: Camera.constants.FlashMode.auto,
      }
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
          this.storePicture(data.path);
        })
        .catch(err => console.error(err));
    }
  }

  storePicture = (path) => {
    console.log(path);
    if (path) {

      NativeModules.ReadImageData.readImage(path, (imageBase64) => {
        const config = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: "jason", imageData: imageBase64 }),
        }

        fetch("http://nutritiondoctor.azurewebsites.net/api/user/identify", config)
          .then((responseData) => {
            console.log(responseData);
            if (responseData.status == 200) {
              Alert.alert(
                'Success!',
                'Image successfully uploaded.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              )

              this.props.navigation.navigate('FoodList');
            } else {
              Alert.alert(
                'Woops!',
                'Sorry, something went wrong.',
                [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
              )
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    switch (this.state.camera.flashMode) {
      case auto:
        icon = require('./assets/ic_flash_auto_white.png');
        break;
      case on:
        icon = require('./assets/ic_flash_on_white.png');
        break;
      case off:
        icon = require('./assets/ic_flash_off_white.png');
        break;
    }

    return icon;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar animated hidden />
        <Camera
          ref={(cam) => { this.camera = cam; }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          onFocusChanged={() => { }}
          onZoomChanged={() => { }}
          defaultTouchToFocus
          mirrorImage={false} />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash} >
            <Image source={this.flashIcon} />
          </TouchableOpacity>
        </View>

        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View>
            <TouchableOpacity style={styles.menuButton} >
              <Icon name="image-area" type='material-community' color={'#000'} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.captureButton} onPress={this.takePicture} >
               <Icon name="camera" type='material-community' width={60} height={60} color={'#FFF'} /> 
              {/* <Image source={require('./assets/photo-camera.png')} /> */}
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.menuButton} onPress={() => this.props.navigation.navigate('FoodList')} >
              <Icon name="clock" type='material-community' color={'#000'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: '#F08C37',
    borderRadius: 60,
    marginRight: 20,
    marginLeft: 20
  },
  menuButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
    marginRight: 20,
    marginLeft: 20
  },
  flashButton: {
    padding: 10,
  },
});

AppRegistry.registerComponent('NutritionDoctor', () => CameraView);