define({ 
  onInitialize: function() {
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
    this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
    this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
    this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
    
    this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
     
//     this.view.onNavigate = this.onNavigated.bind(this); 
    this.view.postShow = this.onFormShowed.bind(this);
    
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
  
  onNavigate: function(data) {
    this.navigationData = data;
  },
	
	onFormShowed: function() {
// 		alert(this.navigationData);
    this.view.imgSpaceFull.src = this.navigationData.imgSpace;
    this.view.imgSpaceFull.width = '100%';

    
	}


 });