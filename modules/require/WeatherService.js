define(["WeatherServiceHttpImpl","WeatherServiceFabricImpl"], function (httpImpl, fabricImpl) {
  var concreteImpl = fabricImpl;

  return {
    getWeather: concreteImpl.getWeather,
  };

});