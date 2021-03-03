define(["NewsService", "FavoritesService", "WeatherService"], function(newsService, favoritesService, weatherService) {
  var articleData = {};
  var currentUserId;
  var savedArticlesArr;
  return { 
    onInitialize: function() { 
      this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
      this.view.tabBtnSearchImg.onClick = this.onButtonGoToSearchImg.bind(this);
      this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      this.view.btnGoBack.onClick = function () {
        var previousFormId = kony.application.getPreviousForm().id;
        if (previousFormId === "frmFavoriteNews") {
          this.onButtonGoToFavoriteNews();
        } else {
          this.onButtonGoToNews();
        }
      }.bind(this);

      this.view.btnFavoriteArticle.onClick = this.onButtonFavoriteArticle.bind(this);
		
      //temp function for saved articles form
      this.view.btnProfile.onClick = this.onButtonGoToFavoriteNews.bind(this);
    },

    onNavigate: function(data) {
      articleData = data;
      this.view.imgNews.src = articleData.imgNews;
      this.view.lblNewsTitle.text = articleData.lblNewsTitle;
      this.view.lblNewsText.text = articleData.bodyText;
      currentUserId = kony.store.getItem("userId");
      savedArticlesArr = JSON.parse(kony.store.getItem("savedArticles"));
      if (this.checkSavedArticles(articleData.id)) {
        articleData.isFavorite = 1;
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
      } else {
        articleData.isFavorite = 0;
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
      }
      //alert(kony.store.getItem("savedFullArticles"));
    },

    checkSavedArticles: function(id) {
      var result = 0;
      savedArticlesArr.forEach(function(el) {
        if (el.articleId === id) {
          result = 1;
        }
      });
      return result;

    },

    updateAtricleStore: function(articleId, userId, action) {
      if (action === 1) {
        articleData.isFavorite = 1;
        favoritesService.addFavoriteArticle(articleId, userId, function(response) {
          //kony.print("Integration Add Article Service Success:" + JSON.stringify(response));

          favoritesService.getFavoriteArticles(userId, function(articleIdsArr) {
            kony.store.setItem("savedArticles", JSON.stringify(articleIdsArr));
            savedArticlesArr = articleIdsArr;
          }, function(error) {
            //kony.print("Integration Get Article IDs List Service Failure:" + JSON.stringify(error));
          });
        }, function(error) {
          //kony.print("Integration Add Article Service Failure:" + JSON.stringify(error));
        });

      } else {
        articleData.isFavorite = 0;
        var idToRemove;
        savedArticlesArr.forEach(function (el) {
          if (el.articleId === articleId) idToRemove = el.id;
        });
        favoritesService.removeFavoriteArticle(idToRemove, function(response) {
          //kony.print("Integration Remove Article Service Success:" + JSON.stringify(response));

          favoritesService.getFavoriteArticles(userId, function(articleIdsArr) {
            kony.store.setItem("savedArticles", JSON.stringify(articleIdsArr));
            savedArticlesArr = articleIdsArr;
          }, function(error) {
            //kony.print("Integration Get Article IDs List Service Failure:" + JSON.stringify(error));
          });
        }, function(error) {
          //kony.print("Integration Remove Article Service Failure:" + JSON.stringify(error));
        });
      }
    },

    onButtonFavoriteArticle: function() {
      if (articleData.isFavorite) {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
        this.updateAtricleStore(articleData.id, currentUserId, 0);
      } else {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
        this.updateAtricleStore(articleData.id, currentUserId, 1);
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
    
    onButtonGoToFavoriteNews: function() {
      newsService.getSavedNews(JSON.parse(kony.store.getItem("savedArticles")), function(arr) {
        var navigation = new kony.mvc.Navigation("frmFavoriteNews");
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
      weatherService.getWeather(function(arr) {
        var navigation = new kony.mvc.Navigation("frmWeather");
        navigation.navigate(arr);
      },function() {
        alert("Error while retrieving Mars weather.");
      });
    }
  };

});