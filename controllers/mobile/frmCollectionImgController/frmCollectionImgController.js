define(["NewsService", "WeatherService"], function(newsService, weatherService) {
  return { 
    onInitialize: function() {
      this.favoriteImageStore = new FavoriteImageStore();
      this.chosenImgArr = [];
      
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
			this.view.btnDeleteCollection.onClick = this.onDeleteImg.bind(this);
      
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
      this.view.ImgContainerCollection.isVisible = false;
    },

    renderCollection: function() {
      this.view.lbCollectionEmptyTitle.isVisible = false;
      this.view.imgRocket.isVisible = false;
      this.view.ImgContainerCollection.isVisible = true;
    },

    onFormPreShow: function() {
      if (!this.favoriteImageStore.length()) this.renderEmptyCollection();
      else {
        this.renderCollection();
        this.createListImg(this.favoriteImageStore.get());
      }      
    }, 
    
    createListImg: function(arrImg){
      this.view.ImgContainerCollection.removeAll();
      for(var i = 0; i < arrImg.length; i++){
        var image = this.createImg( i, arrImg[i] );
        this.view.ImgContainerCollection.add( image );
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
    
    onChooseImg: function(widget) {
      var index = widget.id.match(/\d\d?/)[0];
      var mark = widget.widgets()[1];
      mark.isVisible = !mark.isVisible;
      if( mark.isVisible ) this.chosenImgArr.push(index);
      else this.chosenImgArr = this.chosenImgArr.filter(function(el){ return el !== index;});
      (this.chosenImgArr.length) ? this.view.btnDeleteCollection.isVisible = true : this.view.btnDeleteCollection.isVisible = false;
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
        this.view.ImgContainerCollection.removeAll();
        this.createListImg(this.favoriteImageStore.get());
      } 
      else this.renderEmptyCollection();
      this.chosenImgArr = [];
      this.view.btnDeleteCollection.isVisible = false;
    }
    
  };
});