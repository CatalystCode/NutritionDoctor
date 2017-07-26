# React Native image asset-library:// uri to base 64
A React Native Module that converts an image's asset-library:// uri to base64:

## Install

### IOS
1. `npm install --save react-native-ios-asset-library-to-base64`
2. Open your project in Xcode and copy `ios/RCTCustom.m` provided in this module  to  `Libraries > React > Base` in xcode

## Usage

1. In your React Native javascript code, bring in the native module:

var ReadImageData = require('NativeModules').ReadImageData;

2. convert image url:

// image asset-library:// uri
ReadImageData.readImage(uri, (imageBase64) => {
  console.log(imageBase64);
});

