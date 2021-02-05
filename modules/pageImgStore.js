var isExistInstPage = false; 

function PageImgStore () {
  if (isExistInstPage) return isExistInstPage;
  else isExistInstPage = this;
  
  var store = [];
  
  this.set = function(arr) {
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