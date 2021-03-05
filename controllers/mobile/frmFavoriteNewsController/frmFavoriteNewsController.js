define(["WeatherService", "NewsService", "FavoritesService"], function(weatherService, newsService, favoritesService){
  return {
    onInitialize: function() {
      //this.view.postShow = this.onFormShowed.bind(this);  
      this.view.nav.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.nav.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);

      this.view.lstSavedNews.onRowClick = this.onSeparateNewsClicked.bind(this);
	
      this.view.headerApp.onBackClicked = function () {
		// ========= your logic  =============
      }.bind(this);
    },

    onNavigate: function(data) {
      if(data) this.view.lstSavedNews.setData(data);
      favoritesService.getFavoriteArticles(kony.store.getItem("userId"), function(articleIdsArr) {
        kony.print("Integration Get Favorite Articles List Service Success:" + JSON.stringify(articleIdsArr));
      }, function(error) {
        kony.print("Integration Get Favorite Articles List Service Failure:" + JSON.stringify(error));
      });
      //alert(data);
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