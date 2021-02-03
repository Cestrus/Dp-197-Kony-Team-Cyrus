function NewsList(webTitle, webPublicationDate, trailText, thumbnail) {
  this.lblNewsTitle = webTitle || '';
  this.lblNewsDate = webPublicationDate.slice(0,10) || '';
  this.lblNewsShortDesc = trailText || '';
  this.imgNews = thumbnail || '';
}

NewsList.prototype = function () {
  return {
    lblNewsTitle: this.lblNewsTitle,
    lblNewsDate: this.lblNewsDate,
    lblNewsShortDesc: this.lblNewsShortDesc,
    imgNews: this.imgNews
  };
};