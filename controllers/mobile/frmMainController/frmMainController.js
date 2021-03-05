define(["NewsService","WeatherService"], function(newsService, weatherService) {
  return { 
    onInitialize: function() {
//       this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.nav.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.nav.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      //alert(kony.store.getItem("userId"));
      this.view.btnGoToNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnGoToWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.btnGoToSearchPhotos.onClick = this.onButtonGoToSearchImg.bind(this);
      
//       this.view.btnProfile.onClick = this.onGoToProfile.bind(this);
    },

//     onButtonGoToSearchImg: function() {
//         var navigation = new kony.mvc.Navigation("frmSearchImg");
//         navigation.navigate();
//     },  

    onButtonGoToNews: function() {
      newsService.getNews(function(arr) {
        var navigation = new kony.mvc.Navigation("frmNews");
        navigation.navigate(arr);
      },function() {
        alert("Error while retrieving news list.");
      });
    },

    onButtonGoToWeather: function() {
      weatherService.getWeather(function(arr) {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate(arr);
        
      },function() {
        alert("Error while retrieving Mars weather.");
      });
    },

//     onGoToProfile: function() {
//       var navigation = new kony.mvc.Navigation("frmCollectionImg");
//       navigation.navigate();
//     },
  };

 });