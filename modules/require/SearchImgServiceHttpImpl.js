define(function () {
  var URL_MAIN = "https://images-api.nasa.gov/search?q=";

  var makeURL = function(str) {
    return URL_MAIN + str.split(' ').join('%20') + "&page=1";
  };


  var getImages = function(str, successCallback, errorCallback) {	
    if(!str){
      successCallback(false);
    } else {
      var url = makeURL(str);
      appService.makeHttpRequest(
        url, 
        function(responseData){
          var imgLinks = responseData.collection.items.map(function(item) {
            if(item.links) {
              return {imgSpace: item.links[0].href};
            } else {
              return {imgSpace: ''};
            }      
          });                  	
          successCallback(imgLinks);
        }, 
        errorCallback
      );
    }       
  };

  return {
    getImages: getImages,
  };
});