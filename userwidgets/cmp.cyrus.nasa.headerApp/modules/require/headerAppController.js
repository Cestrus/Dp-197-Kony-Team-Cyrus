define(function() {
  var ANIM_TIME = 0.25;
  var _animBtnBack = animation_4;
  var _animBtnMenu = animation_5;
  var _animMenu = animation_6;
  var _flexBackdrop = null;
  var _btnMenu = null;
  var _dropDownList = [{"text": "Favorite images", "formName": "frmCollectionImg"}, {"text":"Interesting news", "formName": "frm"}];
  
  var initBtnMenu = function(refBtn) {
    _btnMenu = refBtn;
  };
  var goBack = function() {
    var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
     navigation.navigate();
  };
  
  var onBtnBackClick = function() {
    _animBtnBack(this.view.btnBack, ANIM_TIME);
    kony.timer.schedule('timerBack', function(){
      goBack();
      kony.timer.cancel('timerBack');
    }, ANIM_TIME, false);
  };
  
  var hideDropDown = function () {
    var form = kony.application.getCurrentForm();

    if (_flexBackdrop) {
      _animBtnMenu(_btnMenu, ANIM_TIME, false);
      _animMenu(_flexBackdrop.widgets()[0], ANIM_TIME, true);
      kony.timer.schedule('timerMenu', function(){
        form.remove(_flexBackdrop);
        _flexBackdrop = null;
        kony.timer.cancel('timerMenu');
      }, ANIM_TIME, false);
    }
  };
  
  var showDropDown = function () {
    var form = kony.application.getCurrentForm();

    hideDropDown();
    _flexBackdrop = new kony.ui.FlexContainer({
      id: "flxHeaderControlBackdrop",
      top: "65dp",
      left: "0dp",
      right: "0dp",
      bottom: "0dp",
      zIndex: '1000',
      isVisible: true,
      onClick: hideDropDown,
      layoutType: kony.flex.FREE_FORM
    });

    var flexScroll = new kony.ui.FlexScrollContainer({
      id: "flxHeaderControlScrollList",
      top: "-85dp",
      width: "150dp",
      right: "0dp",
      bottom: "0dp",
      isVisible: true,
      enableScrolling: true,
      scrollDirection: kony.flex.SCROLL_VERTICAL,
      bounces: false,
      onClick: hideDropDown,
      layoutType: kony.flex.FLOW_VERTICAL, 
    }, {
      padding: [10, 10, 10, 10],
      margin: [0, 0, 0, 0]
    });

    for (var i = 0; i < _dropDownList.length; i++) {
      var button = new kony.ui.Button({
        id: "flxHeaderControlListItem" + i,
        top: "1dp",
        left: "0dp",
        width: "100%",
        height: "40dp",
        isVisible: true,
        text: _dropDownList[i].text,
        skin: "sknBtnDropDown",
        focusSkin: "sknBtnDropDownFocus",
        onClick: function(data){	
          hideDropDown();
          var navigation = new kony.mvc.Navigation(data);
          navigation.navigate();
        }.bind(this, _dropDownList[i].formName)
      }, {
        padding: [5, 5, 5, 5],
        margin: [0, 0, 0, 0]
      });
      button.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
      flexScroll.add(button);
    }

    _flexBackdrop.add(flexScroll);
    form.add(_flexBackdrop);
  };
  

  
  var toggleDropMenu = function() {
    if (_flexBackdrop) {
      hideDropDown();
    } else {
      showDropDown();
      _animBtnMenu(this.view.btnMenu, ANIM_TIME, true);
      _animMenu(_flexBackdrop.widgets()[0], ANIM_TIME, false);
    }
  };
   
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      initBtnMenu(this.view.btnMenu);
      this.view.btnBack.onClick = onBtnBackClick.bind(this);
      this.view.btnMenu.onClick = toggleDropMenu.bind(this);
    },
    
    initGettersSetters: function() {
		
    }
  };
});