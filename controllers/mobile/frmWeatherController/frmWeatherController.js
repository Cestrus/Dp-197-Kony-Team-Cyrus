define(["NewsService", "MarsFactsService"], function(newsService, marsFactsService) { 
  return {
    onInitialize: function() {  
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnInfo.onClick = this.onButtonGoInfo.bind(this);
      this.view.btnProfile.onClick = this.onGoToProfile.bind(this);
    },

    onNavigate: function(data) {
      this.view.lstDates.setData(data);
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

    onButtonGoToSearchImg: function() {
      var navigation = new kony.mvc.Navigation("frmSearchImg");
      navigation.navigate();
    },
    
    onButtonGoInfo: function() {
      marsFactsService.getFacts(function(facts) {
        var navigation = new kony.mvc.Navigation("frmWeatherFAQ");
        navigation.navigate(facts);
        
      },function() {
        alert("Error while retrieving Mars weather facts.");
      });
    },
    
    onGoToProfile: function() {
      var navigation = new kony.mvc.Navigation("frmCollectionImg");
      navigation.navigate();
    }

  };

});
