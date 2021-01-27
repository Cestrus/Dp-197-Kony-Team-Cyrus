define({ 
  onInitialize: function() {
    this.view.btnGoToWeather.onClick = this.onButtonGoToWeather.bind(this);
    this.viewbtnGoToSearchPhotos.onClick = this.onButtonGoToSearchPhotos.bind(this);
  },
  
  onButtonGoToWeather: function() {
      var navigation = new kony.mvc.Navigation("frmID");
      navigation.navigate();
  },
  
  onButtonGoToSearchPhotos: function() {
      var navigation = new kony.mvc.Navigation("frmID");
      navigation.navigate();
  }

 });