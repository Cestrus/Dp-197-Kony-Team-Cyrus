define(["WeatherService", "FavoritesService"], function(weatherService, favoritesService){
  return {
    onInitialize: function() {
      //this.view.postShow = this.onFormShowed.bind(this);  

      this.view.nav.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.lstNews.onRowClick = this.onSeparateNewsClicked.bind(this);
    },

    onNavigate: function(data) {
      if(data) this.view.lstNews.setData(data);
      favoritesService.getFavoriteArticles(kony.store.getItem("userId"), function(articleIdsArr) {
        kony.print("Integration Get Favorite Articles List Service Success:" + JSON.stringify(articleIdsArr));
      }, function(error) {
        kony.print("Integration Get Favorite Articles List Service Failure:" + JSON.stringify(error));
      });
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
  };


});