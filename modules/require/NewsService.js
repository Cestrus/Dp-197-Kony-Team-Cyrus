define(["NewsServiceHttpImpl"], function (concreteImpl) {
  
  return {
    getNews: concreteImpl.getNews
  };
});