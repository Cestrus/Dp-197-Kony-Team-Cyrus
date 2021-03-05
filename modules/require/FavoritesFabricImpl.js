define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var favoritesService = sdk.getIntegrationService("CyrusDB");
  var params = null;
  var headers = null; 

  var addArticle = function(recordData, userId, successCallback, errorCallback) {
    params = {
      "newArticleId": recordData.articleId,
      "userIdentificator": userId.toString(),
      "title": recordData.lblNewsTitle,
      "articleDescr": recordData.lblNewsShortDesc,
      "pubDate": recordData.lblNewsDate,
      "href": recordData.imgNews,
      "bodyText": recordData.bodyText
    };

    favoritesService.invokeOperation("addArticle", headers, params, function(response) {
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
    params = {
      "userIdentificator": kony.store.getItem("userId")//.toString()
    };

    favoritesService.invokeOperation("getArticles", headers, params, function(response) {
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
    params = {
      "id": recordId.toString()
    };
    
    favoritesService.invokeOperation("deleteArticle", headers, params, function(response) {
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
  return {
    addArticle: addArticle,
    getArticles: getArticles,
    removeArticle: removeArticle
  };
});