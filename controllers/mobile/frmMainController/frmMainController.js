define(["WeatherService", "NewsService"], function(weatherService, newsService) {
  return { 
    onInitialize: function() {
      this.view.btnGoToNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnGoToWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.btnGoToSearchPhotos.onClick = this.onButtonGoToSearchImg.bind(this);
    },

    onButtonGoToSearchImg: function() {
        var navigation = new kony.mvc.Navigation("frmSearchImg");
        navigation.navigate();
    },
    
    onButtonGoToWeather: function() {
      weatherService.getWeather(function(arr) {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate(arr);

      },function() {
        alert("Error while retrieving Mars weather.");
      });
    }, 

    onButtonGoToNews: function() {
      newsService.getNews(function(arr) {
        var navigation = new kony.mvc.Navigation("frmNews");
        navigation.navigate(arr);
      },function() {
        alert("Error while retrieving news list.");
      });
    }
  };

 });