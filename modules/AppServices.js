var makeHttpRequestTry = function(url, successCallback, errorCallback) {
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