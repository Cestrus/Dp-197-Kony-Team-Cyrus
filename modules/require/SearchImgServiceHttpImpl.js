define(function () {
  var URL_MAIN = "https://images-api.nasa.gov/search?q=";

  var makeURL = function(str) {
    return URL_MAIN + str.split(' ').join('%20') + "&page=1";
  };

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

  var getImages = function(str, successCallback, errorCallback) {	
    if(!str){
      successCallback(false);
    } else {
      var url = makeURL(str);
      makeHttpRequest(
        url, 
        function(responseData){
          var imgLinks = responseData.collection.items.map(function(item) {
            return (item.links) ? item.links[0].href : '';
          });                  	
          successCallback(imgLinks);
        }, 
        errorCallback
      );
    }       
  };

  return {
    getImages: getImages,
  };
});