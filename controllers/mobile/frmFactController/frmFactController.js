define(["MarsFactsService"], function(marsFactsService) {

  return { 
	onInitialize: function() {
      this.view.headerApp.onBackClicked = this.onButtonGoInfo.bind(this);
    },

    onNavigate: function(data) {
      this.view.lblFactTitle.text = data.lblTitle;
      this.view.lblFactText.text = data.factContent;
    },

    onButtonGoInfo: function() {
      marsFactsService.getFacts(function(facts) {
        var navigation = new kony.mvc.Navigation("frmWeatherFAQ");
        navigation.navigate(facts);
      },function() {
        alert("Error while retrieving Mars weather facts.");
      });
    }
  };
 });