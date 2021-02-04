define(["NewsService"], function(newsService) {
  return { 
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
		this.view.imgNews.src = data.imgNews;
		this.view.lblNewsTitle.text = data.lblNewsTitle;
        this.view.lblNewsText.text = data.bodyText;
    },

    onButtonGoToHome: function() {
        var navigation = new kony.mvc.Navigation("frmMain");
        navigation.navigate();
    },  

    onButtonGoToNews: function() {
      newsService.getNews(function(arr) {
        var navigation = new kony.mvc.Navigation("frmNews");
        navigation.navigate(arr);
      },function() {
        alert("Error while retrieving news list.");
      });
    },

    onButtonGoToSearchImg: function() {
        var navigation = new kony.mvc.Navigation("frmSearchImg");
        navigation.navigate();
    },

    onButtonGoToWeather: function() {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate();
    }
  };

 });