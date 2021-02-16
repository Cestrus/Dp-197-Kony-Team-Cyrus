define(function () {
  var WEATHER_BASE_URL = "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json";
 
  var getWeather = function (successCallback, errorCallback) {
    var weatherData = kony.store.getItem("weather");
    if (weatherData) {
      return successCallback(weatherData);
    }

    var weather = [];
    
    appService.makeHttpRequest (WEATHER_BASE_URL, function (currentData) {
      if (currentData) {
        var dates = currentData.soles;
        
        for (var i = 0; i <= 6; i++){
          
          weather.push({
              lblSol: 'Sol ' + dates[i].sol,
              lblDate: dates[i].terrestrial_date,
              lblSunrise: dates[i].sunrise,
              lblSunset: dates[i].sunset,
              lblTempMin: dates[i].min_temp +'°C',
              lblTempMax: dates[i].max_temp + '°C',
              lblIconSun: '\uf185',
              lblIconMoon: '\uf186',
              lblIconTempLow: '\uf2cb',
              lblIconTempHigh: '\uf2c7',
         });
        }
      }
        
      kony.store.setItem("weather", weather);
      successCallback(weather);

    }, errorCallback);
  };
  
    return {
        getWeather: getWeather
    };
});

