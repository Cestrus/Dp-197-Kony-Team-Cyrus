define(function () {
   
  var getWeather = function (successCallback, errorCallback) {

    var weather = [];
    var sdk = kony.sdk.getCurrentInstance();
    var weatherService = sdk.getIntegrationService("CyrusWeatherService");
    var params = null;
    var headers = null; 
    
    weatherService.invokeOperation("getWeather", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));
      
      response.soles.forEach(function(el) {
        weather.push({
          lblSol: 'Sol ' + el.sol,
          lblDate: el.terrestrial_date,
          lblSunrise: el.sunrise,
          lblSunset: el.sunset,
          lblTempMin: el.min_temp +'°C',
          lblTempMax: el.max_temp + '°C',
          lblIconSun: '\uf185',
          lblIconMoon: '\uf186',
          lblIconTempLow: '\uf2cb',
          lblIconTempHigh: '\uf2c7'
        });
      });
      
      if (successCallback) {
        successCallback(weather);
      }
      
      
    }, function(error) {
        kony.print("Integration Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });

  };
  
  return {
    getWeather: getWeather
  };
});