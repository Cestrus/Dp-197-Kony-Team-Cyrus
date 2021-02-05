define(["AuthUserServiceDummyImpl"], function (concreteImpl) {
  
  return {
    checkUser: concreteImpl.checkUser,
    registerUser: concreteImpl.registerUser
  };
});