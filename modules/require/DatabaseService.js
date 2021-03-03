define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var cyrusDB = sdk.getIntegrationService("CyrusDB");
  
  var requestFunc = function(request, params, header, successCallback, errorCallback){
    cyrusDB.invokeOperation (request, header, params, 
      function(response) {
      //kony.print("Database response: \n" + JSON.stringify(response)); ///////
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
    getImages: getImages,
    deleteImages: deleteImages, 
    addImages: addImages,    
  };
  
});
