define(["NewsService", "FavoritesService"], function(newsService, favoritesService) {
  var articleData = {};
  var savedArticlesArr = [];
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
      articleData = data;
      articleData.userId = kony.store.getItem("userId");
      this.view.imgNews.src = articleData.imgNews;
      this.view.lblNewsTitle.text = articleData.lblNewsTitle;
      this.view.lblNewsText.text = articleData.bodyText;
      //alert("On navigate check:" + this.checkSavedArticles(articleData.id));
      if (this.checkSavedArticles(articleData.id)) {
        articleData.isFavorite = 1;
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
      } else {
        articleData.isFavorite = 0;
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
      }
    },

    checkSavedArticles: function(id) {
      var result = 0;
      favoritesService.getFavoriteArticles(articleData.userId,
       function(articleIdsArr) {
        //alert("userId" + articleData.userId + "\n resp: " + articleIdsArr);
        savedArticlesArr = articleIdsArr;
        alert(savedArticlesArr);
        articleIdsArr.forEach(function(el) {
          if (el.articleId === id) {
            result = 1;
            return;
          }
        });
      }, function(error) {
        kony.print("Integration Get Article IDs List Service Failure:" + JSON.stringify(error));
      });
      return result;

    },

    updateAtricleStore: function(id, userId, action) {
		if (action === 1) {
          articleData.isFavorite = 1;
          favoritesService.addFavoriteArticle(id, userId,
			function(response) {
              return response;
            },
              function(error) {
                kony.print("Integration Get Article IDs List Service Failure:" + JSON.stringify(error));
            });

        } else {
          articleData.isFavorite = 0;
          
        }
    },

    onButtonFavoriteArticle: function() {
      if (articleData.isFavorite) {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
        this.updateAtricleStore(articleData.id, articleData.userId, 0);
      } else {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
        this.updateAtricleStore(articleData.id, articleData.userId, 1);
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