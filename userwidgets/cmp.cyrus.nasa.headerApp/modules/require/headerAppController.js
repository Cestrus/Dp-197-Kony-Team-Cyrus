 define(["FavoritesService"], function(favoritesService) {
  var ANIM_TIME = 0.25;
  var _animBtnBack = animation_4;
  var _animBtnMenu = animation_5;
  var _animMenu = animation_6;
  var _flexBackdrop = null;
  var _dropDownList = [{"name":"Favorite news", "idForm": "frmFavoriteNews"}, 
                       {"name": "Favorite images", "idForm": "frmCollectionImg"}];

  var _isOpen = false;

   var onBtnBackClick = function() {
     _this = this;
     _animBtnBack(this.view.btnBack, ANIM_TIME);
     kony.timer.schedule('timerBack', function(){
       if (_this.onBackClicked) {
         if (!_this.onBackClicked()) {
           return;
         }
       }
         var currentForm = kony.application.getCurrentForm();
         var previousForm = kony.application.getPreviousForm();

         if (currentForm && previousForm) {
           (new kony.mvc.Navigation(previousForm.id)).navigate();
         }
         favoritesService.getFavoriteArticles(kony.store.getItem("userId"));
       
         kony.timer.cancel('timerBack');
      
     }, ANIM_TIME, false);
   };  

  var showDropDown = function () {
    var form = kony.application.getCurrentForm();
    
    _flexBackdrop = null;
    _flexBackdrop = new kony.ui.FlexContainer({
      id: "flxHeaderControlBackdrop",
      top: "0dp", 
      left: "0dp",
      right: "0dp",
      bottom: "0dp",
      zIndex: '1000',
      isVisible: true,
      onClick: closeDropMenu,
      layoutType: kony.flex.FREE_FORM
    });

    var flexScroll = new kony.ui.FlexScrollContainer({
      id: "flxHeaderControlScrollList",
      top: "65dp",
      width: "165dp",
      right: "-165dp",
      bottom: "0dp",
      isVisible: true,
      enableScrolling: true,
      scrollDirection: kony.flex.SCROLL_VERTICAL,
      bounces: false,
      onClick: closeDropMenu,
      layoutType: kony.flex.FLOW_VERTICAL, 
    }, {
      margin: [0, 0, 0, 0]
    });

    for (var i = 0; i < _dropDownList.length; i++) {
      var button = new kony.ui.Button({
        id: "flxHeaderControlListItem" + i,
        top: "5dp",
        left: "0dp",
        width: "100%",
        height: "45dp",
        isVisible: true,
        text: _dropDownList[i].name,
        skin: "sknBtnDropDown",
        focusSkin: "sknBtnDropDownFocus",
        onClick: function(data){
          favoritesService.getFavoriteArticles(kony.store.getItem("userId"));
          closeDropMenu();
          kony.timer.schedule('timerNav', function(){                       
            var navigation = new kony.mvc.Navigation(data.idForm);

            if (data.idForm === "frmFavoriteNews") {
              var newArr = [];
              JSON.parse(kony.store.getItem("savedArticles")).forEach(function(m) {
                newArr.push({
                  lblNewsTitle: m.articleTitle,
                  lblNewsDate: m.articlePubDate,
                  lblNewsShortDesc:  m.articleDesc,
                  imgNews: m.articleHref,
                  articleId: m.articleId,
                  recordId: m.id,
                  bodyText: m.articleText
                });
              });
              navigation.navigate(newArr);
            } else {
              navigation.navigate();
            }
            kony.timer.cancel('timerNav'); 
          }, ANIM_TIME + 0.25, false);
        }.bind(this, _dropDownList[i])
      }, {
        padding: [5, 5, 5, 5],
        margin: [0, 0, 0, 0]
      });
      button.contentAlignment = constants.CONTENT_ALIGN_CENTER;
      flexScroll.add(button);
    }

    _flexBackdrop.add(flexScroll);
    form.add(_flexBackdrop);
  };

  
   var closeDropMenu = function() {
     var form = kony.application.getCurrentForm();

       _animBtnMenu(ANIM_TIME, btnMenu);
       _animMenu(_flexBackdrop.widgets()[0], ANIM_TIME, _isOpen);
       kony.timer.schedule('timerMenu', function(){
         form.remove(_flexBackdrop);
         _flexBackdrop = null;
         kony.timer.cancel('timerMenu');
       }, ANIM_TIME, false);
     _isOpen = !_isOpen;
   };
   
   var btnMenu = null;
   var openDropMenu = function() {
     btnMenu = this.view.btnMenu;
     showDropDown();
     _animBtnMenu(ANIM_TIME, this.view.btnMenu);
     _animMenu(_flexBackdrop.widgets()[0], ANIM_TIME, _isOpen);
     _isOpen = !_isOpen;
   };
   
  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.btnBack.onClick = onBtnBackClick.bind(this);
      this.view.btnMenu.onClick = openDropMenu.bind(this);
    },
    
    initGettersSetters: function() {

    }
  };
});