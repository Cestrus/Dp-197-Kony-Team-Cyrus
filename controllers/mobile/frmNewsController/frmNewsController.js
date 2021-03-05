define(["FavoritesService"], function(favoritesService){
  return {
    onInitialize: function() {
      this.view.lstNews.onRowClick = this.onSeparateNewsClicked.bind(this);
    },

    onNavigate: function(data) {
      if(data) this.view.lstNews.setData(data);
      favoritesService.getFavoriteArticles();
    },

    onSeparateNewsClicked: function (segmentWidgetRef, sectionNumber, rowIndex) {
      var navigation = new kony.mvc.Navigation("frmSeparateNews");
      navigation.navigate(segmentWidgetRef.data[rowIndex]);
    },
  };
});