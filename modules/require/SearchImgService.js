define(["SearchImgServiceHttpImpl", "SearchImgServiceFabricImpl"], function (httpImpl, fabricImpl = null) {
   
// 	var concreteImpl = (fabricImpl) ? fabricImpl : httpImpl;
    var concreteImpl = httpImpl;
    
    return {
		getImages: concreteImpl.getImages,
    };
});