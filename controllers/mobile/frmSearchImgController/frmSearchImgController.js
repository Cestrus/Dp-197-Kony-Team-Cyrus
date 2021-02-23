define(["SearchImgService", "NewsService", "WeatherService"], function(SearchImgService, newsService, weatherService){
  return {
    onInitialize: function() {
      this.resetVisiblity();
            
      this.loadedImageStore = new LoadedImageStore(); // array for all img on page
      this.favoriteImageStore = new FavoriteImageStore();
      this.chosenImgArr = [];
 
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.btnSearch.onClick = this.onSendRequest.bind(this);
      this.view.btnProfile.onClick = this.onGoToProfile.bind(this);    
      
      this.view.imgFlxScrollContainer.initiolize( this.chosenImgArr, this.onShowFullImg.bind(this), 'Add to collection', this.onAddToCollection.bind(this));
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

    onGoToProfile: function() {
      var navigation = new kony.mvc.Navigation("frmCollectionImg");
      navigation.navigate();
    },
    
    // visibility methods

    resetVisiblity: function() {
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = false;
      this.view.imgFlxScrollContainer.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderNotFound: function() {
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = true;
      this.view.imgFlxScrollContainer.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderListImg: function() {
      this.view.imgRocket.isVisible = false;
      this.view.lbNotFound.isVisible = false;      
      this.view.imgFlxScrollContainer.isVisible = true;
      this.view.lbNotInput.isVisible = false;
    },

    renderNotInput: function() {
      this.view.lbNotInput.isVisible = true;
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = false;
      this.view.imgFlxScrollContainer.isVisible = false;
    },

    onSendRequest: function() {
      
      var requestText = this.view.inptSearchImg.text? this.view.inptSearchImg.text.trim() : this.view.inptSearchImg.text;
      kony.application.showLoadingScreen();

      SearchImgService.getImages(
        requestText,
        this.checkImgList.bind(this),
      );   
    },

    checkImgList: function(arrLinks) {
      if(!arrLinks){
        this.renderNotInput();
      } else {
        var tempArr = arrLinks.filter(function(link) { // delete arr element ""
          return link !== "";
        });
        this.loadedImageStore.set(tempArr);
        if(!this.loadedImageStore.length()) this.renderNotFound();  
        else {
          this.view.imgFlxScrollContainer.createListImg(this.loadedImageStore.get());
          this.renderListImg();
        }        
      } 
      kony.application.dismissLoadingScreen();
    },
 
    onShowFullImg: function(widget) {
      var index = widget.id.match(/\d\d?/)[0];
      var data = {num: index, isSearchScreen: true};
      var navigation = new kony.mvc.Navigation("frmFullImg");
      navigation.navigate(data);
    },

    onAddToCollection: function() {
      var arrImg = this.loadedImageStore.get();
      for (var i = 0; i < this.chosenImgArr.length; i++){
        var el = arrImg[this.chosenImgArr[i]];
        this.favoriteImageStore.push( el );
      }
      this.chosenImgArr.length = 0;
    },
      
  };
      
});