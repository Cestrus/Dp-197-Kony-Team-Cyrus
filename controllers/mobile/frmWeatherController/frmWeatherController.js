define({ 
  onInitialize: function() {
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
    this.view.postShow = this.onFormShowed.bind(this);
    this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
    this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
//     this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
    this.view.tabBtnCollection.onClick = this.onButtonGoToCollection.bind(this);
  },
  
  onButtonGoToHome: function() {
    var navigation = new kony.mvc.Navigation("frmMain");
    navigation.navigate();
  },
  
  onButtonGoToSearchImg: function() {
      var navigation = new kony.mvc.Navigation("frmSearchImg");
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
  
  onButtonGoToCollection: function() {
      var navigation = new kony.mvc.Navigation("frmCollectionImg");
      navigation.navigate();
  },
  
  onFormShowed: function() {
    this.loadWeather();
  },
  
  loadWeather: function() {
    kony.application.showLoadingScreen();
    
    var httpClient = new kony.net.HttpRequest();
    
    httpClient.open(constants.HTTP_METHOD_GET, "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json");
    httpClient.onReadyStateChange = this.onWeatherReceived.bind(this, httpClient);
    
    httpClient.send();
  },
  
  onWeatherReceived: function(httpClient) {

    if(httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
      return;
    }
    
      
    var weatherData = httpClient.response;
    var listData = weatherData.soles.map(function(d) {
      return {
        lblSol: `Sole ${d.id}`,
        lblDate: d.terrestrial_date,
        lblSunrise: `Sunrise ${d.sunrise}`,
        lblSunset: `Sunset ${d.sunset}`,
        lblTempMin: `Min ${d.min_temp}°C`,
        lblTempMax: `Max ${d.max_temp}°C`,
      };
    });

    this.view.lstDates.setData(listData);
    kony.application.dismissLoadingScreen();

  }

 });