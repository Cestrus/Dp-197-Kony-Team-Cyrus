/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
define(function() {
    var konymp = konymp || {};
    var KonyLoggerModule = require("com/konymp/accordion/konyLogger");
    konymp.logger = (new KonyLoggerModule("Product List Detail Component")) || function() {};
    konymp.logger.setLogLevel("DEBUG");
  	var constants = constants || {}; 
    constants.DEFAULT_HEADER_HEIGHT = "60dp";
    constants.DEFAULT_CONTAINER_HEIGHT = "180dp";
    constants.DEFAULT_CONTAINER_HEIGHT = "0dp";
    constants.DEFAULT_UNIT = "dp";
	constants.DEFAULT_EXPAND_ON = "Image only";
    constants.DEFAULT_ANIMATION = true;
    constants.DEFAULT_ANIMATION_DURATION = 0.5;
    constants.DEFAULT_ANIMATION_DELAY = 0;
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"accordion"+"/analytics");
            analytics.notifyAnalytics();
            konymp.logger.trace("----------Entering constructor---------", konymp.logger.FUNCTION_ENTRY);
            this._headerHeight = constants.DEFAULT_HEADER_HEIGHT;
            this._containerHeight = constants.DEFAULT_CONTAINER_HEIGHT;
            this._containerTop = constants.DEFAULT_CONTAINER_TOP;
            this._rowHeightShrinked = this._headerHeight;
            this._rowHeightExpanded = constants.DEFAULT_UNIT;
            this._expandOn = constants.DEFAULT_EXPAND_ON;
            this._isMultipleTemplate = false;
            this._animation = constants.DEFAULT_ANIMATION;
            this._animationDuration = constants.DEFAULT_ANIMATION_DURATION;
            this._animationDelay = constants.DEFAULT_ANIMATION_DELAY;
            this._flag = [];
            this._previousExpandedObj = null;
            this._data = [];
            this._widgetDataMap = {};
            this._widgetRef = null;
            this._rowLength = 0;
            konymp.logger.trace("----------Exiting constructor---------", konymp.logger.FUNCTION_EXIT);
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            konymp.logger.trace("----------Entering initGettersSetters Function---------", konymp.logger.FUNCTION_ENTRY);
            defineSetter(this, "expandOn", function(val) {
                konymp.logger.trace("----------Entering expandOn Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._expandOn = val;
                konymp.logger.trace("----------Exiting expandOn Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "headerHeight", function(val) {
                konymp.logger.trace("----------Entering expandOn Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._headerHeight = val;
                konymp.logger.trace("----------Exiting expandOn Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "containerHeight", function(val) {
                konymp.logger.trace("----------Entering expandOn Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._containerHeight = val;
                konymp.logger.trace("----------Exiting expandOn Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "animation", function(val) {
                konymp.logger.trace("----------Entering animation Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._animation = val;
                konymp.logger.trace("----------Exiting animation Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "animationDuration", function(val) {
                konymp.logger.trace("----------Entering animationDuration Setter---------", konymp.logger.FUNCTION_ENTRY);
                if (isNaN(val)) {
                  konymp.logger.warn("Invalid datatype for animation duration property");
                  throw {
                    "Error": "SegmentAccordion",
                    "message": "Invalid datatype for animation duration property"
                  };
                }
                this._animationDuration = parseFloat(val);
                konymp.logger.trace("----------Exiting animationDuration Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineSetter(this, "animationDelay", function(val) {
                konymp.logger.trace("----------Entering animationDelay Setter---------", konymp.logger.FUNCTION_ENTRY);
                if (isNaN(val)) {
                  konymp.logger.warn("Invalid datatype for animation delay property");
                  throw {
                    "Error": "SegmentAccordion",
                    "message": "Invalid datatype for animation delay property"
                  };
                }
                this._animationDelay = parseFloat(val);
                konymp.logger.trace("----------Exiting animationDelay Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            konymp.logger.trace("----------Exiting initGettersSetters Function---------", konymp.logger.FUNCTION_EXIT);
        },
      
      	/**
         * @function _getRowExpandedHeight
         * @scope private
         * @description calculates the maximum height of row in single Template
         */
        _getRowExpandedHeight: function() {
            konymp.logger.trace("----------Entering _getRowExpandedHeight Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                var unit = this._getUnit(this._headerHeight);
                var intHeaderHeight = parseFloat(this._headerHeight);
                var intContainerHeight = parseFloat(this._containerHeight);
                var intContainerTop = parseFloat(this._containerTop);
                var rowHeightExpanded = Number(intContainerHeight + intHeaderHeight+intContainerTop).toFixed().toString();
                this._rowHeightExpanded = rowHeightExpanded + unit;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _getRowExpandedHeight Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _getRowExpandedHeight Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _cloneHeader
         * @scope private
         * @description clones the header using id
         * @param id {id for cloning}
         */
        _cloneHeader: function(id) {
            konymp.logger.trace("----------Entering _cloneHeader Function---------", konymp.logger.FUNCTION_ENTRY);
            var flxRow;
            try {
                id = Number(id).toFixed().toString();
                var clonedHeader = this.view.flxHeaderMain.clone(id);
                flxRow = new kony.ui.FlexContainer({
                    "id": id + "flxRow",
                    "isVisible": true,
                  	"left":"0dp",
                    "top": "0%",
                    "width": "100%",
                    "height": this._headerHeight,
                    "right": "0%",
                    "zIndex": 1,
                    "clipBounds": true,
                    "skin": "slFSbox",
                    "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
                    "layoutType": kony.flex.FREE_FORM
                });
                clonedHeader.isVisible= true;
                flxRow.add(clonedHeader);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _cloneHeader Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _cloneHeader Function---------", konymp.logger.FUNCTION_EXIT);
            return flxRow;
        },
      
      	/**
         * @function _replicateRow
         * @scope private
         * @description replicates header
         */
        _replicateRow: function() {
            konymp.logger.trace("----------Entering _replicateRow Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                for (var i = 1; i <= this._rowLength; i++) {
                    var indexString = Number(i).toFixed().toString();
                    var header = this._cloneHeader(indexString);
                    this.view.flxMain.add(header);
                    this._flag[i] = false;
                }
                this.view.flxHeaderMain.isVisible = false;
                this.view.flxContainer.isVisible = false;
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _replicateRow Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _replicateRow Function---------", konymp.logger.FUNCTION_EXIT);

        },
      
      	/**
         * @function _toggleFunction
         * @scope private
         * @description expands/shrinks the row
         * @param clickedObj {reference of the widget clicked}
         */
        _toggleFunction: function(clickedObj) {
            konymp.logger.trace("----------Entering _toggleFunction Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                var index = this._getIndexValue(clickedObj.id);
                if (this._flag[index] === false) {
                    this._closePrevious(clickedObj);
                    if (this._isMultipleTemplate) {
                        this._addContainerMT(index, clickedObj);
                    } else {
                        this._addContainer(index, clickedObj);
                    }
                    clickedObj.parent.parent.height = this._rowHeightExpanded;
                    this._flag[index] = true;
                    this._previousExpandedObj = clickedObj;
                    if (this.onRowExpansion !== undefined) {
                        this.onRowExpansion();
                    }
                } else {
                  	this._removeContainer(index, clickedObj);
                    this._flag[index] = false;
                    if (this.onRowCollapse !== undefined) {
                        this.onRowCollapse();
                    }
                }
                this.view.flxMain.forceLayout();
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _toggleFunction Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _toggleFunction Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _addContainer
         * @scope private
         * @description add container dynamically to row
         * @param id {index of row}
         */
        _addContainer: function(id,clickedobj) {
            konymp.logger.trace("----------Entering _addContainer Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                clickedobj.widgets()[0].src = this.imgCollapse;
                var container = this.view.flxContainer.clone(id);
                container.isVisible = true;
                if(this._animation===true){
                  this._animateWidget(this.view.flxMain[id + "flxRow"], this._animationDelay, this._animationDuration, 1, this._rowHeightExpanded,null);
                }
              	else{
                  this.view.flxMain[id + "flxRow"] = this._rowHeightExpanded;
                }
                this.view.flxMain[id + "flxRow"].add(container);
                this._setContainerData(this._data, this._widgetDataMap, parseInt(id));
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _addContainer Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _addContainer Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _removeContainer
         * @scope private
         * @description remove the container using id
         * @param id {index of row}
         */
        _removeContainer: function(id,clickedObj) {
            konymp.logger.trace("----------Entering _removeContainer Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                clickedObj.widgets()[0].src = this.imgExpand;
                var containerId = id + "flxContainer";
                if(this._animation===true){
                	this._animateWidget(this.view.flxMain[id + "flxRow"], this._animationDelay, this._animationDuration, 1, this._rowHeightShrinked,this._animationEndFunction.bind(this,id,containerId));
                }
              	else{
                  this.view.flxMain[id + "flxRow"].height = this._rowHeightShrinked;
                  this.view.flxMain[id + "flxRow"].remove(this.view[containerId]);
                  this.view.forceLayout();
                }
                
                //this.view.flxMain[id + "flxRow"].remove(this.view[containerId]);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _removeContainer Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _removeContainer Function---------", konymp.logger.FUNCTION_EXIT);

        },
        _animationEndFunction: function(id,containerId){
          this.view.flxMain[id + "flxRow"].remove(this.view[containerId]);
        },
      
      	/**
         * @function _getIndexValue
         * @scope private
         * @description finds the index by splits the string
         * @param stringValue {String}
         */
        _getIndexValue: function(stringValue) {
            konymp.logger.trace("----------Entering _getIndexValue Function---------", konymp.logger.FUNCTION_ENTRY);
            var index;
            try {
                var i = 0;
                for (; i < stringValue.length; i++) {
                    if (!isNaN(stringValue[i])) {
                        continue;
                    } else {
                        break;
                    }
                }
                index = stringValue.substring(0, i);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _getIndexValue Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _getIndexValue Function---------", konymp.logger.FUNCTION_EXIT);

            return index;
        },

      	/**
         * @function _closePrevious
         * @scope private
         * @description close/shrink the previously opened row
         */
        _closePrevious: function(clickedObj) {
            konymp.logger.trace("----------Entering _closePrevious Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                if (this._previousExpandedObj === null) {
                    //do Nothing
                } else if(this._previousExpandedObj===clickedObj){
                  	//do Nothing
                }
              	else{
                    var index = this._getIndexValue(this._previousExpandedObj.id);
                    this._previousExpandedObj.widgets()[0].src = this.imgExpand;
                    this._removeContainer(index,clickedObj);
                    this._flag[index] = false;
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _closePrevious Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _closePrevious Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _getWidgetType
         * @scope private
         * @description gets the type of widget
         * @param widget {reference of widget}
         */
        _getWidgetType: function(widget) {
            konymp.logger.trace("----------Entering _getWidgetType Function---------", konymp.logger.FUNCTION_ENTRY);
            var widgetType;
            try {
                var widgetTypeFullClassName = kony.type(widget);
                widgetType = widgetTypeFullClassName.split(".")[2];
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _getWidgetType Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _getWidgetType Function---------", konymp.logger.FUNCTION_EXIT);
            return widgetType;
        },

      	/**
         * @function _getPropertiesName
         * @scope private
         * @description gets properties to be modified based on widget
         * @param widget {reference of widget}
         */
        _getPropertiesName: function(widget) {
            konymp.logger.trace("----------Entering _getPropertiesName Function---------", konymp.logger.FUNCTION_ENTRY);
            var propertyName = "";
            try {
                var widgetType = this._getWidgetType(widget);
                switch (widgetType) {
                    case "Label":
                    case "Button":
                        propertyName = "text";
                        break;
                    case "Image2":
                        propertyName = "src";
                        break;
                    default:
                        break;
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _getPropertiesName Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _getPropertiesName Function---------", konymp.logger.FUNCTION_EXIT);

            return propertyName;
        },

      	/**
         * @function _setSingleTemplateData
         * @scope private
         * @description animation to translate left
         * @param widgetDataMap {JSON}
         * @param data {JSON Array}
         */
        _setSingleTemplateData: function(widgetDataMap, data) {
            konymp.logger.trace("----------Entering _setSingleTemplateData Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                this._isMultipleTemplate = false;
                this._headerHeight = this.view.flxHeaderMain.height;
                this._containerHeight = this.view.flxContainer.height;
                this._containerTop = parseFloat(this.view.flxContainer.top)-parseFloat(this.view.flxHeaderMain.height);
                this._getRowExpandedHeight();
                this._headerDataMapping(widgetDataMap,data);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _setSingleTemplateData Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _setSingleTemplateData Function---------", konymp.logger.FUNCTION_EXIT);

        },
      
      	/**
         * @function _setContainerData
         * @scope private
         * @description set data for container for single template
         * @param data {JSON array}
         * @param widgetDataMap {JSON for data mapping}
         * @param id {index of row}
         */
        _setContainerData: function(data, widgetDataMap, id) {
            konymp.logger.trace("----------Entering _setContainerData Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                var idString = Number(id).toFixed().toString();
                var modifiedWidgetDataMap = this._createWidgetDataMapContainer(this._widgetDataMap);
                for (var key in modifiedWidgetDataMap) {
                    this.view[idString + key][this._getPropertiesName(this.view[idString + key])] = this._data[id - 1][1][modifiedWidgetDataMap[key]];
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _setContainerData Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _setContainerData Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _fetchAllNonContainerWidgetIds
         * @scope private
         * @description finds all the non container widget inside a container
         * @param widgetRef {reference of parent container widget}
         */
        _fetchAllNonContainerWidgetIds: function(widgetRef) {
            konymp.logger.trace("----------Entering _fetchAllNonContainerWidgetIds Function---------", konymp.logger.FUNCTION_ENTRY);
            var resultArray = [];
            try {
                var stack = [];
                stack.push(widgetRef);
                while (stack.length !== 0) {
                    var parentWidget = stack.pop();
                    var childWidgets = parentWidget.widgets();
                    for (var i = 0; i < childWidgets.length; i++) {
                        if (this._isContainerWidget(childWidgets[i])) {
                            stack.push(childWidgets[i]);
                        } else {
                            resultArray.push(childWidgets[i].id);
                        }
                    }
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _fetchAllNonContainerWidgetIds Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _fetchAllNonContainerWidgetIds Function---------", konymp.logger.FUNCTION_EXIT);

            return resultArray;
        },

      	/**
         * @function _isContainerWidget
         * @scope private
         * @description checks whether a container is Container or widgets
         * @param widgetRef {reference of widget}
         */
        _isContainerWidget: function(widgetRef) {
            konymp.logger.trace("----------Entering _isContainerWidget Function---------", konymp.logger.FUNCTION_ENTRY);
            var _isContainerWidget = false;
            try {
                var widgetType = kony.type(widgetRef);
                widgetType = widgetType.split(".")[2];
                if (widgetType == "FlexContainer" || widgetType == "FlexScrollContainer") {
                    _isContainerWidget = true;
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _isContainerWidget Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _isContainerWidget Function---------", konymp.logger.FUNCTION_EXIT);

            return _isContainerWidget;
        },

      	/**
         * @function _createWidgetDataMapContainer
         * @scope private
         * @description modifies widgetdatamap for only container
         * @param widgetDataMap {JSON}
         */
        _createWidgetDataMapContainer: function(widgetDataMap) {
            konymp.logger.trace("----------Entering _createWidgetDataMapContainer Function---------", konymp.logger.FUNCTION_ENTRY);
            var modifiedWidgetDataMap = {};
            try {
                var containerWidgetsIDs = this._fetchAllNonContainerWidgetIds(this.view.flxContainer);
                for (var key in widgetDataMap) {
                    for (var i = 0; i < containerWidgetsIDs.length; i++) {
                        if (key == containerWidgetsIDs[i]) {
                            modifiedWidgetDataMap[key] = widgetDataMap[key];
                        }
                    }
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _createWidgetDataMapContainer Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _createWidgetDataMapContainer Function---------", konymp.logger.FUNCTION_EXIT);

            return modifiedWidgetDataMap;
        },
      	
		/**
         * @function _setMultipleTemplateData
         * @scope private
         * @description set data to mutiple template
         * @param widgetDataMap {JSON for data mapping}
         * @param data {Array of JSON}
         * @param widgetRef {JSON for reference of templates}
         */
        _setMultipleTemplateData: function(widgetDataMap, data, widgetRef) {
            konymp.logger.trace("----------Entering _setMultipleTemplateData Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                this._isMultipleTemplate = true;
                this._headerDataMapping(widgetDataMap,data);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _setMultipleTemplateData Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _setMultipleTemplateData Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _calculateNoOfRows
         * @scope private
         * @description calculate the length of the data
         * @param widget {JSON Array}
         */
        _calculateNoOfRows: function(data) {
            konymp.logger.trace("----------Entering _calculateNoOfRows Function---------", konymp.logger.FUNCTION_ENTRY);
            var rowLength = 0;
            try {
                if (data.length >= 0) {
                    rowLength = data.length;
                    this._rowLength = data.length;
                }
            } catch (exception) {
                this._rowLength = 0;
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _calculateNoOfRows Function---------", konymp.logger.FUNCTION_EXIT);
                return 0;
            }
            konymp.logger.trace("----------Exiting _calculateNoOfRows Function---------", konymp.logger.FUNCTION_EXIT);
            return rowLength;
        },

      	/**
         * @function _addContainerMT
         * @scope private
         * @description adds container dynamically
         * @param id {index of row}
         */
        _addContainerMT: function(id,clickedobj) {
            konymp.logger.trace("----------Entering _addContainerMT Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                clickedobj.widgets()[0].src = this.imgCollapse;
                var container = "";
                var idInt = parseInt(id);
                if (this._data.length >= idInt)
                    var templateId = this._data[idInt - 1][1]["template"];
                var templateRef = this._widgetRef[templateId];
                this._getRowExpandedHeightMT(templateRef);
                container = templateRef;
                this.view.flxContainer.removeAll();
                this.view.flxContainer.add(container);
                this.view.flxContainer.height = this._containerHeight;
                var containerModified = this.view.flxContainer.clone(id);
                containerModified.isVisible = true;
                this.view.flxMain[id + "flxRow"].add(containerModified);
                if(this._animation===true){
                  this._animateWidget(this.view.flxMain[id + "flxRow"], this._animationDelay, this._animationDuration, 1, this._rowHeightExpanded,null);
                }
              	else{
                  this.view.flxMain[id + "flxRow"] = this._rowHeightExpanded;
                }
                this._setContainerData(this._data, this._widgetDataMap, id);
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _addContainerMT Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _addContainerMT Function---------", konymp.logger.FUNCTION_EXIT);

        },

      	/**
         * @function _getRowExpandedHeightMT
         * @scope private
         * @description finds the total height of header and container
         * @param containerRef {reference of the dynamic container}
         */
        _getRowExpandedHeightMT: function(containerRef) {
            konymp.logger.trace("----------Entering _getRowExpandedHeightMT Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                var intHeaderHeight = parseFloat(this._headerHeight.substring(0, this._headerHeight.length - 2));
                var containerHeight = containerRef.height;
                this._containerHeight = containerHeight;
                var intContainerHeight = parseFloat(this._containerHeight.substring(0, this._containerHeight.length - 2));
                var rowHeightExpanded = Number(intContainerHeight + intHeaderHeight).toFixed().toString();
                this._rowHeightExpanded = rowHeightExpanded + "dp";
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _getRowExpandedHeightMT Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _getRowExpandedHeightMT Function---------", konymp.logger.FUNCTION_EXIT);

        },

        /**
         * @function setData
         * @scope API exposed
         * @description set data to the accordion
         * @param widgetDataMap {JSON for data mapping}
         * @param data {Array of JSON}
         * @param widgetRef {JSON for reference of templates}
         */
        setData: function(widgetDataMap, data, widgetRef) {
            konymp.logger.trace("----------Entering setData Function---------", konymp.logger.FUNCTION_ENTRY);
            try {
                this._data = data;
                this._widgetDataMap = widgetDataMap;
                this._widgetRef = widgetRef;
                this.view.flxMain.removeAll();
                if(this._isDataValid(data)){
                  if ((widgetRef !== undefined && widgetRef !== null) && this._isDataContainsTemplate(data)) {
                    this._setMultipleTemplateData(widgetDataMap, data, widgetRef);
                  } else {
                    this._setSingleTemplateData(widgetDataMap, data);
                  }
                }
                else{
                  throw {message:"Invalid data format"};
                }

                
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting setData Function---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
            konymp.logger.trace("----------Exiting setData Function---------", konymp.logger.FUNCTION_EXIT);

        },
		
        /**
         * @function _isDataContainsTemplate
         * @scope private
         * @description checks whether data contains field template
         * @param data {Array of JSON}
         */
        _isDataContainsTemplate: function(data) {
            konymp.logger.trace("----------Entering _isDataContainsTemplate Function---------", konymp.logger.FUNCTION_ENTRY);
            var returnValue = false;
            try {
                if (data !== undefined && Array.isArray(data) && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i][1].hasOwnProperty("template")) {
                            returnValue = true;
                            break;
                        }
                    }
                }
            } catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _isDataContainsTemplate Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _isDataContainsTemplate Function---------", konymp.logger.FUNCTION_EXIT);
            return returnValue;
        },
       	/**
         * @function _animateWidget
         * @scope private
         * @description Animates the widgets
         */
		_animateWidget: function(widget,delay,duration,iteration,heightFinal,animationEndFunction){
            konymp.logger.trace("----------Entering _animateWidget Function---------", konymp.logger.FUNCTION_ENTRY);
            try{
                var animDefinitionOne = {
                  100:{
                    height:heightFinal
                  }
                };
                var animDef = kony.ui.createAnimation(animDefinitionOne);
                var animationConfig = {
                  "duration": duration,
                  "iterationCount": iteration,
                  "delay": delay,
                  "fillMode": kony.anim.FILL_MODE_FORWARDS
                };
                widget.animate(animDef, animationConfig, {"animationEnd":animationEndFunction});
            }catch (exception) {
                konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
                konymp.logger.trace("----------Exiting _animateWidget Function---------", konymp.logger.FUNCTION_EXIT);
            }
            konymp.logger.trace("----------Exiting _animateWidget Function---------", konymp.logger.FUNCTION_EXIT);
        },
      
        /**
         * @function _getUnit
         * @scope private
         * @description get the unit value i.e. dp, % or px
         * @param stringValue {String}
         */
        _getUnit: function(stringValue){
          konymp.logger.trace("----------Entering _getUnit Function---------", konymp.logger.FUNCTION_ENTRY);
          var unit;
          try{
              var lastChar = stringValue.charAt(stringValue.length-1);
              switch(lastChar){
                case "p": 
                  unit = "dp";
                  break;
                case "x": 
                  unit = "px";
                  break;
                case "%": 
                  unit = "%";
                  break;
                default: 
                  unit = "dp";
                  break;
              }
          }catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            konymp.logger.trace("----------Exiting _getUnit Function---------", konymp.logger.FUNCTION_EXIT);
          }
          
          
          konymp.logger.trace("----------Exiting _getUnit Function---------", konymp.logger.FUNCTION_EXIT);
          return unit;
        },
      
      	/**
         * @function _onClickFlxImage
         * @scope private
         * @description Tasks to perform on click of flxImage
         * @param eventObj {Reference of widget}
         */
        _onClickFlxImage: function(eventObj){
            konymp.logger.trace("----------Entering _onClickFlxImage Function---------", konymp.logger.FUNCTION_ENTRY);
            this._toggleFunction(eventObj);
            konymp.logger.trace("----------Exiting _onClickFlxImage Function---------", konymp.logger.FUNCTION_EXIT);
        },
        
        /**
         * @function _onClickFlxHeader
         * @scope private
         * @description Tasks to perform on click of flxHeader 
         * @param eventObj {Reference of widget}
         */
        _onClickFlxHeader: function(eventObj){
          konymp.logger.trace("----------Entering _onClickFlxHeader Function---------", konymp.logger.FUNCTION_ENTRY);
          try{
              var id = this._getIndexValue(eventObj.id);

              if(this._expandOn!=="Image only"){
                eventObj.zIndex = 10;
                this._toggleFunction(eventObj[id+"flxImage"]);
              }
              if (this.onClickHeader !== undefined) {
                this.onClickHeader();
              }
          }catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            konymp.logger.trace("----------Exiting _onClickFlxHeader Function---------", konymp.logger.FUNCTION_EXIT);
          }
          
          konymp.logger.trace("----------Exiting _onClickFlxHeader Function---------", konymp.logger.FUNCTION_EXIT);
        },
      
      	/**
         * @function onClickFlxContainer
         * @scope Events
         */
        onClickFlxContainer: function(){
          konymp.logger.trace("----------Entering onClickFlxContainer Function---------", konymp.logger.FUNCTION_ENTRY);
          if (this.onClickRow !== undefined) {
            this.onClickRow();
          }
          konymp.logger.trace("----------Exiting onClickFlxContainer Function---------", konymp.logger.FUNCTION_EXIT);
        },
      	
      	/**
         * @function getData
         * @scope API Exposed
         * @description Retuens the Data
         */
        getData: function(){
          konymp.logger.trace("----------Entering getData Function---------", konymp.logger.FUNCTION_ENTRY);
          konymp.logger.trace("----------Exiting getData Function---------", konymp.logger.FUNCTION_EXIT);
          return this._data;
          
        },
        /**
         * @function _headerDataMapping
         * @scope private
         * @description Retuens the Data
         * @param widgetDataMap {Reference of widget}
         * @param widgetDataMap {Reference of widget}
         */
        _headerDataMapping: function(widgetDataMap,data){
          konymp.logger.trace("----------Entering _headerDataMapping Function---------", konymp.logger.FUNCTION_ENTRY);
          try{
            this._calculateNoOfRows(data);
            this._replicateRow();
            for (var i = 0; i < this._rowLength; i++) {
              for (var key in widgetDataMap) {
                if (this.view[(i + 1) + key] !== null)
                  this.view[(i + 1) + key][this._getPropertiesName(this.view[(i + 1) + key])] = this._data[i][0][widgetDataMap[key]];
              }
            }
          }catch (exception) {
            konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
            konymp.logger.trace("----------Exiting _headerDataMapping Function---------", konymp.logger.FUNCTION_EXIT);
          }
          konymp.logger.trace("----------Entering _headerDataMapping Function---------", konymp.logger.FUNCTION_ENTRY);
        },
      	/**
         * @function _isDataValid
         * @scope private
         * @description Returns whether the Data is valid or not 
         */
        _isDataValid: function(data){
          if(Array.isArray(data) && data.length>0){
            if(Array.isArray(data[0]) && data[0].length>0)
              return true;
            else
              return false;
          }
          else{
            return  false;
          }
        }
    };
});