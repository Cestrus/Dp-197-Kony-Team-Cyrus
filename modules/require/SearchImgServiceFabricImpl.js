define(function () {
  var getImages = function(str, successCallback, errorCallback) {	
    var sdk = kony.sdk.getCurrentInstance();
    var cyrusImageService = sdk.getIntegrationService("CyrusImageService");
    
    cyrusImageService.invokeOperation ("searchImages", {}, {query: str}, 
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
  };

  return {
    getImages: getImages,
  };
});