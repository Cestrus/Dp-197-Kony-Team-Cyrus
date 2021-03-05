define(["NewsService", "MarsFactsService", "WeatherService"], function(newsService, marsFactsService, weatherService) {
  return { 
	onInitialize: function() { 
//       this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
//       this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.nav.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.nav.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
          
      this.view.headerApp.onBackClicked = function () {
        this.onButtonGoInfo();
      }.bind(this);
    },

    onNavigate: function(data) {
		this.view.lblFactTitle.text = data.lblTitle;
        this.view.lblFactText.text = data.factContent;
    },

//     onButtonGoToHome: function() {
//         var navigation = new kony.mvc.Navigation("frmMain");
//         navigation.navigate();
//     },  

    onButtonGoToNews: function() {
      newsService.getNews(function(arr) {
        var navigation = new kony.mvc.Navigation("frmNews");
        navigation.navigate(arr);
      },function() {
        alert("Error while retrieving news list.");
      });
    },

//     onButtonGoToSearchImg: function() {
//         var navigation = new kony.mvc.Navigation("frmSearchImg");
//         navigation.navigate();
//     },

    onButtonGoToWeather: function() {
      weatherService.getWeather(function(arr) {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate(arr);
        
      },function() {
        alert("Error while retrieving Mars weather.");
      });
    },
    
    onButtonGoInfo: function() {
      marsFactsService.getFacts(function(facts) {
        var navigation = new kony.mvc.Navigation("frmWeatherFAQ");
        navigation.navigate(facts);
        
      },function() {
        alert("Error while retrieving Mars weather facts.");
      });
    }
  };
 });