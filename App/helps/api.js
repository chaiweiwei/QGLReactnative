"use strict";

var API_URL  = "http://www.qiugonglue.com/cms/cms_list";

function fetchData(URL) {
  return fetch(URL, {
  }).then((response) => response.json())
}

module.exports = {
  getCmsListByPageNumber: function (pageNumber: ?number): ?Object {
    var URL = API_URL  + "?p=" + pageNumber;

    return fetchData(URL);
  }
}
