define(["DatabaseService"], function(databaseService) {
  return { 
    onInitialize: function() {
      this.favoriteImageStore = new FavoriteImageStore();
      
      this.view.imgContainer.onBtnClick = this.onDeleteImg.bind(this);
      this.view.preShow = this.onFormPreShow.bind(this);    
    },

    renderEmptyCollection: function() {
      this.view.lbCollectionEmptyTitle.isVisible = true;
      this.view.imgRocket.isVisible = true;
      this.view.imgContainer.isVisible = false;
    },

    renderCollection: function() {
      this.view.lbCollectionEmptyTitle.isVisible = false;
      this.view.imgRocket.isVisible = false;
      this.view.imgContainer.isVisible = true;
    },

    onFormPreShow: function() {
      this.loadImages();   
    }, 
    
    onShowFullImg: function( widget ) {
      var index = widget.id.match(/\d\d?/)[0];
      var data = {num: index, isSearchScreen: false};
      var navigation = new kony.mvc.Navigation("frmFullImg");
      navigation.navigate(data);
    },

    onDeleteImg: function( arrImages ) { // array indexes
      var userId = kony.store.getItem("userId");
      for(var i = 0; i < arrImages.length; i++) {
        var link = this.favoriteImageStore.get()[arrImages[i]];
        databaseService.deleteImages ( userId, link );
      }
      
      this.favoriteImageStore.delete(arrImages);
      if (this.favoriteImageStore.length()) {
        this.view.imgContainer.createListImages(this.favoriteImageStore.get());
      } else {
        this.renderEmptyCollection();
      }
    },
    
    loadImages: function() {
      var userId = kony.store.getItem("userId");
      databaseService.getImages(
        userId,
        function(data){
          data.records.forEach (function(obj){ this.favoriteImageStore.push(obj.link);}.bind(this));
          if (!this.favoriteImageStore.length()) this.renderEmptyCollection();
          else {
            this.renderCollection();
            this.view.imgContainer.createListImages(this.favoriteImageStore.get(), this.onShowFullImg).bind(this);
          }      
        }.bind(this)
      );
    }, 

  };
});