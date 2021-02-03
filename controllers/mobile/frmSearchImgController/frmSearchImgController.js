define({ 

onInitialize: function() {
	this.resetVisiblity();
  
    this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
    this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
    this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
    this.view.btnSearch.onClick = this.onSendRequest.bind(this);
  
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

  // visibility methods
  
  resetVisiblity: function() {
	this.view.imgRocket.isVisible = true;
	this.view.lbNotFound.isVisible = false;
    this.view.lstImg.isVisible = false;
    this.view.btnAddToCollection.isVisible = false;
  },
  
  renderNotFound: function() {
    this.view.imgRocket.isVisible = true;
	this.view.lbNotFound.isVisible = true;
    this.view.lstImg.isVisible = false;
    this.view.btnAddToCollection.isVisible = false;
  },
  
  renderListImg: function() {
    this.view.imgRocket.isVisible = false;
	this.view.lbNotFound.isVisible = false;
    this.view.lstImg.isVisible = true;
    this.view.btnAddToCollection.isVisible = false;
  },
  
  // request methods
  onSendRequest: function() {
    kony.application.showLoadingScreen();
    
    var fullURL = this.URL_MAIN + this.view.inptSearchImg.text.split(' ').join('%20') + "&page=1";
    var httpClient = new kony.net.HttpRequest();
    httpClient.open(constants.HTTP_METHOD_GET, fullURL);
    httpClient.onReadyStateChange = this.onImgListReceived.bind(this, httpClient); 
    
    httpClient.send();
    
  },

  onImgListReceived: function(httpClient){
    if(httpClient.readyState !== constants.HTTP_READY_STATE_DONE) {
      return;
    }
    var responseData = httpClient.response;
    var imgLinks = responseData.collection.items.map(function(item) {
      if(item.links) {
        return { imgSpace: item.links[0].href };
      } else {
        return { imgSpace: "" };
      }
    });
    kony.application.dismissLoadingScreen();
	this.checkImgList(imgLinks);
  },
    
  checkImgList: function(arrLinks) {
    var imgLinks = arrLinks.filter(function(link) {
      return link.imgSpace !== "";
    });
	if(!imgLinks.length) this.renderNotFound();
    else {
      this.view.lstImg.setData(imgLinks);
      this.renderListImg();
    }    
  },
  

 });