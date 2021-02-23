var appService = {
  makeHttpRequest: function(url, successCallback, errorCallback) {
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
  }
};

var HttpResponseCodes = {
  OK: 200
};

function InitSDK() {
  var appkey = "158155ef095a83468bc04c94728d3490";
  var appsecret = "927023e314b1768ba01ec57dbaa1314b";
  var serviceUrl = "https://fabric.fortnet/authService/100000002/appconfig";

  var client = new kony.sdk();
  kony.print("Init started >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  client.init(appkey, appsecret, serviceUrl, function(response) {
    kony.print("Init success >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + JSON.stringify(response));
  }, function(error) {
    kony.print("Init failed >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> " + JSON.stringify(error));
  });
}