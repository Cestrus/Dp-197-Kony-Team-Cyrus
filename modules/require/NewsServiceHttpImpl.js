define(function () {
  var NEWS_BASE_URL = "https://content.guardianapis.com/search?section=science&order-by=newest&show-elements=all&show-fields=all&q=space%2C%20technology&api-key=a9cd8943-4ed2-4441-b3d4-4cbf89189828";

 
  
  var makeHttpRequest = function(url, successCallback, errorCallback) {
    var httpClient = new kony.net.HttpRequest();
    httpClient.open(constants.HTTP_METHOD_GET, url);
    httpClient.onReadyStateChange = function () {
      if (httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
        return;
      }
      
      if (httpClient.status === HttpResponseCodes.OK) {
        successCallback(httpClient.response);
      } else {
        errorCallback(httpClient.response);
      }
    };
    httpClient.send();
  };
  
  
  var getNews = function (successCallback, errorCallback) {
    var newsFromStore = kony.store.getItem("newsArr");
    if (newsFromStore) {
      return successCallback(newsFromStore);
    }
    
    var newsArr = [];
    
    makeHttpRequest(NEWS_BASE_URL, function (currentData) {
      if (currentData) {
        currentData.response.results.forEach(function(m) {
			newsArr.push({
              lblNewsTitle: m.webTitle,
              lblNewsDate: m.webPublicationDate.slice(0,10),
              lblNewsShortDesc: m.fields.trailText,
              imgNews: m.fields.thumbnail,
              bodyText: m.fields.bodyText
            });
		});
      }
      kony.store.setItem("newsArr", newsArr);
      successCallback(newsArr);
        
    }, errorCallback);
  };
  
    return {
        getNews: getNews
    };
});

