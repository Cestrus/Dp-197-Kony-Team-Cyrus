define(["MarsFactsService"], function(marsFactsService) { 
  return {
    onInitialize: function() {  
      this.view.btnInfo.onClick = this.onButtonGoInfo.bind(this);
    },

    onNavigate: function(data) {
      if(data) this.view.lstDates.setData(data);
    },

    onButtonGoInfo: function() {
      marsFactsService.getFacts(function(facts) {
        var navigation = new kony.mvc.Navigation("frmWeatherFAQ");
        navigation.navigate(facts);
        
      },function() {
        alert("Error while retrieving Mars weather facts.");
      });
    },
  };

});
