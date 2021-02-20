define(function() {

  var HEIGHT_IMG = "40%";
  var _chosenImgArr = [];
  var _clbkDoubleClick = null;

  return {
    initiolize: function(chosenImgArr, clbkDoubleClick) {
      _chosenImgArr = chosenImgArr;
      _clbkDoubleClick = clbkDoubleClick;

    },

    createListImg: function(arrImg){
      this.flxScrollContainer.removeAll();
      for(var i = 0; i < arrImg.length; i++){
        var image = this.createImg( i, arrImg[i] );
        this.flxScrollContainer.add( image );
      }
    },  

    createImg: function(index, src){
      var container = new kony.ui.FlexContainer({
        "id": "imgCont" + index,
        "height": HEIGHT_IMG,
        "width": kony.flex.USE_PREFERED_SIZE,
        //         "top": (index * (40 + 3)) + 3 + "%", 
        "centerX": "50%"
      });

      var image = new kony.ui.Image2({
        "id": "image" + index,
        "src": src,
        "height": "100%",
        "centerX": "50%"
      });

      var choiceMark = new kony.ui.Label({
        "id": "choiceMark" + index,
        "skin": "skinldlChoosenImg",
        "isVisible": false,
        "bottom": "10dp",
        "right": "20dp",
        "width": "20dp",
        "height": "20dp",
        "text": "\uf00c",
        "contentAlignment": constants.CONTENT_ALIGN_CENTER,

      }); 

      container.add(image);
      container.add(choiceMark);
      container.addGestureRecognizer(1, {fingers: 1, taps: 2}, this.onDoubleClick.bind(this, _clbkDoubleClick.bind(this)));
      container.addGestureRecognizer(3, {pressDuration: 2}, this.onLongpress.bind(this, this.onChooseImg.bind(this)));
      return container;
    }, 

    onChooseImg: function(widget) {
      var index = widget.id.match(/\d\d?/)[0];
      var mark = widget.widgets()[1];
      mark.isVisible = !mark.isVisible;
      if( mark.isVisible ) _chosenImgArr.push(index);
      else _chosenImgArr = _chosenImgArr.filter(function(el){ return el !== index;});
      (_chosenImgArr.length) ? this.view.btnDeleteCollection.isVisible = true : this.view.btnDeleteCollection.isVisible = false;
    },

  };
});