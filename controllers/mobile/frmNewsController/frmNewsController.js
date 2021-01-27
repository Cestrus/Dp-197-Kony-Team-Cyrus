define({ 
onInitialize: function() {
    //this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
    //this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchPhotos.bind(this);
	this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
	this.view.btnGoBack.onClick = this.onButtonGoToHome.bind(this);

  },
  
  onButtonGoToHome: function() {
      var navigation = new kony.mvc.Navigation("frmMain");
      navigation.navigate();
  },
  
  onButtonGoToWeather: function() {
      var navigation = new kony.mvc.Navigation("frmMain");
      navigation.navigate();
  },
  
  onButtonGoToSearchPhotos: function() {
      var navigation = new kony.mvc.Navigation("frmMain");
      navigation.navigate();
  }

 });