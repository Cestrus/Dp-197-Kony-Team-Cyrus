var isExistInstPage = false; 

function LoadedImageStore () {
  if (isExistInstPage) return isExistInstPage;
  else isExistInstPage = this;
  
  var store = [];
  
  this.length = function() {
    return store.length;
  };
  
  this.set = function(arr) {
    store.length = 0;
    store = arr.slice();
  };
  
  this.get = function() {
    return store.slice();
  };
  
  return { 
    set: this.set,
    get: this.get,
    length: this.length,
  };
}