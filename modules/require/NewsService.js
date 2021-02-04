define(["NewsServiceHttpImpl"], function (concreteImpl) {
  
  return {
    getNews: concreteImpl.getNews
  };
  //return {
  //  getNews: concreteImpl.getNews
  //};
});