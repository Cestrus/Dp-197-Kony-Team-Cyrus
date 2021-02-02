define({ 
   onInitialize: function() {
    this.view.btnGoBack.onClick = function () {
      var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      navigation.navigate();
    }.bind(this);
  },
  
	

 //Type your controller code here 

 });