function animation_1 (widget) {
  var transformProp1 = kony.ui.makeAffineTransform();
  transformProp1.translate(0, 0);
  transformProp1.scale(1, 1);
  
  var transformProp2 = kony.ui.makeAffineTransform();
  transformProp2.translate(20, 20);
  transformProp2.scale(0.9, 0.9);
  
  var transformProp3 = kony.ui.makeAffineTransform();
  transformProp3.translate(-20, 20);
  transformProp3.scale(0.9, 0.9);
  
  var animDefinition = {
    25: {
      "transform": transformProp2
    },
    50: {
      "transform": transformProp1
    },
    75: {
      "transform": transformProp3
    },
    100: {
      "transform": transformProp1
    }
  };
  
  var animDef = kony.ui.createAnimation(animDefinition);
  
  var animConf = {
    "duration": 5,
    "iterationCount": 0,
    "delay": 0,
    "fillMode": kony.anim.FILL_MODE_FORWARDS
  };  
  
  widget.animate(animDef, animConf, {});
 
}

function animation_2 (widget) { 
  var transformProp1 = kony.ui.makeAffineTransform();
  transformProp1.scale(1, 1);
  
  var transformProp2 = kony.ui.makeAffineTransform();
  transformProp2.scale(0.9, 0.9);
  
  var animDef = kony.ui.createAnimation({
    50: {
      "transform": transformProp2  
    }, 
    100: {
      "transform": transformProp1
    }
  });
  
  var animConf = {
    "duration": 0.5,
    "iterationCount": 1,
    "delay": 0,
    "fillMode": kony.anim.FILL_MODE_FORWARDS
  };  
  
  widget.animate(animDef, animConf, {});
}

function animation_3 (widget, time) {
  kony.print("star => " + JSON.stringify(widget));
  var animDef = kony.ui.createAnimation({     
    0: {
      "left": "100%",
    },
    100: {
      "left": "0%",
    }
  });
  
  var animConf = {
    "duration": time,
    "iterationCount": 1,
    "delay": 0,
    "fillMode": kony.anim.FILL_MODE_FORWARDS
  };  
  
  widget.animate(animDef, animConf, {});
}