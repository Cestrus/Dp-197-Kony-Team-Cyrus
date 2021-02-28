define(["NewsService"], function(newsService) {
  return { 
    onInitialize: function() { 
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnGoBack.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnFavoriteArticle.onClick = this.onButtonFavoriteArticle.bind(this);

    },

    onNavigate: function(data) {
      this.view.imgNews.src = data.imgNews;
      this.view.lblNewsTitle.text = data.lblNewsTitle;
      this.view.lblNewsText.text = data.bodyText;
      alert("On navigate check of the store " + this.checkSavedArticles(data.lblNewsTitle));
      if (this.checkSavedArticles(data.lblNewsTitle)[0]) {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
      } else {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
      }
    },
    
    checkSavedArticles: function(title) {
      var articleStore = JSON.parse(kony.store.getItem("savedArticles"));
      var index;
      if (articleStore !== null) { 
        for (index = 0; index < articleStore.length; index++) {
          if (articleStore[index].lblNewsTitle === title ) {
            return [1, index];
          }
        }
      }
      return [0];

    },
    
    updateAtricleStore: function(article, action, index) {
      var articleStore = JSON.parse(kony.store.getItem("savedArticles"));
      alert("article" + article.lblNewsTitle + "action" + action + "index" + index);
      if (articleStore === null && action === 1) {
        articleStore = []; 
        articleStore.push(article);
        kony.store.setItem("savedArticles", JSON.stringify(articleStore));
      } else {
        if (action === 1) {
          articleStore.push(article);
          kony.store.setItem("savedArticles", JSON.stringify(articleStore));
        } else {
          kony.store.setItem("savedArticles", JSON.stringify(articleStore.splice(index, 1)));
        }
      }
      alert(articleStore);
    },

    onButtonFavoriteArticle: function() {
      var article = {
        //imgNews: this.view.imgNews.src,
        lblNewsTitle: this.view.lblNewsTitle.text,
        //lblNewsText: this.view.lblNewsText.text
      };
      var articleFinder = this.checkSavedArticles(article.lblNewsTitle);
      alert("onButtonFavoriteArticle: " + articleFinder[0]);
      if (articleFinder[0]) {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
        this.updateAtricleStore(article, 0, articleFinder[1]);
      } else {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
        this.updateAtricleStore(article, 1);
      }
     
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