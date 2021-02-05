define(function () {
  var WEATHER_BASE_URL = "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json";
  
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
 
  var getWeather = function (successCallback, errorCallback) {
    var weatherData = kony.store.getItem("listDates");
    if (weatherData) {
      return successCallback(weatherData);
    }
    
    
    var weather = null;
    
    makeHttpRequest(WEATHER_BASE_URL, function (currentData) {
      if (currentData && Array.isArray(currentData)) {
        weather = currentData.soles.map(function (dataByDate) {
          return new Weather(dataByDate);
        });
      }
      
      kony.store.setItem("weather", weather);
      successCallback(weather);

    }, errorCallback);
  };
  
    return {
        getWeather: getWeather
    };
});

