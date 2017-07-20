import React from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Camera from 'react-native-camera';

import HomeView from './HomeView';

export default class CameraView extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
      }
    };
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.capture()
        .then((data) => {
          if (this.props.onPictureCapture) {
            this.props.onPictureCapture(data.path);
            this.storePicture(data.path);
          }
        })
        .catch(err => console.error(err));
    }
  }

  storePicture = (path) => {
    console.log(path);
    if (path) {
      // Create the form data object
      var data = new FormData();
      data.append('picture', { uri: path, name: 'food.jpg', type: 'image/jpg' });

      // Create the config object for the POST
      const config = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;'
        },
        body: data,
      }

      //update URL for java api
      fetch("https://postman-echo.com/post", config)
        .then((responseData) => {
          console.log(responseData);
          //send user to list view to wait for image
          this.props.navigator.push({
            title: 'Image Uploaded',
            component: HomeView
          });
        })
        .catch(err => {
          console.log(err);
        })
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
          <TouchableOpacity style={styles.captureButton} onPress={this.takePicture} >
            <Image source={require('./assets/ic_photo_camera_36pt.png')} />
          </TouchableOpacity>
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
    backgroundColor: 'white',
    borderRadius: 40,
  },
  flashButton: {
    padding: 10,
  },
});

//AppRegistry.registerComponent('NutritionDoctor', () => CameraView);