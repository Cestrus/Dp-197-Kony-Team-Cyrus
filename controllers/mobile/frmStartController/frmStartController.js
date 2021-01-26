define({ 
  onInitialize: function() {
    this.view.btnStart.onClick = this.onButtonEnterClicked.bind(this);
  },
  
  onButtonEnterClicked: function() {
    if (this.view.inptStart.text.toLocaleLowerCase() === "ready for the space") {
      var navigation = new kony.mvc.Navigation("frmMain");
      navigation.navigate();
    } else {
      this.view.inptStart.setFocus(true);
      this.view.inptStart.text = "";
    }
  }
  

 });