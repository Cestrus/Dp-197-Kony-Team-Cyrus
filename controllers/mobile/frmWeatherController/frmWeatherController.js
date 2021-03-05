define(["NewsService", "MarsFactsService"], function(newsService, marsFactsService) { 
  return {
    onInitialize: function() {  
      this.view.nav.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnInfo.onClick = this.onButtonGoInfo.bind(this);
    },

    onNavigate: function(data) {
      if(data) this.view.lstDates.setData(data);
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

    onButtonGoInfo: function() {
      marsFactsService.getFacts(function(facts) {
        var navigation = new kony.mvc.Navigation("frmWeatherFAQ");
        navigation.navigate(facts);
        
      },function() {
        alert("Error while retrieving Mars weather facts.");
      });
    },
  };

});
