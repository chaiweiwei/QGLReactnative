/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
} = React;

var CMSList = require("./App/CMSList");

var QGLReactnative = React.createClass({
  render: function() {
    return (
      <NavigatorIOS style={styles.wrapper}
        initialRoute={{
          component: CMSList,
          title: "求攻略",
        }}
        />
    );
  }
});

var styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  }
});

AppRegistry.registerComponent('QGLReactnative', () => QGLReactnative);
