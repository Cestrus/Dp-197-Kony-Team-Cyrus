define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var favoritesService = sdk.getIntegrationService("CyrusDB");
  var params = null;
  var headers = null; 

  var addArticle = function (articleId, userId, successCallback, errorCallback) {
    params = {
      "newArticleId": articleId,
      "userIdentificator": userId.toString()
    };


    favoritesService.invokeOperation("addArticle", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));
// 		alert(JSON.stringify(headers));
//       alert(JSON.stringify(response));
      if (successCallback && response.articleMappingId) {
        successCallback(response);
      } 
    }, function(error) {
      kony.print("Integration Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });
  };
  
  var getArticles = function (userId, successCallback, errorCallback) {
    params = {
      "userIdentificator": userId.toString()
    };


    favoritesService.invokeOperation("getArticles", headers, params, function(response) {
      //kony.print("Integration GetArticles Service Response is: " + JSON.stringify(response));
      if (successCallback) {
        successCallback(response.records);
      }
    }, function(error) {
      //kony.print("Integration Service Failure:" + JSON.stringify(error));
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
      //kony.print("Integration GetArticles Service Response is: " + JSON.stringify(response));
      if (successCallback) {
        successCallback(response.deletedRecords);
      }
    }, function(error) {
      //kony.print("Integration Service Failure:" + JSON.stringify(error));
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