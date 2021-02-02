define({ 

onInitialize: function() {
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
//     this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
    this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
    this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
	this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
  },
  
  onButtonGoToHome: function() {
    var navigation = new kony.mvc.Navigation("frmMain");
    navigation.navigate();
  },
  
//   onButtonGoToSearchImg: function() {
//       var navigation = new kony.mvc.Navigation("frmSearchImg");
//       navigation.navigate();
//   },  
  
  onButtonGoToNews: function() {
      var navigation = new kony.mvc.Navigation("frmNews");
      navigation.navigate();
  },
  
  onButtonGoToWeather: function() {
      var navigation = new kony.mvc.Navigation("frmWeather");
      navigation.navigate();
  }

 });