define({ 
  onInitialize: function() {    
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
      this.view.imgSpaceFull.src = this.navigationData.imgLink;    
			this.view.imgSpaceFull.width = '100%';
			this.navigationData.isSearchScreen ? this.renderForSearch() : this.renderForFavorite();
    }
  },
  
  onNextImg: function() {
    
  },

  onPrevImg: function() {
    
  },
  
  onDeleteImg: function() {
    
  },
  
  onAddImg: function() {
    
  },
       
 });