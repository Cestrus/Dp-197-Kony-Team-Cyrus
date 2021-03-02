define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var newsService = sdk.getIntegrationService("CyrusNewsService");
  var params = null;
  var headers = null; 

  var getNews = function (successCallback, errorCallback) {

    var newsArr = [];

    newsService.invokeOperation("getNews", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));

      response.results.forEach(function(m) {
        newsArr.push({
          lblNewsTitle: m.webTitle,
          lblNewsDate: m.webPublicationDate.slice(0,10),
          lblNewsShortDesc: m.fields.trailText,
          imgNews: m.fields.thumbnail,
          bodyText: m.fields.bodyText,
          id: m.id
        });
      });
      if (successCallback) {
        successCallback(newsArr);
      }


    }, function(error) {
      kony.print("Integration Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });

  };

  var getArticle = function (articleId, successCallback, errorCallback) {
    headers = {"articleId" : articleId};

    newsService.invokeOperation("getArticle", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));

      if (successCallback) {
        successCallback({
          lblNewsTitle: response.content.webTitle,
          lblNewsDate: response.content.webPublicationDate.slice(0,10),
          lblNewsShortDesc: response.content.fields.trailText,
          imgNews: response.content.fields.thumbnail,
          bodyText: response.content.fields.bodyText,
          id: response.content.id
        });
      }


    }, function(error) {
      kony.print("Integration Service Failure:" + JSON.stringify(error));
      if (errorCallback) {
        errorCallback(error);
      }
    });

  };

  return {
    getNews: getNews,
    getArticle: getArticle
  };
});