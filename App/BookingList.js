'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ListView,
  TouchableHighlight,
} = React;

var QGL_URL = 'http://www.qiugonglue.com/api/v3/booking/booking_list?check_in=2015-10-09&check_out=2015-10-10&client_name=QGLMain&client_version=5.8.1&current_client_name=HangZhou&developer=1&maxrate_rmb=0&minrate_rmb=0&order_type=1&p=1&place_id=2004004001&platform=iOS&sign=6dec60ba493fccbe88b63979dd274ec0&tm=1444356316.283803';

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

var screen = Dimensions.get('window');

var DetailView = require('./DetailView');

var BookingList = React.createClass({

  getInitialState: function() {
    return {
        loaded :false,
        dataSource:new ListView.DataSource({
            rowHasChanged:(row1,row2)=>row1 !== row2,
        }),
    };
  },
  componentDidMount: function() {
    this.fetchListData();
  },

  fetchListData: function() {
      fetch(QGL_URL)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({
                loaded:true,
                dataSource: this.state.dataSource.cloneWithRows(responseData.data.booking_list),
            });
          })
      .done();
  },
  render: function() {
    if(!this.state.loaded) {
     return this.renderLoadingView();
    }
    return (
      <ListView
        style={styles.list}
        dataSource = {this.state.dataSource}
        renderRow = {this.renderHotals}
        automaticallyAdjustContentInsets={true}
        keyboardDismissMode="on-drag"
        keyboardShouldPersisTags={true}
        showVertialScrollIndicator={false}
      />
    )

  },
  renderLoadingView: function() {
     return (
     <View style={styles.noResultText}>
         <Text>
          loading movies...
         </Text>
     </View>
     );
  },
  selectBook: function (hotal: Object) {
    hotal.link = hotal.hotel_url;
    this.props.navigator.push({
      component: DetailView,
      passProps: {cms:hotal},
      title: hotal.name_cn
    });
  },
  renderHotals: function(hotal) {
      return (
        <View>
        <TouchableHighlight onPress={this.selectBook(hotal)}>
          <View style={styles.container}>
            <Image
                source={{uri:hotal.photo_url}}
                style={styles.leftImage}
              />
            <View style={styles.rightContainer}>
                <View style={styles.contentContainer}>
                    <Text style={styles.nameText} numberOfLines={1}>{hotal.name_cn}</Text>
                    <Text style={styles.scoreText}>{hotal.score}分</Text>
                </View>
                <Text style={styles.enNameText} numberOfLines={1}>{hotal.name}</Text>
                <Text style={styles.startText}>{hotal.class_cn}</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.areaText}>{hotal.area}</Text>
                    <Text style={styles.priceText}>{hotal.minrate_rmb}元起</Text>
                </View>
            </View>
          </View>
        </TouchableHighlight>
        </View>
      );
  },
});

var styles = StyleSheet.create({
 noResultText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    fontSize: 17,
    color: '#666666',
 },
 container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
 },
 rightContainer: {
  flex: 1,
  height:90,
 },
 contentContainer: {
  flex: 1,
  flexDirection: 'row',
 },
 nameText: {
    textAlign: 'left',
    color: '#333333',
    fontSize:15,
    width:screen.width-195,
 },
 scoreText: {
    color: '#999999',
    fontSize:15,
    textAlign: 'right',
    marginRight:15,
 },
 enNameText: {
    textAlign: 'left',
    color: '#999999',
    fontSize:13,
    width:screen.width-155,
 },
priceText: {
    color: '#FF6B02',
    fontSize:17,
    textAlign: 'right',
    right:15,
    bottom:-3,
    position:'absolute',
 },
 startText: {
    textAlign: 'left',
    color: '#FE9716',
    fontSize:13,
     marginTop:15,
 },
 areaText: {
    textAlign: 'left',
    color: '#999999',
    fontSize:13,
     bottom:0,
     position:'absolute',
 },
 leftImage: {
    width:120,
    height:90,
    marginBottom:15,
    marginTop:15,
    marginLeft:15,
    marginRight:10,
 },
 list: {

 }
});

module.exports = BookingList;
