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

  },

  onNavigate: function(data) {
      this.view.lstNews.setData(data);
  },
  
  onFormShowed: function() {
    this.loadNewsList();
  },
  
  loadNewsList: function() {
    kony.application.showLoadingScreen();
    
    // Creation phase
    var httpClient = new kony.net.HttpRequest();
    // Setup phase
    httpClient.open(constants.HTTP_METHOD_GET, "https://content.guardianapis.com/search?section=science&order-by=newest&show-elements=all&show-fields=all&q=space%2C%20technology&api-key=a9cd8943-4ed2-4441-b3d4-4cbf89189828");
    httpClient.onReadyStateChange = this.onNewsListReceived.bind(this, httpClient);
    
    // Action
    httpClient.send();
  },
  
  onNewsListReceived: function(httpClient) {
    kony.print("Movie List Retrieval State Change: " + httpClient.readyState);

    if(httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
      return;
    }
    
      
    var newsData = httpClient.response;
    var listData = newsData.response.results.map(function(m) {
      return {
        lblNewsTitle: m.webTitle,
        lblNewsDate: m.webPublicationDate.slice(0,9),
        lblNewsShortDesc: m.fields.trailText,
        imgNews: m.fields.thumbnail
      };
    });

    this.view.lstNews.setData(listData);
    kony.application.dismissLoadingScreen();

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
  }
  
 });