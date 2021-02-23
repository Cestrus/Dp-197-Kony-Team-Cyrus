define(function() {

  var HEIGHT_IMG = "40%";
  var _chosenImgArr = null;
  var _clbkDoubleClick = null;
  var _clbkBtnHandler = null;

  return {
    initiolize: function(chosenImgArr, clbkDoubleClick, btnName, clbkBtnHandler) {
      _chosenImgArr = chosenImgArr;
      _clbkDoubleClick = clbkDoubleClick;
      _clbkBtnHandler = clbkBtnHandler;
      this.view.btnChosenAction.text = btnName;
      this.view.btnChosenAction.onClick = this.onBtnHandler.bind(this);
    },

    createListImg: function(arrImg){
      this.view.flxScrollContainer.removeAll();
      for(var i = 0; i < arrImg.length; i++){
        var image = this.createImg( i, arrImg[i] );
        this.view.flxScrollContainer.add( image );
      }
    },  

    createImg: function(index, src){
      var wrapper = new kony.ui.FlexContainer({
        "id": "imgCont" + index,
        "height": HEIGHT_IMG,
        "width": kony.flex.USE_PREFERED_SIZE,
        "top": "10dp", 
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

      wrapper.add( image );
      wrapper.add( choiceMark );
      wrapper.addGestureRecognizer(1, {fingers: 1, taps: 2}, _clbkDoubleClick);
      wrapper.addGestureRecognizer(3, {pressDuration: 2}, this.onChooseImg);
      return wrapper;
    }, 

    onShowBtnChosenAction: function() {
      (_chosenImgArr.length) 
        ? this.view.btnChosenAction.isVisible = true 
      : this.view.btnChosenAction.isVisible = false;
    },

    onChooseImg: function ( widget ) {
      var numID = widget.id.match(/\d\d?/)[0];
      var mark = widget.widgets()[1];
      mark.isVisible = !mark.isVisible;
      if( mark.isVisible ) _chosenImgArr.push(numID);
      else {
        var index = _chosenImgArr.findIndex(function(el){ return el === index;});
        _chosenImgArr.splice(index, 1);
      }
      this.onShowBtnChosenAction();
    },
    
    resetChoiceMark: function() {
      var containersArr = this.view.flxScrollContainer.widgets();
      containersArr.forEach( function(cont) {
        cont.widgets()[1].isVisible = false;
      });
    }, 

    onBtnHandler: function(){
      _clbkBtnHandler();
      this.resetChoiceMark();
      this.onShowBtnChosenAction();
    }
    
  };
});