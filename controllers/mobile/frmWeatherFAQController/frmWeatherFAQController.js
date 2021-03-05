define(["WeatherService"], function(weatherService) { 
  return {
    onInitialize: function() {
      this.view.headerApp.onBackClicked = this.onButtonGoToWeather.bind(this);
      
      this.view.lstFacts.onRowClick = this.onFactClicked.bind(this);
    },
    
    onNavigate: function(data) {
      kony.print('DATA \n\n ' + JSON.stringify(data));
      this.view.lstFacts.setData(data);
    },

    onFactClicked: function (segmentWidgetRef, sectionNumber, rowIndex) {
      var navigation = new kony.mvc.Navigation("frmFact");
      navigation.navigate(segmentWidgetRef.data[rowIndex]);
    },
    
    onButtonGoToWeather: function() {
      weatherService.getWeather(function(arr) {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate(arr);
        
      },function() {
        alert("Error while retrieving Mars weather.");
      });
    },
  };

});
