define(["AuthUserService"], function(authUser) {
  return { 
    onInitialize: function() {
      this.view.btnStart.onClick = this.onButtonEnterClicked.bind(this);
    },

    onButtonEnterClicked: function() {
      if (this.view.switchNewUser.selectedIndex === 1) {
        authUser.checkUser(this.view.inptStartLogin.text, this.view.inptStartPsswd.text, 
          function() {
            var navigation = new kony.mvc.Navigation("frmMain");
            navigation.navigate();
          },function() {
            alert("User is not registrated. Please registrate first");
          });
      } else {
        authUser.registerUser(this.view.inptStartLogin.text, this.view.inptStartPsswd.text, 
          function() {
            var navigation = new kony.mvc.Navigation("frmMain");
            navigation.navigate();
          },function() {
            alert("User already exists. Please try another login");
          });
      }
    }

  };

 });