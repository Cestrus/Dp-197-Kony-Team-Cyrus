define({ 
  onInitialize: function() {
	//this.view.postShow = this.onFormShowed.bind(this);  
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
    this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
    this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
	this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
    
    this.view.lstNews.onRowClick() = this.onSeparateNewsClicked.bind(this);

  },

  onNavigate: function(data) {
      this.view.lstNews.setData(data);
  },
  
  onSeparateNewsClicked: function (widgetRef, sectionNumber, rowNumber, selectedState) {
      var navigation = new kony.mvc.Navigation("frmSeparateNews");
      navigation.navigate(segmentWidgetRef.data[rowIndex]);
  },
  
  onButtonGoToHome: function() {
      var navigation = new kony.mvc.Navigation("frmMain");
      navigation.navigate();
  },
  
  onButtonGoToSearchImg: function() {
      var navigation = new kony.mvc.Navigation("frmSearchImg");
      navigation.navigate();
  },
  
  onButtonGoToWeather: function() {
      var navigation = new kony.mvc.Navigation("frmWeather");
      navigation.navigate();
  }
  
 });