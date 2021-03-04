define(["NewsService", "WeatherService"], function(newsService, weatherService) { 
  return {
    onInitialize: function() {  
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      
//       this.view.btnGoBack.onClick = this.onButtonGoToWeather.bind(this);
//       this.view.btnProfile.onClick = this.onGoToProfile.bind(this);
      
      this.view.lstFacts.onRowClick = this.onFactClicked.bind(this);
    },
    
    onNavigate: function(data) {
      this.view.lstFacts.setData(data);
    },


    onFactClicked: function (segmentWidgetRef, sectionNumber, rowIndex) {
      var navigation = new kony.mvc.Navigation("frmFact");
      navigation.navigate(segmentWidgetRef.data[rowIndex]);
    },

    onButtonGoToHome: function() {
      var navigation = new kony.mvc.Navigation("frmMain");
      navigation.navigate();
    },

    onButtonGoToNews: function() {
      newsService.getNews( 
        function(arr) {
          var navigation = new kony.mvc.Navigation("frmNews");
          navigation.navigate(arr);
        },
        function() {
          alert("Error while retrieving news list.");
        }
      );
    },
    
    onButtonGoToWeather: function() {
      weatherService.getWeather(function(arr) {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate(arr);
        
      },function() {
        alert("Error while retrieving Mars weather.");
      });
    },

    onButtonGoToSearchImg: function() {
      var navigation = new kony.mvc.Navigation("frmSearchImg");
      navigation.navigate();
    },
    
//     onGoToProfile: function() {
//       var navigation = new kony.mvc.Navigation("frmCollectionImg");
//       navigation.navigate();
//     }

  };

});
