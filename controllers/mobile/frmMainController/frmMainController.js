define(["NewsService"], function(newsService) {
  return { 
    onInitialize: function() {
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);

      this.view.btnGoToNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnGoToWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.btnGoToSearchPhotos.onClick = this.onButtonGoToSearchImg.bind(this);
    },

    onButtonGoToSearchImg: function() {
        var navigation = new kony.mvc.Navigation("frmSearchImg");
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

    onButtonGoToWeather: function() {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate();
    }
  };

 });