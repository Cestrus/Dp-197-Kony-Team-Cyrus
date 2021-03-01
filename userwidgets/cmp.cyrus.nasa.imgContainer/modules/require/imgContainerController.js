define(function() {
  var _buttonText = 'button';
  var _chosenImagesArr = [];
  var _HEIGHT_IMG = "40%";
  var _animation = animation_2;
  
  
  var _onButtonClick = function () {
    var tempArr = _chosenImagesArr.slice();
    _chosenImagesArr.length = 0;
    _showButton.bind(this)();
    this.resetChoiceMark();
    this.onBtnClick(tempArr);  
  };
  
  var _showButton = function () {
      (_chosenImagesArr.length) 
        ? this.view.btnImageContainer.isVisible = true 
        : this.view.btnImageContainer.isVisible = false;
  };
  
  var _createImg = function (index, src, onChooseImage, onTapImage) {
      var wrapper = new kony.ui.FlexContainer({
        "id": "imgCont" + index,
        "height": _HEIGHT_IMG,
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
      wrapper.addGestureRecognizer(1, {fingers: 1, taps: 1}, onTapImage);
      wrapper.addGestureRecognizer(3, {pressDuration: 1}, onChooseImage);
      return wrapper;
  };
  
  var _onChooseImage = function ( widget ) {
      var numID = widget.id.match(/\d\d?/)[0];
      var mark = widget.widgets()[1];
      mark.isVisible = !mark.isVisible;
      if( mark.isVisible ) _chosenImagesArr.push(numID);
      else {
        var index = _chosenImagesArr.findIndex(function(el){ return el === index;});
        _chosenImagesArr.splice(index, 1);
      }
      _animation ( widget );
      _showButton.bind(this)();
    };

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnImageContainer.onClick = _onButtonClick.bind(this);
 
    },
    
    initGettersSetters: function () {
      defineSetter (this, "buttonText", function (val) {
        _buttonText = val;
      });
      
      defineGetter (this, "buttonText", function () {
        return _buttonText;
      });

    }, 
    
    //Custom methods

    createListImages: function (arrImg, onTapImage) {
      this.view.flxScrollContainer.removeAll();
      for(var i = 0; i < arrImg.length; i++){
        var image = _createImg( i, arrImg[i], _onChooseImage.bind(this), onTapImage );
        this.view.flxScrollContainer.add( image );
      }
    },

    resetChoiceMark: function () {
      var containersArr = this.view.flxScrollContainer.widgets();
      containersArr.forEach( function(cont) {
        cont.widgets()[1].isVisible = false;
      });
    },
    
  };
});