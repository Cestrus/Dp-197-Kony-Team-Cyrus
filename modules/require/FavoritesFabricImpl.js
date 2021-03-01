define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var newsService = sdk.getIntegrationService("CyrusDB");
  var params;
  var headers; 

  var addArticle = function (articleId, userId, successCallback, errorCallback) {
    headers = {
      "newArticleId": articleId,
      "userIdentificator": userId
    };


    newsService.invokeOperation("addArticle", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));
		alert(JSON.stringify(headers));
      alert(JSON.stringify(response));
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
    headers = {
      "userIdentificator": userId
    };


    newsService.invokeOperation("getArticles", headers, params, function(response) {
      kony.print("Integration GetArticles Service Response is: " + JSON.stringify(response));

      if (successCallback) {
        successCallback(response.records);
      }
      var articlesArr =[];
      response.records.forEach(function(m) {
        articlesArr.push({
          dbId: m.id,
          articleId: m.articleId});
      });
      if (successCallback) {
        successCallback(articlesArr);
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