define({ 
  onInitialize: function() {  
    this.currStore = null;
    this.currNum = null;
    this.view.btnRightFullImg.onClick = this.onNextImg.bind(this);
    this.view.btnLeftFullImg.onClick = this.onPrevImg.bind(this);
    this.view.btnDeleteImg.onClick = this.onDeleteImg.bind(this);
    this.view.btnAddImg.onClick = this.onAddImg.bind(this);
    this.view.btnProfile.onClick = this.onGoToProfile.bind(this);
    this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);

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
    if(!this.navigationData){
      var navigation = new kony.mvc.Navigation('frmSearchImg');
      navigation.navigate();
    } else {
      this.currNum = this.navigationData.num;
      this.view.imgSpaceFull.width = '100%'; // test without this

      this.currStore = this.navigationData.isSearchScreen ? new LoadImgStore() : new FavorImgStore();

      this.view.imgSpaceFull.src = this.currStore.get()[this.currNum].imgSpace; 
      this.navigationData.isSearchScreen ? this.renderForSearch() : this.renderForFavorite();
    }
  },

  onNextImg: function() {
    this.currNum = (this.currNum + 1 >= this.currStore.get().length) ? this.currNum : ++this.currNum;
    this.view.imgSpaceFull.src = this.currStore.get()[this.currNum].imgSpace;
  },

  onPrevImg: function() {
    this.currNum = this.currNum - 1 < 0 ? this.currNum : --this.currNum;
    this.view.imgSpaceFull.src = this.currStore.get()[this.currNum].imgSpace;
  },

  onDeleteImg: function() {
    this.showMessage('deleted');
    this.currStore.delete(this.currNum);
    if (!this.currStore.get().length) {
      var navigation = new kony.mvc.Navigation("frmCollectionImg");
      navigation.navigate();
    }
    else this.onPrevImg();
  },

  onAddImg: function() {
    this.showMessage('added');
    var inst = new FavorImgStore();
    inst.push(this.currStore.get()[this.currNum]);
  },
  


});