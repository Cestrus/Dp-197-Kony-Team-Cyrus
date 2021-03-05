define(function () {
   
  var getFacts = function (successCallback, errorCallback) {
    
//     var storedFact = kony.store.getItem("facts");
//     if (storedFact) {
//       return successCallback(storedFact);
//     }
    
    var facts = [];
    var sdk = kony.sdk.getCurrentInstance();
    var factService = sdk.getIntegrationService("CyrusDB");
    var headers = null; 
    var params = null;
    
    factService.invokeOperation("getFact", headers, params, function(response) {
      kony.print("Integration Service Response is: " + JSON.stringify(response));

      response.records.forEach(function(el) {
          facts.push({
            lblTitle: el.factTitle,
            imgIcon: el.img,
            factContent: el.factDesc,
          });
        });
      
      if (successCallback) {
//         kony.store.setItem("facts", facts);
        successCallback(facts);
      }
      
      
    }, function(error) {
        kony.print("Integration Service Failure:" + JSON.stringify(error) + facts);
      if (errorCallback) {
        errorCallback(error);
      }
    });

  };
  
  return {
    getFacts: getFacts
  };
});