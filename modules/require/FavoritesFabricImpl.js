define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var newsService = sdk.getIntegrationService("CyrusDB");
  var params;
  var headers = null; 

  var addArticle = function (articleId, userId, successCallback, errorCallback) {
    headers = {
      "newArticleId": articleId,
      "userIdentificator": userId
    };


    newsService.invokeOperation("addArticle", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));

      if (successCallback) {
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
    headers = {
      "userIdentificator": userId
    };


    newsService.invokeOperation("getArticles", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));

      if (successCallback) {
        successCallback(response.records);
      }
    }, function(error) {
      kony.print("Integration Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });

  };
  return {
    addArticle: addArticle,
    getArticles: getArticles
  };
});