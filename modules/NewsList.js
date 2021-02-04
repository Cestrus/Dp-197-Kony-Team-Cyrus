function News(webTitle, webPublicationDate, trailText, thumbnail) {
  this.webTitle = webTitle || '';
  this.webPublicationDate = webPublicationDate || '';
  this.trailText = trailText || '';
  this.thumbnail = thumbnail || '';
}

News.prototype = function () {
  return {
	lblNewsTitle: webTitle,
    lblNewsDate: webPublicationDate.slice(0,10),
    lblNewsShortDesc: trailText,
    imgNews: thumbnail
  };
};