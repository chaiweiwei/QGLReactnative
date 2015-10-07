"use strict";

var React = require("react-native");
var {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  PixelRatio,
  Dimensions,
} = React;

var Icon = require('react-native-vector-icons/FontAwesome');
var screen = Dimensions.get('window');

var CMSListCell = React.createClass({
  render: function () {
    return (
      <View>
        <TouchableHighlight onPress={this.props.onSelect}>
          <View style={styles.row}>
            <Image
                source={{uri: this.props.cms.src}}
                accessible={true}
                style={styles.cellImage}>
                <Text style={styles.text}>
                  {this.props.cms.title}
                </Text>
                <View style={styles.sublineWrapper}>
                  <Icon name="heart" style={[styles.icon, {color: "red"}]}>
                    <Text style={styles.likeNumber}>
                      {this.props.cms.like}
                    </Text>
                  </Icon>
                  <Icon name='tags' style={styles.icon}>
                    <Text style={styles.tags}>
                      {this.props.cms.tags}
                    </Text>
                  </Icon>
                </View>
            </Image>
          </View>
        </TouchableHighlight>
        <View style={styles.cellBorder}/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  sublineWrapper: {
    right: 0,
    bottom: 0,
    position: "absolute",
    flex: 1,
    flexDirection: "row",
  },
  likeNumber: {
    alignSelf: "flex-end",
    flex: 1,
    color: "white",
    fontSize: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
    paddingLeft: 5,
  },
  icon: {
    fontSize: 12,
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  tags: {
    paddingLeft: 5,
    alignSelf: "flex-end",
    flex: 1,
    color: "white",
    fontSize: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
  },
  text: {
    color: "white",
    fontSize: 22,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    },
  },
  cellImage: {
    height: 180,
    width: screen.width,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: 'center',
    resizeMode: "cover",
  },
  row: {
    backgroundColor: "white",
    flexDirection: "column"
  },
  cellBorder: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    height: 1 / PixelRatio.get(),
    marginLeft: 4,
  }
});

module.exports = CMSListCell;
