define(function () {

  var sdk = kony.sdk.getCurrentInstance();
  var newsService = sdk.getIntegrationService("CyrusDB");
  var params;
  var headers = null; 

  var checkUser = function(login, password, successCallback, errorCallback) {
    params = {"userLogin": login, "userPassword": password};
    
    newsService.invokeOperation("loginUser", headers, params, function(response) {
      kony.print("Integration userLogin Service Response is: " + JSON.stringify(response));
      
      if (successCallback && response.userLoginError !== "login_failed") {
        successCallback(response.userLoginId);
      } else {
        errorCallback();
      }

    }, function(error) {
      kony.print("Integration userLogin Service Failure:" + JSON.stringify(error));
      
      if (errorCallback) {
        errorCallback(error);
      }
    });


  };
  var registerUser = function(login, password, successCallback, errorCallback) {
    params = {"userLogin": login, "userPassword": password};
    
    newsService.invokeOperation("registerUser", headers, params, function(response) {
      kony.print("Integration registerUser Service Response is: " + JSON.stringify(response));
      
      if (successCallback && response.userNewId) {
        successCallback(response.userNewId);
      }

    }, function(error) {
      kony.print("Integration registerUser Service Failure:" + JSON.stringify(error));
      
      if (errorCallback) {
        errorCallback(error);
      }
    });


  };

  return {
    checkUser: checkUser,
    registerUser: registerUser
  };
});