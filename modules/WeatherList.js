function Weather(date) {
  this.ls = date.ls || '';
  this.terrestrial_date = date.terrestrial_date || '';
  this.sunrise = date.sunrise || '';
  this.sunset = date.sunset || '';
  this.min_temp = date.min_temp || '';
  this.max_temp = date.max_temp || '';
}

Weather.prototype = function () {
  return {
    lblSol: `Sole ${ls}`,
	lblDate: terrestrial_date,
    lblSunrise: `Sunrise ${sunrise}`,
    lblSunset: `Sunset ${sunset}`,
    lblTempMin: `Min ${min_temp}°C`,
    lblTempMax: `Max ${max_temp}°C`,
  };
};