var isExistInstPage = false; 

function LoadImgStore () {
  if (isExistInstPage) return isExistInstPage;
  else isExistInstPage = this;
  
  var store = [];
  
  this.set = function(arr) {
    store.length = 0;
    store = arr.slice();
  };
  
  this.get = function() {
    return store;
  };
  
  return { 
    set: this.set,
    get: this.get,
  };
}