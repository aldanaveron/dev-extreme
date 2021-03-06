/**
 * DevExtreme (ui/radio_group/radio_group.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _extend = require("../../core/utils/extend");
var _devices = require("../../core/devices");
var _devices2 = _interopRequireDefault(_devices);
var _common = require("../../core/utils/common");
var _utils = require("../widget/utils.ink_ripple");
var _utils2 = _interopRequireDefault(_utils);
var _component_registrator = require("../../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _uiCollection_widget = require("../collection/ui.collection_widget.edit");
var _uiCollection_widget2 = _interopRequireDefault(_uiCollection_widget);
var _ui = require("../editor/ui.data_expression");
var _ui2 = _interopRequireDefault(_ui);
var _editor = require("../editor/editor");
var _editor2 = _interopRequireDefault(_editor);
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

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

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _get(target, property, receiver) {
    if ("undefined" !== typeof Reflect && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) {
                return
            }
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver)
            }
            return desc.value
        }
    }
    return _get(target, property, receiver || target)
}

function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (null === object) {
            break
        }
    }
    return object
}

function _createSuper(Derived) {
    return function() {
        var result, Super = _getPrototypeOf(Derived);
        if (_isNativeReflectConstruct()) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}

function _possibleConstructorReturn(self, call) {
    if (call && ("object" === _typeof(call) || "function" === typeof call)) {
        return call
    }
    return _assertThisInitialized(self)
}

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}

function _isNativeReflectConstruct() {
    if ("undefined" === typeof Reflect || !Reflect.construct) {
        return false
    }
    if (Reflect.construct.sham) {
        return false
    }
    if ("function" === typeof Proxy) {
        return true
    }
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}

function _inherits(subClass, superClass) {
    if ("function" !== typeof superClass && null !== superClass) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) {
        _setPrototypeOf(subClass, superClass)
    }
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var RADIO_BUTTON_CHECKED_CLASS = "dx-radiobutton-checked";
var RADIO_BUTTON_CLASS = "dx-radiobutton";
var RADIO_BUTTON_ICON_CHECKED_CLASS = "dx-radiobutton-icon-checked";
var RADIO_BUTTON_ICON_CLASS = "dx-radiobutton-icon";
var RADIO_BUTTON_ICON_DOT_CLASS = "dx-radiobutton-icon-dot";
var RADIO_GROUP_HORIZONTAL_CLASS = "dx-radiogroup-horizontal";
var RADIO_GROUP_VERTICAL_CLASS = "dx-radiogroup-vertical";
var RADIO_VALUE_CONTAINER_CLASS = "dx-radio-value-container";
var RADIO_GROUP_CLASS = "dx-radiogroup";
var RADIO_FEEDBACK_HIDE_TIMEOUT = 100;
var RadioCollection = function(_CollectionWidget) {
    _inherits(RadioCollection, _CollectionWidget);
    var _super = _createSuper(RadioCollection);

    function RadioCollection() {
        _classCallCheck(this, RadioCollection);
        return _super.apply(this, arguments)
    }
    _createClass(RadioCollection, [{
        key: "_focusTarget",
        value: function() {
            return this.$element().parent()
        }
    }, {
        key: "_nullValueSelectionSupported",
        value: function() {
            return true
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            var defaultOptions = _get(_getPrototypeOf(RadioCollection.prototype), "_getDefaultOptions", this).call(this);
            return (0, _extend.extend)(defaultOptions, _ui2.default._dataExpressionDefaultOptions(), {
                _itemAttributes: {
                    role: "radio"
                }
            })
        }
    }, {
        key: "_initMarkup",
        value: function() {
            var _this = this;
            _get(_getPrototypeOf(RadioCollection.prototype), "_initMarkup", this).call(this);
            (0, _common.deferRender)(function() {
                _this.itemElements().addClass(RADIO_BUTTON_CLASS)
            })
        }
    }, {
        key: "_keyboardEventBindingTarget",
        value: function() {
            return this._focusTarget()
        }
    }, {
        key: "_postprocessRenderItem",
        value: function(args) {
            var html = args.itemData.html,
                itemElement = args.itemElement;
            if (!html) {
                var $radio = (0, _renderer2.default)("<div>").addClass(RADIO_BUTTON_ICON_CLASS);
                (0, _renderer2.default)("<div>").addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo($radio);
                var $radioContainer = (0, _renderer2.default)("<div>").append($radio).addClass(RADIO_VALUE_CONTAINER_CLASS);
                (0, _renderer2.default)(itemElement).prepend($radioContainer)
            }
            _get(_getPrototypeOf(RadioCollection.prototype), "_postprocessRenderItem", this).call(this, args)
        }
    }, {
        key: "_processSelectableItem",
        value: function($itemElement, isSelected) {
            _get(_getPrototypeOf(RadioCollection.prototype), "_processSelectableItem", this).call(this, $itemElement, isSelected);
            $itemElement.toggleClass(RADIO_BUTTON_CHECKED_CLASS, isSelected).find(".".concat(RADIO_BUTTON_ICON_CLASS)).first().toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, isSelected);
            this.setAria("checked", isSelected, $itemElement)
        }
    }, {
        key: "_refreshContent",
        value: function() {
            this._prepareContent();
            this._renderContent()
        }
    }, {
        key: "_supportedKeys",
        value: function() {
            var parent = _get(_getPrototypeOf(RadioCollection.prototype), "_supportedKeys", this).call(this);
            return (0, _extend.extend)({}, parent, {
                enter: function(e) {
                    e.preventDefault();
                    return parent.enter.apply(this, arguments)
                },
                space: function(e) {
                    e.preventDefault();
                    return parent.space.apply(this, arguments)
                }
            })
        }
    }, {
        key: "_itemElements",
        value: function() {
            return this._itemContainer().children(this._itemSelector())
        }
    }]);
    return RadioCollection
}(_uiCollection_widget2.default);
var RadioGroup = function(_Editor) {
    _inherits(RadioGroup, _Editor);
    var _super2 = _createSuper(RadioGroup);

    function RadioGroup() {
        _classCallCheck(this, RadioGroup);
        return _super2.apply(this, arguments)
    }
    _createClass(RadioGroup, [{
        key: "_clean",
        value: function() {
            delete this._inkRipple;
            _get(_getPrototypeOf(RadioGroup.prototype), "_clean", this).call(this)
        }
    }, {
        key: "_dataSourceOptions",
        value: function() {
            return {
                paginate: false
            }
        }
    }, {
        key: "_defaultOptionsRules",
        value: function() {
            var defaultOptionsRules = _get(_getPrototypeOf(RadioGroup.prototype), "_defaultOptionsRules", this).call(this);
            return defaultOptionsRules.concat([{
                device: {
                    tablet: true
                },
                options: {
                    layout: "horizontal"
                }
            }, {
                device: function() {
                    return "desktop" === _devices2.default.real().deviceType && !_devices2.default.isSimulator()
                },
                options: {
                    focusStateEnabled: true
                }
            }])
        }
    }, {
        key: "_fireContentReadyAction",
        value: function(force) {
            force && _get(_getPrototypeOf(RadioGroup.prototype), "_fireContentReadyAction", this).call(this)
        }
    }, {
        key: "_focusTarget",
        value: function() {
            return this.$element()
        }
    }, {
        key: "_getAriaTarget",
        value: function() {
            return this.$element()
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            var defaultOptions = _get(_getPrototypeOf(RadioGroup.prototype), "_getDefaultOptions", this).call(this);
            return (0, _extend.extend)(defaultOptions, (0, _extend.extend)(_ui2.default._dataExpressionDefaultOptions(), {
                hoverStateEnabled: true,
                activeStateEnabled: true,
                layout: "vertical",
                useInkRipple: false
            }))
        }
    }, {
        key: "_getItemValue",
        value: function(item) {
            return this._valueGetter ? this._valueGetter(item) : item.text
        }
    }, {
        key: "_getSubmitElement",
        value: function() {
            return this._$submitElement
        }
    }, {
        key: "_init",
        value: function() {
            _get(_getPrototypeOf(RadioGroup.prototype), "_init", this).call(this);
            this._activeStateUnit = ".".concat(RADIO_BUTTON_CLASS);
            this._feedbackHideTimeout = RADIO_FEEDBACK_HIDE_TIMEOUT;
            this._initDataExpressions()
        }
    }, {
        key: "_initMarkup",
        value: function() {
            this.$element().addClass(RADIO_GROUP_CLASS);
            this._renderSubmitElement();
            this.setAria("role", "radiogroup");
            this._renderRadios();
            this.option("useInkRipple") && this._renderInkRipple();
            this._renderLayout();
            _get(_getPrototypeOf(RadioGroup.prototype), "_initMarkup", this).call(this)
        }
    }, {
        key: "_itemClickHandler",
        value: function(_ref) {
            var itemElement = _ref.itemElement,
                event = _ref.event,
                itemData = _ref.itemData;
            if (this.itemElements().is(itemElement)) {
                var newValue = this._getItemValue(itemData);
                if (newValue !== this.option("value")) {
                    this._saveValueChangeEvent(event);
                    this.option("value", newValue)
                }
            }
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name,
                value = args.value;
            this._dataExpressionOptionChanged(args);
            switch (name) {
                case "useInkRipple":
                    this._invalidate();
                    break;
                case "focusStateEnabled":
                case "accessKey":
                case "tabIndex":
                    this._setCollectionWidgetOption(name, value);
                    break;
                case "disabled":
                    _get(_getPrototypeOf(RadioGroup.prototype), "_optionChanged", this).call(this, args);
                    this._setCollectionWidgetOption(name, value);
                    break;
                case "dataSource":
                    this._setCollectionWidgetOption("dataSource", this._dataSource);
                    break;
                case "valueExpr":
                    this._setCollectionWidgetOption("keyExpr", this._getCollectionKeyExpr());
                    break;
                case "value":
                    this._setCollectionWidgetOption("selectedItemKeys", [value]);
                    this._setSubmitValue(value);
                    _get(_getPrototypeOf(RadioGroup.prototype), "_optionChanged", this).call(this, args);
                    break;
                case "items":
                case "itemTemplate":
                case "displayExpr":
                    break;
                case "layout":
                    this._renderLayout();
                    this._updateItemsSize();
                    break;
                default:
                    _get(_getPrototypeOf(RadioGroup.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_render",
        value: function() {
            _get(_getPrototypeOf(RadioGroup.prototype), "_render", this).call(this);
            this._updateItemsSize()
        }
    }, {
        key: "_renderInkRipple",
        value: function() {
            this._inkRipple = _utils2.default.render({
                waveSizeCoefficient: 3.3,
                useHoldAnimation: false,
                isCentered: true
            })
        }
    }, {
        key: "_renderLayout",
        value: function() {
            var layout = this.option("layout");
            var $element = this.$element();
            $element.toggleClass(RADIO_GROUP_VERTICAL_CLASS, "vertical" === layout);
            $element.toggleClass(RADIO_GROUP_HORIZONTAL_CLASS, "horizontal" === layout)
        }
    }, {
        key: "_renderRadios",
        value: function() {
            var _this2 = this;
            this._areRadiosCreated = new _deferred.Deferred;
            var $radios = (0, _renderer2.default)("<div>").appendTo(this.$element());
            this._radios = this._createComponent($radios, RadioCollection, {
                displayExpr: this.option("displayExpr"),
                accessKey: this.option("accessKey"),
                dataSource: this._dataSource,
                focusStateEnabled: this.option("focusStateEnabled"),
                itemTemplate: this.option("itemTemplate"),
                keyExpr: this._getCollectionKeyExpr(),
                noDataText: "",
                onContentReady: function() {
                    return _this2._fireContentReadyAction(true)
                },
                onItemClick: this._itemClickHandler.bind(this),
                scrollingEnabled: false,
                selectionByClick: false,
                selectionMode: "single",
                selectedItemKeys: [this.option("value")],
                tabIndex: this.option("tabIndex")
            });
            this._areRadiosCreated.resolve()
        }
    }, {
        key: "_renderSubmitElement",
        value: function() {
            this._$submitElement = (0, _renderer2.default)("<input>").attr("type", "hidden").appendTo(this.$element());
            this._setSubmitValue()
        }
    }, {
        key: "_setOptionsByReference",
        value: function() {
            _get(_getPrototypeOf(RadioGroup.prototype), "_setOptionsByReference", this).call(this);
            (0, _extend.extend)(this._optionsByReference, {
                value: true
            })
        }
    }, {
        key: "_setSubmitValue",
        value: function(value) {
            value = value || this.option("value");
            var submitValue = "this" === this.option("valueExpr") ? this._displayGetter(value) : value;
            this._$submitElement.val(submitValue)
        }
    }, {
        key: "_setCollectionWidgetOption",
        value: function() {
            this._areRadiosCreated.done(this._setWidgetOption.bind(this, "_radios", arguments))
        }
    }, {
        key: "_toggleActiveState",
        value: function($element, value, e) {
            _get(_getPrototypeOf(RadioGroup.prototype), "_toggleActiveState", this).call(this, $element, value, e);
            if (this._inkRipple) {
                var event = {
                    element: $element.find(".".concat(RADIO_BUTTON_ICON_CLASS)),
                    event: e
                };
                value ? this._inkRipple.showWave(event) : this._inkRipple.hideWave(event)
            }
        }
    }, {
        key: "_updateItemsSize",
        value: function() {
            if ("horizontal" === this.option("layout")) {
                this.itemElements().css("height", "auto")
            } else {
                var itemsCount = this.option("items").length;
                this.itemElements().css("height", 100 / itemsCount + "%")
            }
        }
    }, {
        key: "focus",
        value: function() {
            this._radios && this._radios.focus()
        }
    }, {
        key: "itemElements",
        value: function() {
            return this._radios.itemElements()
        }
    }]);
    return RadioGroup
}(_editor2.default);
RadioGroup.include(_ui2.default);
(0, _component_registrator2.default)("dxRadioGroup", RadioGroup);
module.exports = RadioGroup;
