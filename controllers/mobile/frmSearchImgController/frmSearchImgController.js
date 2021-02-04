define(["SearchImgService"], function(SearchImgService){
    return {
        onInitialize: function() {
            this.resetVisiblity();
            // 
            this.imgArr = []; // array for all img
            this.chooseImgNimbers = []; // array for index chosen img
            this.storeFavoriteImg = []; // store for favorite img TODO IT GLOBAL

            this.view.tabBtnHome.onClick = this.onButtonGoToHome.bind(this);
            this.view.tabBtnNews.onClick = this.onButtonGoToNews.bind(this);
            this.view.tabBtnWeather.onClick = this.onButtonGoToWeather.bind(this);
            this.view.btnSearch.onClick = this.onSendRequest.bind(this);
            this.view.btnAddToCollection.onClick = this.onAddToCollection(this);

            this.view.lstImg.onRowClick = this.onChooseImg.bind(this);

            this.view.btnGoBack.onClick = function () {
                var navigation = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
                navigation.navigate();
            }.bind(this);
        },

        onButtonGoToHome: function() {
            var navigation = new kony.mvc.Navigation("frmMain");
            navigation.navigate();
        },

        onButtonGoToNews: function() {
            var navigation = new kony.mvc.Navigation("frmNews");
            navigation.navigate();
        },

        onButtonGoToWeather: function() {
            var navigation = new kony.mvc.Navigation("frmWeather");
            navigation.navigate();
        },

        // visibility methods

        resetVisiblity: function() {
            this.view.imgRocket.isVisible = true;
            this.view.lbNotFound.isVisible = false;
            this.view.lstImg.isVisible = false;
            this.view.btnAddToCollection.isVisible = false;
        },

        renderNotFound: function() {
            this.view.imgRocket.isVisible = true;
            this.view.lbNotFound.isVisible = true;
            this.view.lstImg.isVisible = false;
            this.view.btnAddToCollection.isVisible = false;
        },

        renderListImg: function() {
            this.view.imgRocket.isVisible = false;
            this.view.lbNotFound.isVisible = false;
            this.view.lstImg.isVisible = true;
            this.view.btnAddToCollection.isVisible = false;
        },

        renderNotInput: function() {
            this.view.imgRocket.isVisible = true;
            this.view.lbNotFound.isVisible = false;
            this.view.lstImg.isVisible = false;
            this.view.btnAddToCollection.isVisible = false;
        },
        
        onSendRequest: function() {
            var requestText = this.view.inptSearchImg.text? this.view.inptSearchImg.text.trim() : this.view.inptSearchImg.text;
            kony.application.showLoadingScreen();
			SearchImgService.getImages(
				requestText,
                this.checkImgList.bind(this),
            );
            kony.application.dismissLoadingScreen();
        },
       
        checkImgList: function(arrLinks) {
            if(!arrLinks){
                this.renderNotInput();
            } else {
                this.imgArr = arrLinks.filter(function(link) { // delete arr element what is ""
					return link.imgSpace !== "";
                });
                if(!this.imgArr.length) this.renderNotFound();  
                else {
                    this.view.lstImg.setData(this.imgArr);
                    this.renderListImg();
				}        
			}          		
        },

        onChooseImg: function(seguiWidget, sectionNumber, rowNumber, selectedState) {
			this.view.btnAddToCollection.isVisible = true;    
            this.chooseImgNimbers.push(this.imgArr[rowNumber]);
       },

        onAddToCollection: function() {

            for (var i = 1; i < this.chooseImgNimbers.length; i++){
                this.storeFavoriteImg.push(this.imgArr[this.chooseImgNimbers[i]])
            }
        }

	}

 });