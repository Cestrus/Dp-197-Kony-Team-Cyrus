define(["NewsService", "WeatherService"], function(newsService, weatherService) {
  return { 
    onInitialize: function() {
      this.favoriteImageStore = new FavoriteImageStore();
      this.chosenImgArr = [];

      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      
      this.view.imgFlxScrollContainer.initiolize( this.chosenImgArr, this.onShowFullImg.bind(this), 'Delete', this.onDeleteImg.bind(this));
      this.view.preShow = this.onFormPreShow.bind(this);
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
      this.view.imgFlxScrollContainer.isVisible = false;
    },

    renderCollection: function() {
      this.view.lbCollectionEmptyTitle.isVisible = false;
      this.view.imgRocket.isVisible = false;
      this.view.imgFlxScrollContainer.isVisible = true;
    },

    onFormPreShow: function() {
      if (!this.favoriteImageStore.length()) this.renderEmptyCollection();
      else {
        this.renderCollection();
        this.view.imgFlxScrollContainer.createListImg(this.favoriteImageStore.get());
      }      
    }, 
    
    onShowFullImg: function(widget) {
      var index = widget.id.match(/\d\d?/)[0];
      var data = {num: index, isSearchScreen: false};
      var navigation = new kony.mvc.Navigation("frmFullImg");
      navigation.navigate(data);
    },

    onDeleteImg: function() {
      this.favoriteImageStore.delete(this.chosenImgArr);
      if (this.favoriteImageStore.length()) {
        this.view.imgFlxScrollContainer.createListImg(this.favoriteImageStore.get());
      } else {
        this.renderEmptyCollection();
      }
      this.chosenImgArr.length = 0;
    }

  };
});