"use strict";

var React = require('react-native');

var {
  ActivityIndicatorIOS,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} = React;

var api = require('./helps/api'),
    Loading = require('./Loading'),
    RefreshableListView = require('react-native-refreshable-listview'),
    DetailView = require('./DetailView'),
    CMSCell = require('./CMSListCell');

var resultsCache = {
  dataForQuery: [],
  hasMore: [],
  nextPageNumberForQuery: [],
};

var CMSList = React.createClass({
  getInitialState: function () {
    return {
      isLoading: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: "",
      pageNumber: 0,
      hasMore: true,
    };
  },
  componentWillMount: function () {
    this.getCMSList(this.state.pageNumer);
  },
  getCMSList: function (pageNumer: ?number) {
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }

    this.setState({
      isLoading: true
    });

    api.getCmsListByPageNumber(pageNumer)
      .catch((error) => {
        this.setState({
          isLoading: false,
          dataSource: this.getDataSource([]),
        });
      })
      .then((response) => {
        var code = response.code;
        if (code === 200) {
          this.setState({
            isLoading: false,
            dataSource: this.getDataSource(response.data.cms_list),
            hasMore: response.data.cms_list.length >= 20
          });
          console.log(this.state.dataSource);
        }else {
          this.state.isLoading = false;
        }
      })
      .done();
  },
  getDataSource: function(list: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(list);
  },
  renderRow: function (cms: Object) {
    return (
      <CMSCell
        onSelect={() => this.selectCms(cms)}
        cms={cms}
      />
    );
  },
  selectCms: function (cms: Object) {
    this.props.navigator.push({
      component: DetailView,
      passProps: {cms},
      title: cms.title
    });
  },
  onEndReached: function () {

  },
  render: function () {
    var content = this.state.dataSource.getRowCount() === 0 ?
      <Loading/> :
      <ListView
        style={styles.list}
        ref="listView"
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersisTags={true}
        showVertialScrollIndicator={false}
        onEndReached={this.onEndReached}
      />;
    return (
      <View style={styles.container}>
        {content}
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  list: {
    paddingTop: 64
  }
});

module.exports = CMSList;
