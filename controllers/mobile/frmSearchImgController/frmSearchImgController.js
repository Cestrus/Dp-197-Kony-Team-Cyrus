define(["SearchImgService", "DatabaseService"], function(SearchImgService, databaseService) {
  return {
    onInitialize: function() {
      this.resetVisiblity();
            
      this.loadedImageStore = new LoadedImageStore(); // array for all img on page
      this.favoriteImageStore = new FavoriteImageStore();
      
      this.view.btnSearch.onClick = this.onSendRequest.bind(this);      
      this.view.imgContainer.onBtnClick = this.onAddToCollection.bind(this);
    },

    // visibility methods
    resetVisiblity: function() {
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = false;
      this.view.imgContainer.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderNotFound: function() {
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = true;
      this.view.imgContainer.isVisible = false;
      this.view.lbNotInput.isVisible = false;
    },

    renderListImg: function() {
      this.view.imgRocket.isVisible = false;
      this.view.lbNotFound.isVisible = false;      
      this.view.imgContainer.isVisible = true;
      this.view.lbNotInput.isVisible = false;
    },

    renderNotInput: function() {
      this.view.lbNotInput.isVisible = true;
      this.view.imgRocket.isVisible = true;
      this.view.lbNotFound.isVisible = false;
      this.view.imgContainer.isVisible = false;
    },

    onSendRequest: function() {
      animation_4(this.view.btnSearch, 0.25);
      if(!this.view.inptSearchImg.text ||  this.view.inptSearchImg.text.trim() === ""){
        this.renderNotInput();
        return;
      }
      var requestText = this.view.inptSearchImg.text.trim();
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
        this.loadedImageStore.set(arrLinks);
        if(!this.loadedImageStore.length()) this.renderNotFound();  
        else {
          this.view.imgContainer.createListImages(this.loadedImageStore.get(), this.onShowFullImg); 
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

      onAddToCollection: function(arrImages) {
        var userId = kony.store.getItem("userId");
        var store = this.loadedImageStore.get();
        for (var i = 0; i < arrImages.length; i++){
          var link = store[arrImages[i]];
          databaseService.addImages ( userId, link );
          this.favoriteImageStore.push( link );
        }
        this.view.imgContainer.resetChoiceMark();
      },

  };
      
});