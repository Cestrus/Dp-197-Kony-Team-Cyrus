define(["FavoritesService"], function(favoritesService){
  return {
    onInitialize: function() {
      this.view.lstSavedNews.onRowClick = this.onSeparateNewsClicked.bind(this);
    },

    onNavigate: function(data) {
      favoritesService.getFavoriteArticles();
      if(data) this.view.lstSavedNews.setData(data);
    },

    onSeparateNewsClicked: function (segmentWidgetRef, sectionNumber, rowIndex) {
      var navigation = new kony.mvc.Navigation("frmSeparateNews");
      navigation.navigate(segmentWidgetRef.data[rowIndex]);
    },
  };
});