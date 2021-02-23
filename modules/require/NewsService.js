define(["NewsServiceHttpImpl", "NewsServiceFabricImpl"], function (httpImpl, fabricImpl) {
  var concreteImpl = fabricImpl;
  return {
    getNews: concreteImpl.getNews
  };
});