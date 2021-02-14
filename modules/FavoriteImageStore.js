var isExistInstFavor = false;

function FavoriteImageStore (){
  if(isExistInstFavor) return isExistInstFavor;
  else isExistInstFavor = this;
  
  var store = [];
  
  var isImgExist = function(img){
    return store.find(function(el){return el === img;});
  };
  
  this.push = function (images) {
    if (Array.isArray(images)){
      for(var i = 0; i < images.length; i++){
				if(isImgExist(images[i])) continue;
        else store.push(images[i]);
      }
    } else if (!isImgExist(images)) store.push(images); 
  };
  
  this.delete = function (indexes) {
    if (Array.isArray(indexes)){
      indexes.forEach(function(el) { delete store[el]; });
      store = store.filter(function(el) { return el !== undefined; });
    } else {
      store.splice(num, 1);
    }    
  };
  
  this.set = function (arr) {
    store.length = 0;
    store = arr.slice();
  };
  
  this.get = function() {
    return store.slice();
  };
  
  this.length = function() {
    return store.length;
  }
  
  return {
    set: this.set,
    get: this.get,
    push: this.push, 
    delete: this.delete,
    length: this.length,
  };
}