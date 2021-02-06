define({ 
  onInitialize: function() {  
    this.loadImg = new LoadImgStore();
    this.currNum = null;
    this.view.btnRightFullImg.onClick = this.onNextImg.bind(this);
    this.view.btnLeftFullImg.onClick = this.onPrevImg.bind(this);
    this.view.btnDeleteImg.onClick = this.onDeleteImg.bind(this);
    this.view.btnAddImg.onClick = this.onAddImg.bind(this);
  
    this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
     
    this.view.preShow = this.onFormShowed.bind(this);
    
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
	
	onFormShowed: function() {
    if(!this.navigationData){
      var navigation = new kony.mvc.Navigation('frmSearchImg');
      navigation.navigate();
    } else {
      this.currNum = this.navigationData.num;
      this.view.imgSpaceFull.src = this.loadImg.get()[this.currNum].imgSpace;    
			this.view.imgSpaceFull.width = '100%'; // will test without this
			this.navigationData.isSearchScreen ? this.renderForSearch() : this.renderForFavorite();
    }
  },
  
  onNextImg: function() {
    this.currNum = (this.currNum + 1 >= this.loadImg.get().length) ? this.currNum : ++this.currNum;
    this.view.imgSpaceFull.src = this.loadImg.get()[this.currNum].imgSpace;
  },

  onPrevImg: function() {
    this.currNum = this.currNum - 1 < 0 ? this.currNum : --this.currNum;
    this.view.imgSpaceFull.src = this.loadImg.get()[this.currNum].imgSpace;
  },
  
  onDeleteImg: function() {
    
  },
  
  onAddImg: function() {
    
  },
       
 });