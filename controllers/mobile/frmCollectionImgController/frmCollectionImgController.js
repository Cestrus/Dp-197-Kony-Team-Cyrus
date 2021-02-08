define(["NewsService", "WeatherService"], function(newsService, weatherService) {
  return { 
    onInitialize: function() {
      this.favorImgStore = new FavorImgStore();
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);

      this.view.btnGoBack.onClick = function () {
        var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
        navigation.navigate();
      }.bind(this);

      this.view.preShow = this.onFormPreShow.bind(this);
      this.view.lstImg.onRowClick = this.onShowFullImg.bind(this);
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

    renderEmptyCollection: function() {
      this.view.lbCollectionEmptyTitle.isVisible = true;
      this.view.imgRocket.isVisible = true;
      this.view.lstImg.isVisible = false;
    },

    renderCollection: function() {
      this.view.lbCollectionEmptyTitle.isVisible = false;
      this.view.imgRocket.isVisible = false;
      this.view.lstImg.isVisible = true;
    },

    onFormPreShow: function() {
      if (!this.favorImgStore.get().length) this.renderEmptyCollection();
      else {
        this.renderCollection();
        this.view.lstImg.setData(this.favorImgStore.get());
      }      
    }, 

    onShowFullImg: function(seguiWidget, sectionNumber, rowNumber, selectedState) {
      var data = {num: rowNumber, isSearchScreen: false};
      var navigation = new kony.mvc.Navigation("frmFullImg");
      navigation.navigate(data);
    },

  };
});