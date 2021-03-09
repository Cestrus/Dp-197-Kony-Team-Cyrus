define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var favoritesService = sdk.getIntegrationService("CyrusDB");
  
  var addArticle = function(recordData, userId, successCallback, errorCallback) {
    var params = {
      "newArticleId": recordData.articleId,
      "userIdentificator": userId.toString(),
      "title": recordData.lblNewsTitle,
      "articleDescr": recordData.lblNewsShortDesc,
      "pubDate": recordData.lblNewsDate,
      "href": recordData.imgNews,
      "bodyText": recordData.bodyText
    };
    var header = null; 
    
    favoritesService.invokeOperation("addArticle", header, params, function(response) {
      kony.print("Integration Add Article Service Response is: " + JSON.stringify(response));
      if (successCallback && response.articleMappingId) {
        successCallback(response);
      } 
    }, function(error) {
      kony.print("Integration Add Article Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };
  
  var getArticles = function (successCallback, errorCallback) {
    var params = {
      "userIdentificator": kony.store.getItem("userId")//.toString()
    };
		var header = null;
    
    favoritesService.invokeOperation("getArticles", header, params, function(response) {
      kony.print("Integration Get Articles Service Response is: " + JSON.stringify(response));
      kony.store.setItem("savedArticles", JSON.stringify(response.records));
      if (successCallback) {
        successCallback(response.records);
      }
    }, function(error) {
      kony.print("Integration Get Articles Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });

  };
  
  var removeArticle = function(recordId) {
    var params = {
      "id": recordId.toString()
    };
    var header = null;
    
    favoritesService.invokeOperation("deleteArticle", header, params, function(response) {
      kony.print("Integration Delete Articles Service Response is: " + JSON.stringify(response));
      if (successCallback) {
        successCallback(response);
      }
    }, function(error) {
      kony.print("Integration Delete Articles Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };
 
  
  var requestFunc = function(request, params, header, successCallback, errorCallback){
    favoritesService.invokeOperation (request, header, params, 
      function(response) {
        if (successCallback) {
          successCallback (response);
        }
      },
      function(error){
      kony.print("Database Service Failure: \n\n" + JSON.stringify(error));
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }; 
  
  var getImages = function(userId, successCallback, errorCallback){
    var header = null;
    var params = {
      "userIdentificator": userId.toString(),
    };
    requestFunc ("getFavoriteImages", params, header, successCallback, errorCallback);
  };

  var deleteImages = function(userId, link, successCallback, errorCallback){
    var header = null;
    var params = {
      "userIdentificator": userId.toString(),
      "userlink": link,
    };
    requestFunc ("deleteFavoriteImages", params, header, successCallback, errorCallback);
  };

  var addImages = function(userId, link, successCallback, errorCallback){
    var header = null;
    var params = {
      "userIdentificator": userId.toString(),
      "userlink": link,
    };
    requestFunc ("addFavoriteImages", params, header, successCallback, errorCallback);
  };
  
  return {
    addArticle: addArticle,
    getArticles: getArticles,
    removeArticle: removeArticle,
    getImages: getImages,
    deleteImages: deleteImages, 
    addImages: addImages,  
  };
});
