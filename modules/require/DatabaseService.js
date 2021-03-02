define(function () {
  var sdk = kony.sdk.getCurrentInstance();
  var cyrusDB = sdk.getIntegrationService("CyrusDB");
  
  var requestFunc = function(request, params, successCallback, errorCallback){
    cyrusDB.invokeOperation (request, {}, params, 
      function(response) {
        if (successCallback) {
          successCallback (response.links);
        }
      },
      function(error){
        if (errorCallback) {
          errorCallback(error);
        }
      });
  }
  
  var getImages = function(params, successCallback, errorCallback){
    requestFunc ("getFavoriteImages", params, successCallback, errorCallback)
  };

  var getImages = function(params, successCallback, errorCallback){
    requestFunc ("updateFavoriteImages", params, successCallback, errorCallback)
  };

  var getImages = function(params, successCallback, errorCallback){
    requestFunc ("createFavoriteImages", params, successCallback, errorCallback)
  };
  
  return {
    getImages: getImages,
    updateImages: updateImages, 
    createImages: createImages,    
  }
}
