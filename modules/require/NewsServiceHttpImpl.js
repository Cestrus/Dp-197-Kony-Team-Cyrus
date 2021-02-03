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
  
  var freshNews = null; 
  
  var getNews = function (successCallback, errorCallback) {
    
    makeHttpRequest(NEWS_BASE_URL, function (currentData) {
      freshNews = currentData.response.results.map(function (c) {
        return {
          lblNewsTitle: c.webTitle,
          lblNewsDate: c.webPublicationDate.slice(0,10),
          lblNewsShortDesc: c.fields.trailText,
          imgNews: c.fields.thumbnail
        };
      });
      successCallback(freshNews);
    }, errorCallback);
  };
  
    return {
        getNews: getNews
    };
});