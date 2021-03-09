define(["FavoritesFabricImpl"], function (fabricImpl) {
  
  return {
    addFavoriteArticle: fabricImpl.addArticle,
    getFavoriteArticles: fabricImpl.getArticles,
    removeFavoriteArticle: fabricImpl.removeArticle,
    getFavoriteImages: fabricImpl.getImages,
    deleteFavoriteImages: fabricImpl.deleteImages, 
    addFavoriteImages: fabricImpl.addImages,      
  };
});