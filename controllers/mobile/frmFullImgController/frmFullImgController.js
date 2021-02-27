define({ 
  onInitialize: function() {  
    this.currStore = null;
    this.currNum = null;
    
    this.currWidget = null;
    this.startX = 0;

    this.view.btnDeleteImg.onClick = this.onDeleteImg.bind(this);
    this.view.btnAddImg.onClick = this.onAddImg.bind(this);
    this.view.btnProfile.onClick = this.onGoToProfile.bind(this);

    this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);

    this.view.FlexContainerImg.onTouchStart = this.onTouchStart.bind(this);
    this.view.FlexContainerImg.onTouchEnd = this.onTouchEnd.bind(this);

    this.view.preShow = this.onFormPreShow.bind(this);

  },

  renderForSearch: function() {
    this.view.btnDeleteImg.isVisible = false;
    this.view.btnAddImg.isVisible = true;
  },

  renderForFavorite: function() {
    this.view.btnDeleteImg.isVisible = true;
    this.view.btnAddImg.isVisible = false;
  },

  onNavigate: function(data) {
    this.navigationData = data;
  },

  onGoToProfile: function() {
    var navigation = new kony.mvc.Navigation("frmCollectionImg");
    navigation.navigate();
  },

  onFormPreShow: function() {
    if (!this.navigationData) {
      var navigation = new kony.mvc.Navigation('frmSearchImg');
      navigation.navigate();
      
    } else {
      this.view.FlexContainerImg.removeAll();
      this.currNum = this.navigationData.num;
      if (this.navigationData.isSearchScreen) {
        this.currStore = new LoadedImageStore ();
        this.renderForSearch();
        
      } else {
        this.currStore = new FavoriteImageStore ();
        this.renderForFavorite();
      }

	var tempImage = this.createImage(this.currNum, this.currStore.get()[this.currNum]);
    this.currWidget =  this.insertImage(tempImage);
    }
  },

  onDeleteImg: function() { 
    this.showMessage('deleted', function(){
      this.currStore.delete(this.currNum);
      if (!this.currStore.length()) {
        var navigation = new kony.mvc.Navigation("frmCollectionImg");
        navigation.navigate();
      } else {
        this.currNum --;
        this.createCarousel('next');
      }
    }.bind(this));
  },

  onAddImg: function() {
    this.showMessage('added');
    var store = new FavoriteImageStore();
    store.push(this.currStore.get()[this.currNum]);
  },

  showMessage: function(str, clbk = null) {
    this.view.txtBoxAddImg.text = 'Image is ' + str;
    this.view.txtBoxAddImg.isVisible = true;
    kony.timer.schedule("timerMessg", function(){
      this.view.txtBoxAddImg.isVisible = false;
      if(clbk) clbk();
      kony.timer.cancel("timerMessg");
    }.bind(this), 1, false);
  },

  onTouchStart: function(widget, x){
    this.startX = x; 
  },

  onTouchEnd: function(widget, x){
    if (this.startX - x > 30) this.createCarousel('next');
    else if (x - this.startX > 30) this.createCarousel('prev');    
  },

  createImage: function(index, src){
    var image = new kony.ui.Image2({
      "id": "image" + index,
      "src": src,
      "left": '0dp',
      "right": "0dp",
      "height": "100%",
      "width": "100%",
      "centerY": "50%",
    });   
    return image;
  },
  
  createCarousel: function(direction) {
    var animDef = this.createAnimDef(direction);
    var duration = 0.25;
    
    if (direction === 'next' && this.currNum + 1 < this.currStore.length()) ++this.currNum;
    else if (direction === 'prev' && this.currNum - 1 >= 0)  --this.currNum;
    
    var tempImage = this.createImage(this.currNum, this.currStore.get()[this.currNum]);
    var nextImage = this.insertImage(tempImage, direction);
    this.animation(this.currWidget, animDef, duration);
    this.changeCurrImage(nextImage, duration);
  },
  
  insertImage: function(image, position = false){ 
    var widget = null;
    if(position){
      image.zIndex = 10;
      this.view.FlexContainerImg.add(image);
      widget = this.view.FlexContainerImg.widgets()[1];

    } else {
      image.zIndex = 20;
      this.view.FlexContainerImg.add(image);
      widget =  this.view.FlexContainerImg.widgets()[0];
    }
    return widget;
  },

  createAnimDef: function(direction){
    if(direction === 'next') {
      return kony.ui.createAnimation({
        "0": {
          "left": "0dp", 
          "right": "0dp"
        },
        "100": {
          "left": "-100%",
          "right": "100%"
        }
      });
    } else if (direction === 'prev') {
     return animDef = kony.ui.createAnimation({
        "0": {
          "left": "0dp",
          "right": "0dp"
        },
        "100": {
          "left": "100%",
          "right": "-100%",
        }
      });
    }
  },

  animation: function(widget, animDef, duration) {
    widget.animate (
      animDef, 
      {
        "duration": duration,
        "iterationCount": 1,
        "delay": 0,
        "fillMode": kony.anim.FILL_MODE_FORWARDS
      });
  },

  changeCurrImage: function(nextImage, duration){
    kony.timer.schedule("timerAnimat", function(){
      this.currWidget.removeFromParent();
      this.currWidget = nextImage;
      this.currWidget.zIndex = 20;
      kony.timer.cancel("timerAnimat");
    }.bind(this), duration, false);
  }

});