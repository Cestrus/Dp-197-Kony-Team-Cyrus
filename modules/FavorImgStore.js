var isExistInstFavor = false;

function FavorImgStore (){
  if(isExistInstFavor) return isExistInstFavor;
  else isExistInstFavor = this;
  
  var store = [];
  
  var isExist = function(img){
    return store.find(function(el){return el.imgSpace === img.imgSpace;});
  };
  
  this.push = function (images) {
    if (Array.isArray(images)){
      for(var i = 0; i < images.length; i++){
				if(isExist(images[i])) continue;
        else store.push(images);
      }
    } else if (!isExist(images)) store.push(images); 
  };
  
  this.delete = function (num) {
    store.splice(num, 1);
  };
  
  this.set = function (arr) {
    store.length = 0;
    store = arr.slice();
  };
  
  this.get = function (){
    return store;
  };
  
  return {
    set: this.set,
    get: this.get,
    push: this.push, 
    delete: this.delete,
  };
}