define(["NewsService", "FavoritesService", "WeatherService"], function(newsService, favoritesService, weatherService) {
  var articleData;
  var currentUserId;
  var savedArticlesArr;
//   var previousFormId;
  return { 
    onInitialize: function() { 
      this.view.nav.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
      this.view.nav.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
      
      this.view.headerApp.onBackClicked = function () {
        previousFormId = kony.application.getPreviousForm().id;
        if (previousFormId === "frmFavoriteNews") {
          this.onButtonGoToFavoriteNews();
        } else {
          this.onButtonGoToNews();
        }
      }.bind(this);
      
      this.view.btnFavoriteArticle.onClick = this.onButtonFavoriteArticle.bind(this);
		
      //temp function for saved articles form
//       this.view.btnProfile.onClick = this.onButtonGoToFavoriteNews.bind(this);
    },

    onNavigate: function(data) {
      articleData = data;
      this.view.imgNews.src = articleData.imgNews;
      this.view.lblNewsTitle.text = articleData.lblNewsTitle;
      this.view.lblNewsText.text = articleData.bodyText;
      currentUserId = kony.store.getItem("userId");
      savedArticlesArr = JSON.parse(kony.store.getItem("savedArticles"));
      if (this.checkSavedArticles(articleData.articleId)) {
        articleData.isFavorite = 1;
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
      } else {
        articleData.isFavorite = 0;
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
      }
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

    updateAtricleStore: function(articleRecordData, userId ,action) {
      if (action === 1) {
        articleData.isFavorite = 1;
        favoritesService.addFavoriteArticle(articleRecordData, userId, function(response) {
          kony.print("Integration updateAtricleStore Service Success:" + JSON.stringify(response));

          favoritesService.getFavoriteArticles(userId, function(articleIdsArr) {
            savedArticlesArr = articleIdsArr;
          }, function(error) {
            kony.print("Integration Get Favorite Articles List Service Failure:" + JSON.stringify(error));
          });
        }, function(error) {
          kony.print("Integration Add Article Service Failure:" + JSON.stringify(error));
        });

      } else {
        articleData.isFavorite = 0;
        var idToRemove;
        savedArticlesArr.forEach(function (el) {
          if (el.articleId === articleRecordData.articleId) {
            idToRemove = el.id;
            //alert("id found " + idToRemove);
            favoritesService.removeFavoriteArticle(idToRemove, function(response) {
              kony.print("Integration Remove Article Service Success:" + JSON.stringify(response));
              favoritesService.getFavoriteArticles(userId, function(articleIdsArr) {
                savedArticlesArr = articleIdsArr;
              }, function(error) {
                kony.print("Integration Get Favorite Articles List Service Failure:" + JSON.stringify(error));
              });
            }, function(error) {
              kony.print("Integration Remove Article Service Failure:" + JSON.stringify(error));
            });
          } 
        });

      }
    },

    onButtonFavoriteArticle: function() {
      if (articleData.isFavorite) {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticle';
        this.updateAtricleStore(articleData, currentUserId, 0);
      } else {
        this.view.btnFavoriteArticle.skin = 'sknFavotiteArticleFocus';
        this.updateAtricleStore(articleData, currentUserId, 1);
      }

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
      //alert (JSON.stringify(savedArticlesArr)); 
      var newArr = [];
      JSON.parse(kony.store.getItem("savedArticles")).forEach(function(m) {
        newArr.push({
          lblNewsTitle: m.articleTitle,
          lblNewsDate: m.articlePubDate,
          lblNewsShortDesc:  m.articleDesc,
          imgNews: m.articleHref,
          articleId: m.articleId,
          recordId: m.id,
          bodyText: m.articleText
        });
      });
      var navigation = new kony.mvc.Navigation("frmFavoriteNews");
      navigation.navigate(newArr);
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