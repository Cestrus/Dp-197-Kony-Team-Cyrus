define(["WeatherServiceHttpImpl"], function (concreteImpl) {
  
  return {
    getWeather: concreteImpl.getWeather,
//     getInfoWeather: concreteImpl.getInfoWeather,
  };

});