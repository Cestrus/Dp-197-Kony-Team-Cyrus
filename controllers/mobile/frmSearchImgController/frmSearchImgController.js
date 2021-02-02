define({ 

onInitialize: function() {
	this.resetVisiblity();
  
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
    this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
    this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
  
	this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
 
	this.URL_MAIN = "https://images-api.nasa.gov/search?q=";
  },
  
  onButtonGoToHome: function() {
    var navigation = new kony.mvc.Navigation("frmMain");
    navigation.navigate();
  },
   
  onButtonGoToNews: function() {
      var navigation = new kony.mvc.Navigation("frmNews");
      navigation.navigate();
  },
  
  onButtonGoToWeather: function() {
      var navigation = new kony.mvc.Navigation("frmWeather");
      navigation.navigate();
  },

  resetVisiblity: function() {
	this.view.imgRocket.visibility  = true;
	this.view.lbNotFound.visibility = false;
    this.view.lstImg.visibility = false;
  },
  
  setFullUrl: function(str) {
	return this.URL_MAIN + str + "&page=1";
}

  

 });