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
    var weatherData = kony.store.getItem("weather");
    if (weatherData) {
      return successCallback(weatherData);
    }
    
    
    var weather = [];
    
      makeHttpRequest(WEATHER_BASE_URL, function (currentData) {
      if (currentData) {
        currentData.soles.forEach(function(d) {
			weather.push({
              lblSol: `Sole ${d.sol}`,
              lblDate: d.terrestrial_date,
              lblSunrise: `Sunrise ${d.sunrise}`,
              lblSunset: `Sunset ${d.sunset}`,
              lblTempMin: `Min ${d.min_temp}°C`,
              lblTempMax: `Max ${d.max_temp}°C`,
            });
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

