define(["AuthUserService"], function(authUser) {
  return { 
    onInitialize: function() {
      this.view.btnStart.onClick = this.onButtonEnterClicked.bind(this);
      this.view.postShow = this.onPostShow.bind(this);
    },

    onPostShow: function () {
      animation_1(this.view.imgStart);
      bgStars(this.view.flexWrap); 
    },

    onButtonEnterClicked: function() {
      var login = this.view.inptStartLogin.text;
      var password = this.view.inptStartPsswd.text;
      var validationResult = this.validateInput(login, password);
      if (!validationResult.validation) {
        alert (validationResult.validationMessage);
      } else {
        if (this.view.switchNewUser.selectedIndex === 1) {
          authUser.checkUser(login, password, 
			function(userId) {
            kony.timer.cancel("timerStars");
            kony.store.setItem("userId", userId);
            var navigation = new kony.mvc.Navigation("frmMain");
            navigation.navigate();
          },function(error) {
            alert(error ? JSON.stringify(error) : "User is not registrated. Please registrate first");
          });
        } else {
          authUser.registerUser(login, password, 
            function(userId) {
            kony.store.setItem("userId", userId);
            var navigation = new kony.mvc.Navigation("frmMain");
            navigation.navigate();
          },function(error) {
            alert(error ? JSON.stringify(error) : "User already exists. Please try another login");
          });
        }
      }

    },

    validateInput: function(login, password) {
      //regexps for the validation
      var pattern  = /^(?!\s)[A-Za-z0-9]+$/;

      if (login === null || password === null) {
        return {
          validation: false, 
          validationMessage: "Please fill all fields"
        };
      }

      if ((login.length < 4 || login.length > 10) || (password.length < 4 || password.length > 10)) {
        return  {
          validation: false, 
          validationMessage: "Password's and Login's length should be from 4 to 10 characters"
        };
      }

      if(!pattern.test(password) || !pattern.test(login)){
        return  {
          validation: false, 
          validationMessage: "Login and Password shouldn't contain any spaces or special characters"
        };
      }

      return  {validation: true};
    }

  };

});