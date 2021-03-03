define(["MarsFactServiceFabricImpl"], function (fabricImpl) {
  var concreteImpl = fabricImpl;

  return {
    getFacts: concreteImpl.getFacts,
  };

});