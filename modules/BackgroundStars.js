function bgStars (wrap) {
  var deviceInfo = kony.os.deviceInfo();
  var heightDevice = deviceInfo.deviceHeight;
  
  var createStar = function( position ){
    var star = new kony.ui.Label({
      "id":  "label" + position,
      "isVisible": true,
      "top": position + 'px',
      "text": ".",
      "left": "100%",
      "skin": "lbStar",
      
    },{});
    return star;
  };
  
  var starPosition = function() {
    return Math.floor((Math.random() * heightDevice));
  };
  
  var renderStar = function () {
    var star = createStar( starPosition ());
    var time = Math.random() * 2 + 0.5;
    var timerId = "id" + time;
    wrap.add(star);
    animation_3.bind(this, star, time)();
    kony.timer.schedule(timerId, function(){
      wrap.remove(star);
      kony.timer.cancel(timerId);
    }.bind(this), time, false);
  };
  
  kony.timer.schedule("timerStars", function(){
     renderStar();      
    }.bind(this), 0.1, true);
}
    