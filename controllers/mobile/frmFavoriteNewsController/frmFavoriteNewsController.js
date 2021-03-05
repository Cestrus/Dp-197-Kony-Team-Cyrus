define(["WeatherService", "NewsService", "FavoritesService"], function(weatherService, newsService, favoritesService){
  return {
    onInitialize: function() {
      this.view.nav.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.nav.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);

      this.view.lstSavedNews.onRowClick = this.onSeparateNewsClicked.bind(this);
	
      this.view.headerApp.onBackClicked = function () {
		// ========= your logic  =============
      }.bind(this);
    },

    onNavigate: function(data) {
      favoritesService.getFavoriteArticles();
      if(data) this.view.lstSavedNews.setData(data);
    },

    onSeparateNewsClicked: function (segmentWidgetRef, sectionNumber, rowIndex) {
      var navigation = new kony.mvc.Navigation("frmSeparateNews");
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

    onButtonGoToNews: function() {
      newsService.getNews(function(arr) {
        var navigation = new kony.mvc.Navigation("frmNews");
        navigation.navigate(arr);
      },function() {
        alert("Error while retrieving news list.");
      });
    },
  };
});