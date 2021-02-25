define(["SearchImgServiceHttpImpl", "SearchImgServiceFabricImpl"], function (httpImpl, fabricImpl) {
   
// 	var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;
//     var concreteImpl = httpImpl;
  var concreteImpl = fabricImpl;
    
    return {
		getImages: concreteImpl.getImages,
    };
});