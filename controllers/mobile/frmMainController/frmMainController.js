define({ 
  onInitialize: function() {
    //this.view.btnGoToWeather.onClick = this.onButtonGoToWeather.bind(this);
    //this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
    //this.view.btnGoToSearchPhotos.onClick = this.onButtonGoToSearchPhotos.bind(this);
    //this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchPhotos.bind(this);
	this.view.btnGoToNews.onClick = this.onButtonGoToNews.bind(this);
	this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);

  },
  
  onButtonGoToWeather: function() {
      var navigation = new kony.mvc.Navigation("frmNews");
      navigation.navigate();
  },
  
  onButtonGoToSearchPhotos: function() {
      var navigation = new kony.mvc.Navigation("frmNews");
      navigation.navigate();
  },
  
  onButtonGoToNews: function() {
      var navigation = new kony.mvc.Navigation("frmNews");
      navigation.navigate();
  }

 });