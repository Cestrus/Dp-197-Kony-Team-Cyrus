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
      this.view.btnAddToCollection.onClick = this.onAddToCollection.bind(this);
      this.view.btnProfile.onClick = this.onGoToProfile.bind(this);      
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
      this.view.ImgContainerSearch.isVisible = false;
      this.view.btnAddToCollection.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderNotFound: function() {
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = true;
      this.view.ImgContainerSearch.isVisible = false;
      this.view.btnAddToCollection.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderListImg: function() {
      this.view.imgRocket.isVisible = false;
      this.view.lbNotFound.isVisible = false;      
      this.view.ImgContainerSearch.isVisible = true;
      this.view.btnAddToCollection.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderNotInput: function() {
      this.view.lbNotInput.isVisible = true;
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = false;
      this.view.ImgContainerSearch.isVisible = false;
      this.view.btnAddToCollection.isVisible = false;
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
          this.createListImg(this.loadedImageStore.get());
          this.renderListImg();
        }        
      } 
      kony.application.dismissLoadingScreen();
    },
      
    createListImg: function(arrImg){
      this.view.ImgContainerSearch.removeAll();
      for(var i = 0; i < arrImg.length; i++){
        var image = this.createImg( i, arrImg[i] );
        this.view.ImgContainerSearch.add( image );
      }
    },  
      
    createImg: function(index, src){
      var container = new kony.ui.FlexContainer({
        "id": "imgCont" + index,
        "height": "40%",
        "width": kony.flex.USE_PREFERED_SIZE,
        "top": (index * (40 + 3)) + 3 + "%", 
        "centerX": "50%"
      });
      
      var image = new kony.ui.Image2({
        "id": "image" + index,
        "src": src,
        "height": "100%",
        "centerX": "50%"
      });
      
      var choiceMark = new kony.ui.Label({
        "id": "choiceMark" + index,
        "skin": "skinldlChoosenImg",
        "isVisible": false,
        "bottom": "10dp",
        "right": "20dp",
        "width": "20dp",
        "height": "20dp",
        "text": "\uf00c",
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                
      }); 
      
      container.add(image);
      container.add(choiceMark);
      container.addGestureRecognizer(1, {fingers: 1, taps: 2}, this.onShowFullImg.bind(this));
      container.addGestureRecognizer(3, {pressDuration: 2}, this.onChooseImg.bind(this));
      return container;
    }, 
     
    onShowFullImg: function(widget) {
      var index = widget.id.match(/\d\d?/)[0];
      var data = {num: index, isSearchScreen: true};
      var navigation = new kony.mvc.Navigation("frmFullImg");
      navigation.navigate(data);
    },

    onChooseImg: function(widget) {
      var imgUrl =  widget.widgets()[0].src;
      var mark = widget.widgets()[1];
      mark.isVisible = !mark.isVisible;
      if( mark.isVisible ) this.chosenImgArr.push(imgUrl);
      else this.chosenImgArr = this.chosenImgArr.filter(function(el){ return el !== imgUrl;});
      (this.chosenImgArr.length) ? this.view.btnAddToCollection.isVisible = true : this.view.btnAddToCollection.isVisible = false;
    },
      
    onAddToCollection: function() {
			this.favoriteImageStore.push(this.chosenImgArr);
      this.chosenImgArr.length = 0;
      this.resetChoiceMark();
      this.view.btnAddToCollection.isVisible = false;
    },
      
    resetChoiceMark: function() {
      var containersArr = this.view.ImgContainerSearch.widgets();
      containersArr.forEach( function(cont) {
        if(cont) cont.widgets()[1].isVisible = false; /// if ???
      });
    }  
 
  };
});