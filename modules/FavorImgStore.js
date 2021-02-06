var isExistInstFavor = false;

function FavorImgStore (){
  if(isExistInstFavor) return isExistInstFavor;
  else isExistInstFavor = this;
  
  var store = [];
  
  this.push = function (img) {
		var isExist = store.find(function(el){return el.imgSpace === img.imgSpace;});
    if (!isExist) store.push(img); 
  };
  
  this.delete = function (img) {
    var indx = store.findIndex(function(el){return el.imgSpace === img.imgSpace;});
    store.splice(indx, 1);
  };
  
  this.load = function (arr) {
    store.length = 0;
    store = arr.slice();
  };
  
  return {
    load: this.load,
    push: this.push, 
    delete: this.delete,
  };
}