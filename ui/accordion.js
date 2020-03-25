/**
 * DevExtreme (ui/accordion.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var _renderer = require("../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _events_engine = require("../events/core/events_engine");
var _events_engine2 = _interopRequireDefault(_events_engine);
var _fx = require("../animation/fx");
var _fx2 = _interopRequireDefault(_fx);
var _click = require("../events/click");
var _click2 = _interopRequireDefault(_click);
var _devices = require("../core/devices");
var _devices2 = _interopRequireDefault(_devices);
var _dom_adapter = require("../core/dom_adapter");
var _dom_adapter2 = _interopRequireDefault(_dom_adapter);
var _extend = require("../core/utils/extend");
var _common = require("../core/utils/common");
var _dom = require("../core/utils/dom");
var _iterator = require("../core/utils/iterator");
var _iterator2 = _interopRequireDefault(_iterator);
var _type = require("../core/utils/type");
var _component_registrator = require("../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _utils = require("../events/utils");
var eventUtils = _interopRequireWildcard(_utils);
var _uiCollection_widget = require("./collection/ui.collection_widget.live_update");
var _uiCollection_widget2 = _interopRequireDefault(_uiCollection_widget);
var _deferred = require("../core/utils/deferred");
var _bindable_template = require("../core/templates/bindable_template");
var _icon = require("../core/utils/icon");
var _themes = require("./themes");
var _themes2 = _interopRequireDefault(_themes);

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ACCORDION_CLASS = "dx-accordion";
var ACCORDION_WRAPPER_CLASS = "dx-accordion-wrapper";
var ACCORDION_ITEM_CLASS = "dx-accordion-item";
var ACCORDION_ITEM_OPENED_CLASS = "dx-accordion-item-opened";
var ACCORDION_ITEM_CLOSED_CLASS = "dx-accordion-item-closed";
var ACCORDION_ITEM_TITLE_CLASS = "dx-accordion-item-title";
var ACCORDION_ITEM_BODY_CLASS = "dx-accordion-item-body";
var ACCORDION_ITEM_TITLE_CAPTION_CLASS = "dx-accordion-item-title-caption";
var ACCORDION_ITEM_DATA_KEY = "dxAccordionItemData";
var Accordion = _uiCollection_widget2.default.inherit({
    _activeStateUnit: "." + ACCORDION_ITEM_CLASS,
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            hoverStateEnabled: true,
            height: void 0,
            itemTitleTemplate: "title",
            onItemTitleClick: null,
            selectedIndex: 0,
            collapsible: false,
            multiple: false,
            animationDuration: 300,
            deferRendering: true,
            selectionByClick: true,
            activeStateEnabled: true,
            _itemAttributes: {
                role: "tab"
            },
            _animationEasing: "ease"
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _devices2.default.real().deviceType && !_devices2.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return _themes2.default.isMaterial()
            },
            options: {
                animationDuration: 200,
                _animationEasing: "cubic-bezier(0.4, 0, 0.2, 1)"
            }
        }])
    },
    _itemElements: function() {
        return this._itemContainer().children(this._itemSelector())
    },
    _init: function() {
        this.callBase();
        this.option("selectionRequired", !this.option("collapsible"));
        this.option("selectionMode", this.option("multiple") ? "multiple" : "single");
        var $element = this.$element();
        $element.addClass(ACCORDION_CLASS);
        this._$container = (0, _renderer2.default)("<div>").addClass(ACCORDION_WRAPPER_CLASS);
        $element.append(this._$container)
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            title: new _bindable_template.BindableTemplate(function($container, data) {
                if ((0, _type.isPlainObject)(data)) {
                    var $iconElement = (0, _icon.getImageContainer)(data.icon);
                    if ($iconElement) {
                        $container.append($iconElement)
                    }
                    if ((0, _type.isDefined)(data.title) && !(0, _type.isPlainObject)(data.title)) {
                        $container.append(_dom_adapter2.default.createTextNode(data.title))
                    }
                } else {
                    if ((0, _type.isDefined)(data)) {
                        $container.text(String(data))
                    }
                }
                $container.wrapInner((0, _renderer2.default)("<div>").addClass(ACCORDION_ITEM_TITLE_CAPTION_CLASS))
            }, ["title", "icon"], this.option("integrationOptions.watchMethod"))
        })
    },
    _initMarkup: function() {
        var _this = this;
        this._deferredItems = [];
        this.callBase();
        this.setAria({
            role: "tablist",
            multiselectable: this.option("multiple")
        });
        (0, _common.deferRender)(function() {
            var selectedItemIndices = _this._getSelectedItemIndices();
            _this._renderSelection(selectedItemIndices, [])
        })
    },
    _render: function() {
        this.callBase();
        this._updateItemHeightsWrapper(true)
    },
    _itemDataKey: function() {
        return ACCORDION_ITEM_DATA_KEY
    },
    _itemClass: function() {
        return ACCORDION_ITEM_CLASS
    },
    _itemContainer: function() {
        return this._$container
    },
    _itemTitles: function() {
        return this._itemElements().find("." + ACCORDION_ITEM_TITLE_CLASS)
    },
    _itemContents: function() {
        return this._itemElements().find("." + ACCORDION_ITEM_BODY_CLASS)
    },
    _getItemData: function(target) {
        return (0, _renderer2.default)(target).parent().data(this._itemDataKey()) || this.callBase.apply(this, arguments)
    },
    _executeItemRenderAction: function(itemData) {
        if (itemData.type) {
            return
        }
        this.callBase.apply(this, arguments)
    },
    _itemSelectHandler: function(e) {
        if ((0, _renderer2.default)(e.target).closest(this._itemContents()).length) {
            return
        }
        this.callBase.apply(this, arguments)
    },
    _afterItemElementDeleted: function($item, deletedActionArgs) {
        this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
        this.callBase.apply(this, arguments)
    },
    _renderItemContent: function(args) {
        var itemTitle = this.callBase((0, _extend.extend)({}, args, {
            contentClass: ACCORDION_ITEM_TITLE_CLASS,
            templateProperty: "titleTemplate",
            defaultTemplateName: this.option("itemTitleTemplate")
        }));
        this._attachItemTitleClickAction(itemTitle);
        var deferred = new _deferred.Deferred;
        if ((0, _type.isDefined)(this._deferredItems[args.index])) {
            this._deferredItems[args.index] = deferred
        } else {
            this._deferredItems.push(deferred)
        }
        if (!this.option("deferRendering") || this._getSelectedItemIndices().indexOf(args.index) >= 0) {
            deferred.resolve()
        }
        deferred.done(this.callBase.bind(this, (0, _extend.extend)({}, args, {
            contentClass: ACCORDION_ITEM_BODY_CLASS,
            container: (0, _dom.getPublicElement)((0, _renderer2.default)("<div>").appendTo((0, _renderer2.default)(itemTitle).parent()))
        })))
    },
    _attachItemTitleClickAction: function(itemTitle) {
        var eventName = eventUtils.addNamespace(_click2.default.name, this.NAME);
        _events_engine2.default.off(itemTitle, eventName);
        _events_engine2.default.on(itemTitle, eventName, this._itemTitleClickHandler.bind(this))
    },
    _itemTitleClickHandler: function(e) {
        this._itemDXEventHandler(e, "onItemTitleClick")
    },
    _renderSelection: function(addedSelection, removedSelection) {
        this._itemElements().addClass(ACCORDION_ITEM_CLOSED_CLASS);
        this.setAria("hidden", true, this._itemContents());
        this._updateItems(addedSelection, removedSelection)
    },
    _updateSelection: function(addedSelection, removedSelection) {
        this._updateItems(addedSelection, removedSelection);
        this._updateItemHeightsWrapper(false)
    },
    _updateItems: function(addedSelection, removedSelection) {
        var _this2 = this;
        var $items = this._itemElements();
        _iterator2.default.each(addedSelection, function(_, index) {
            _this2._deferredItems[index].resolve();
            var $item = $items.eq(index).addClass(ACCORDION_ITEM_OPENED_CLASS).removeClass(ACCORDION_ITEM_CLOSED_CLASS);
            _this2.setAria("hidden", false, $item.find("." + ACCORDION_ITEM_BODY_CLASS))
        });
        _iterator2.default.each(removedSelection, function(_, index) {
            var $item = $items.eq(index).removeClass(ACCORDION_ITEM_OPENED_CLASS);
            _this2.setAria("hidden", true, $item.find("." + ACCORDION_ITEM_BODY_CLASS))
        })
    },
    _updateItemHeightsWrapper: function(skipAnimation) {
        if (this.option("templatesRenderAsynchronously")) {
            this._animationTimer = setTimeout(function() {
                this._updateItemHeights(skipAnimation)
            }.bind(this))
        } else {
            this._updateItemHeights(skipAnimation)
        }
    },
    _updateItemHeights: function(skipAnimation) {
        var that = this;
        var deferredAnimate = that._deferredAnimate;
        var itemHeight = this._splitFreeSpace(this._calculateFreeSpace());
        clearTimeout(this._animationTimer);
        return _deferred.when.apply(_renderer2.default, [].slice.call(this._itemElements()).map(function(item) {
            return that._updateItemHeight((0, _renderer2.default)(item), itemHeight, skipAnimation)
        })).done(function() {
            if (deferredAnimate) {
                deferredAnimate.resolveWith(that)
            }
        })
    },
    _updateItemHeight: function($item, itemHeight, skipAnimation) {
        var $title = $item.children("." + ACCORDION_ITEM_TITLE_CLASS);
        if (_fx2.default.isAnimating($item)) {
            _fx2.default.stop($item)
        }
        var startItemHeight = $item.outerHeight();
        var finalItemHeight = $item.hasClass(ACCORDION_ITEM_OPENED_CLASS) ? itemHeight + $title.outerHeight() || $item.height("auto").outerHeight() : $title.outerHeight();
        return this._animateItem($item, startItemHeight, finalItemHeight, skipAnimation, !!itemHeight)
    },
    _animateItem: function($element, startHeight, endHeight, skipAnimation, fixedHeight) {
        var d;
        if (skipAnimation || startHeight === endHeight) {
            $element.css("height", endHeight);
            d = (new _deferred.Deferred).resolve()
        } else {
            d = _fx2.default.animate($element, {
                type: "custom",
                from: {
                    height: startHeight
                },
                to: {
                    height: endHeight
                },
                duration: this.option("animationDuration"),
                easing: this.option("_animationEasing")
            })
        }
        return d.done(function() {
            if ($element.hasClass(ACCORDION_ITEM_OPENED_CLASS) && !fixedHeight) {
                $element.css("height", "")
            }
            $element.not("." + ACCORDION_ITEM_OPENED_CLASS).addClass(ACCORDION_ITEM_CLOSED_CLASS)
        })
    },
    _splitFreeSpace: function(freeSpace) {
        if (!freeSpace) {
            return freeSpace
        }
        return freeSpace / this.option("selectedItems").length
    },
    _calculateFreeSpace: function() {
        var height = this.option("height");
        if (void 0 === height || "auto" === height) {
            return
        }
        var $titles = this._itemTitles();
        var itemsHeight = 0;
        _iterator2.default.each($titles, function(_, title) {
            itemsHeight += (0, _renderer2.default)(title).outerHeight()
        });
        return this.$element().height() - itemsHeight
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _dimensionChanged: function() {
        this._updateItemHeights(true)
    },
    _clean: function() {
        clearTimeout(this._animationTimer);
        this.callBase()
    },
    _itemOptionChanged: function(item, property, value, oldValue) {
        this.callBase(item, property, value, oldValue);
        if ("visible" === property) {
            this._updateItemHeightsWrapper(true)
        }
    },
    _tryParseItemPropertyName: function(fullName) {
        var matches = fullName.match(/.*\.(.*)/);
        if ((0, _type.isDefined)(matches) && matches.length >= 1) {
            return matches[1]
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "items":
                this.callBase(args);
                if ("title" === this._tryParseItemPropertyName(args.fullName)) {
                    this._renderSelection(this._getSelectedItemIndices(), [])
                }
                break;
            case "animationDuration":
            case "onItemTitleClick":
            case "_animationEasing":
                break;
            case "collapsible":
                this.option("selectionRequired", !this.option("collapsible"));
                break;
            case "itemTitleTemplate":
            case "height":
            case "deferRendering":
                this._invalidate();
                break;
            case "multiple":
                this.option("selectionMode", args.value ? "multiple" : "single");
                break;
            default:
                this.callBase(args)
        }
    },
    expandItem: function(index) {
        this._deferredAnimate = new _deferred.Deferred;
        this.selectItem(index);
        return this._deferredAnimate.promise()
    },
    collapseItem: function(index) {
        this._deferredAnimate = new _deferred.Deferred;
        this.unselectItem(index);
        return this._deferredAnimate.promise()
    },
    updateDimensions: function() {
        return this._updateItemHeights(false)
    }
});
(0, _component_registrator2.default)("dxAccordion", Accordion);
module.exports = Accordion;
module.exports.default = module.exports;
