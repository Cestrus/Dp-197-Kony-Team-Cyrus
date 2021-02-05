define({ 
  onInitialize: function() {
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
    this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
    this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
    this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
    
    this.view.btnRightFullImg.onClick = this.onNextImg.bind(this);
    this.view.btnLeftFullImg.onClick = this.onPrevImg.bind(this);
  
    this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
     
//     this.view.onNavigate = this.onNavigated.bind(this); 
    this.view.preShow = this.onFormShowed.bind(this);
    
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
    var navigation = new kony.mvc.Navigation("frmWeather");
    navigation.navigate();
  },
  
  onButtonGoToSearchImg: function() {
    var navigation = new kony.mvc.Navigation("frmSearchImg");
    navigation.navigate();
  },
  
  renderForSearch: function() {
    this.view.btnLeftFullImg.isVisible = false;
    this.view.btnRightFullImg.isVisible = false;
    this.view.btnDeleteImg.isVisible = false;
    this.view.btnAddImg.isVisible = true;
  },
  
  renderForFavorite: function() {
    this.view.btnLeftFullImg.isVisible = true;
    this.view.btnRightFullImg.isVisible = true;
    this.view.btnDeleteImg.isVisible = true;
    this.view.btnAddImg.isVisible = false;
	},
  
  onNavigate: function(data) {
    this.navigationData = data;
  },
	
	onFormShowed: function() {
    this.view.imgSpaceFull.src = this.navigationData.imgLink;
    this.view.imgSpaceFull.width = '100%';
		this.navigationData.isSearchScreen ? this.renderForSearch() : this.renderForFavorite();
	},
  
  onNextImg: function() {
    
  },

  onPrevImg: function() {
    
  },
       
 });