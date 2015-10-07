"use strict";

var React = require('react-native');

var {
  View,
  StyleSheet,
  WebView,
} = React;

var DetailView = React.createClass({
  render: function () {
    return(
      <View style={styles.container}>
        <WebView style={styles.webView}
          url={this.props.cms.link}
          />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  webView: {
    flex: 1
  }
});

module.exports = DetailView;
