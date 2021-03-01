define(["AuthUserServiceDummyImpl", "AuthUserServiceFabricImpl"], function (dummyImpl, fabricimpl) {  
  return {
    checkUser: fabricimpl.checkUser,
    registerUser: fabricimpl.registerUser
  };
});