/**
 * DevExtreme (ui/button.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _devices = require("../core/devices");
var _devices2 = _interopRequireDefault(_devices);
var _utils = require("./widget/utils.ink_ripple");
var _utils2 = _interopRequireDefault(_utils);
var _component_registrator = require("../core/component_registrator");
var _component_registrator2 = _interopRequireDefault(_component_registrator);
var _themes = require("./themes");
var _themes2 = _interopRequireDefault(_themes);
var _action = require("../core/action");
var _action2 = _interopRequireDefault(_action);
var _validation_engine = require("./validation_engine");
var _validation_engine2 = _interopRequireDefault(_validation_engine);
var _ui = require("./widget/ui.widget");
var _ui2 = _interopRequireDefault(_ui);
var _short = require("../events/short");
var _extend = require("../core/utils/extend");
var _function_template = require("../core/templates/function_template");
var _icon = require("../core/utils/icon");
var _dom = require("../core/utils/dom");

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
var ANONYMOUS_TEMPLATE_NAME = "content";
var Button = function(_Widget) {
    _inherits(Button, _Widget);
    var _super = _createSuper(Button);

    function Button() {
        var _this;
        _classCallCheck(this, Button);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _this._feedbackHideTimeout = 100;
        return _this
    }
    _createClass(Button, [{
        key: "_$content",
        value: function() {
            return this.$element().find(".dx-button-content")
        }
    }, {
        key: "_$submitInput",
        value: function() {
            return this.$element().find(".dx-button-submit-input")
        }
    }, {
        key: "_attachActiveEvents",
        value: function(active, inactive) {
            var $el = this._eventBindingTarget();
            var namespace = "inkRipple";
            var selector = this._activeStateUnit;
            _short.active.off($el, {
                namespace: namespace,
                selector: selector
            });
            _short.active.on($el, new _action2.default(active), new _action2.default(inactive, {
                excludeValidators: ["disabled", "readOnly"]
            }), {
                showTimeout: this._feedbackShowTimeout,
                hideTimeout: this._feedbackHideTimeout,
                selector: selector,
                namespace: namespace
            })
        }
    }, {
        key: "_defaultOptionsRules",
        value: function() {
            return _get(_getPrototypeOf(Button.prototype), "_defaultOptionsRules", this).call(this).concat([{
                device: function() {
                    return "desktop" === _devices2.default.real().deviceType && !_devices2.default.isSimulator()
                },
                options: {
                    focusStateEnabled: true
                }
            }, {
                device: function() {
                    return _themes2.default.isMaterial(_themes2.default.current())
                },
                options: {
                    useInkRipple: true
                }
            }])
        }
    }, {
        key: "_executeClickAction",
        value: function(event) {
            this._clickAction({
                validationGroup: this._validationGroupConfig,
                event: event
            })
        }
    }, {
        key: "_findGroup",
        value: function() {
            var $element = this.$element();
            var model = this._modelByElement($element);
            var _this$option = this.option(),
                validationGroup = _this$option.validationGroup;
            return validationGroup || _validation_engine2.default.findGroup($element, model)
        }
    }, {
        key: "_getContentData",
        value: function() {
            var _this$option2 = this.option(),
                icon = _this$option2.icon,
                text = _this$option2.text,
                type = _this$option2.type,
                _templateData = _this$option2._templateData;
            return (0, _extend.extend)({
                icon: "back" === type && !icon ? "back" : icon,
                text: text
            }, _templateData)
        }
    }, {
        key: "_getDefaultOptions",
        value: function() {
            return (0, _extend.extend)(_get(_getPrototypeOf(Button.prototype), "_getDefaultOptions", this).call(this), {
                hoverStateEnabled: true,
                onClick: null,
                type: "normal",
                text: "",
                icon: "",
                iconPosition: "left",
                validationGroup: void 0,
                activeStateEnabled: true,
                template: "content",
                useSubmitBehavior: false,
                useInkRipple: false,
                _templateData: {},
                stylingMode: "contained"
            })
        }
    }, {
        key: "_getSubmitAction",
        value: function() {
            var _this2 = this;
            var needValidate = true;
            var validationStatus = "valid";
            return this._createAction(function(_ref) {
                var event = _ref.event;
                if (needValidate) {
                    var validationGroup = _this2._validationGroupConfig;
                    if (validationGroup) {
                        var _validationGroup$vali = validationGroup.validate(),
                            status = _validationGroup$vali.status,
                            complete = _validationGroup$vali.complete;
                        validationStatus = status;
                        if ("pending" === status) {
                            needValidate = false;
                            _this2.option("disabled", true);
                            complete.then(function(_ref2) {
                                var status = _ref2.status;
                                needValidate = true;
                                _this2.option("disabled", false);
                                validationStatus = status;
                                "valid" === validationStatus && _this2._submitInput().click()
                            })
                        }
                    }
                }
                "valid" !== validationStatus && event.preventDefault();
                event.stopPropagation()
            })
        }
    }, {
        key: "_initMarkup",
        value: function() {
            this.$element().addClass("dx-button");
            this._renderType();
            this._renderStylingMode();
            this._renderInkRipple();
            this._renderClick();
            this._updateAriaLabel();
            _get(_getPrototypeOf(Button.prototype), "_initMarkup", this).call(this);
            this._updateContent();
            this._renderSubmitInput();
            this.setAria("role", "button")
        }
    }, {
        key: "_getAnonymousTemplateName",
        value: function() {
            return ANONYMOUS_TEMPLATE_NAME
        }
    }, {
        key: "_initTemplates",
        value: function() {
            var _this3 = this;
            this._templateManager.addDefaultTemplates({
                content: new _function_template.FunctionTemplate(function(_ref3) {
                    var _ref3$model = _ref3.model,
                        model = void 0 === _ref3$model ? {} : _ref3$model,
                        container = _ref3.container;
                    var text = model.text,
                        icon = model.icon;
                    var _this3$option = _this3.option(),
                        iconPosition = _this3$option.iconPosition;
                    var $icon = (0, _icon.getImageContainer)(icon);
                    var $textContainer = text && (0, _renderer2.default)("<span>").text(text).addClass("dx-button-text");
                    var $container = (0, _renderer2.default)(container);
                    $container.append($textContainer);
                    if ("left" === iconPosition) {
                        $container.prepend($icon)
                    } else {
                        $icon.addClass("dx-icon-right");
                        $container.append($icon)
                    }
                })
            });
            _get(_getPrototypeOf(Button.prototype), "_initTemplates", this).call(this)
        }
    }, {
        key: "_optionChanged",
        value: function(args) {
            var name = args.name,
                previousValue = args.previousValue;
            switch (name) {
                case "onClick":
                    this._updateClick();
                    break;
                case "icon":
                case "text":
                    this._updateContent();
                    this._updateAriaLabel();
                    break;
                case "type":
                    this._updateType(previousValue);
                    this._updateContent();
                    break;
                case "_templateData":
                    break;
                case "template":
                case "iconPosition":
                    this._updateContent();
                    break;
                case "stylingMode":
                    this._updateStylingMode();
                    break;
                case "useSubmitBehavior":
                    this._updateSubmitInput();
                    break;
                case "useInkRipple":
                    this._invalidate();
                    break;
                default:
                    _get(_getPrototypeOf(Button.prototype), "_optionChanged", this).call(this, args)
            }
        }
    }, {
        key: "_renderClick",
        value: function() {
            var _this4 = this;
            var $el = this.$element();
            _short.dxClick.off($el, {
                namespace: this.NAME
            });
            _short.dxClick.on($el, function(event) {
                return _this4._executeClickAction(event)
            }, {
                namespace: this.NAME
            });
            this._updateClick()
        }
    }, {
        key: "_renderInkRipple",
        value: function() {
            var _this5 = this;
            var _this$option3 = this.option(),
                text = _this$option3.text,
                icon = _this$option3.icon,
                type = _this$option3.type,
                useInkRipple = _this$option3.useInkRipple;
            if (useInkRipple) {
                var isOnlyIconButton = !text && icon || "back" === type;
                var _inkRipple = _utils2.default.render(isOnlyIconButton ? {
                    waveSizeCoefficient: 1,
                    useHoldAnimation: false,
                    isCentered: true
                } : {});
                var changeWaveVisibility = function(event, visible) {
                    var _this5$option = _this5.option(),
                        activeStateEnabled = _this5$option.activeStateEnabled,
                        useInkRipple = _this5$option.useInkRipple;
                    if (useInkRipple && activeStateEnabled && !_this5._disposed) {
                        var config = {
                            element: _this5._$content(),
                            event: event
                        };
                        visible ? _inkRipple.showWave(config) : _inkRipple.hideWave(config)
                    }
                };
                this._attachActiveEvents(function(_ref4) {
                    var event = _ref4.event;
                    return changeWaveVisibility(event, true)
                }, function(_ref5) {
                    var event = _ref5.event;
                    return changeWaveVisibility(event)
                })
            }
        }
    }, {
        key: "_renderStylingMode",
        value: function() {
            var $element = this.$element();
            var _this$option4 = this.option(),
                stylingMode = _this$option4.stylingMode;
            if (["contained", "text", "outlined"].indexOf(stylingMode) === -1) {
                stylingMode = this._getDefaultOptions().stylingMode
            }
            $element.addClass("dx-button-mode-".concat(stylingMode))
        }
    }, {
        key: "_renderSubmitInput",
        value: function() {
            var _this$option5 = this.option(),
                useSubmitBehavior = _this$option5.useSubmitBehavior;
            if (useSubmitBehavior) {
                var submitAction = this._getSubmitAction();
                var $content = this._$content();
                (0, _renderer2.default)("<input>").attr("type", "submit").attr("tabindex", -1).addClass("dx-button-submit-input").appendTo($content);
                _short.click.on(this._$submitInput(), function(event) {
                    return submitAction({
                        event: event
                    })
                })
            }
        }
    }, {
        key: "_renderType",
        value: function() {
            var _this$option6 = this.option(),
                type = _this$option6.type;
            var $element = this.$element();
            type && $element.addClass("dx-button-".concat(type))
        }
    }, {
        key: "_submitInput",
        value: function() {
            return this._$submitInput().get(0)
        }
    }, {
        key: "_supportedKeys",
        value: function() {
            var _this6 = this;
            var click = function(e) {
                e.preventDefault();
                _this6._executeClickAction(e)
            };
            return (0, _extend.extend)(_get(_getPrototypeOf(Button.prototype), "_supportedKeys", this).call(this), {
                space: click,
                enter: click
            })
        }
    }, {
        key: "_updateAriaLabel",
        value: function() {
            var ariaTarget = this._getAriaTarget();
            var _this$option7 = this.option(),
                icon = _this$option7.icon,
                text = _this$option7.text;
            if (!text) {
                if ("image" === (0, _icon.getImageSourceType)(icon)) {
                    icon = icon.indexOf("base64") === -1 ? icon.replace(/.+\/([^.]+)\..+$/, "$1") : "Base64"
                }
                text = icon || ""
            }
            ariaTarget.attr("aria-label", text.trim() || null)
        }
    }, {
        key: "_updateClick",
        value: function() {
            var _this7 = this;
            this._clickAction = this._createActionByOption("onClick", {
                excludeValidators: ["readOnly"],
                afterExecute: function() {
                    var _this7$option = _this7.option(),
                        useSubmitBehavior = _this7$option.useSubmitBehavior;
                    useSubmitBehavior && setTimeout(function() {
                        return _this7._submitInput().click()
                    })
                }
            })
        }
    }, {
        key: "_updateContent",
        value: function() {
            var $element = this.$element();
            var $content = this._$content();
            var data = this._getContentData();
            var _this$option8 = this.option(),
                template = _this$option8.template,
                iconPosition = _this$option8.iconPosition;
            var icon = data.icon,
                text = data.text;
            $content.length ? $content.empty() : $content = (0, _renderer2.default)("<div>").addClass("dx-button-content").appendTo($element);
            $element.toggleClass("dx-button-has-icon", !!icon).toggleClass("dx-button-icon-right", !!icon && "left" !== iconPosition).toggleClass("dx-button-has-text", !!text);
            var $template = (0, _renderer2.default)(this._getTemplateByOption("template").render({
                model: data,
                container: (0, _dom.getPublicElement)($content),
                transclude: this._templateManager.anonymousTemplateName === template
            }));
            if ($template.hasClass("dx-template-wrapper")) {
                $template.addClass("dx-button-content");
                $content.replaceWith($template)
            }
        }
    }, {
        key: "_updateSubmitInput",
        value: function() {
            var _this$option9 = this.option(),
                useSubmitBehavior = _this$option9.useSubmitBehavior;
            var $submitInput = this._$submitInput();
            if (!useSubmitBehavior && $submitInput.length) {
                $submitInput.remove()
            } else {
                if (useSubmitBehavior && !$submitInput.length) {
                    this._renderSubmitInput()
                }
            }
        }
    }, {
        key: "_updateStylingMode",
        value: function() {
            var $element = this.$element();
            ["contained", "text", "outlined"].map(function(mode) {
                return "dx-button-mode-".concat(mode)
            }).forEach($element.removeClass.bind($element));
            this._renderStylingMode()
        }
    }, {
        key: "_updateType",
        value: function(previous) {
            var $element = this.$element();
            [previous, "back", "danger", "default", "normal", "success"].map(function(type) {
                return "dx-button-".concat(type)
            }).forEach($element.removeClass.bind($element));
            this._renderType()
        }
    }, {
        key: "_validationGroupConfig",
        get: function() {
            return _validation_engine2.default.getGroupConfig(this._findGroup())
        }
    }]);
    return Button
}(_ui2.default);
(0, _component_registrator2.default)("dxButton", Button);
module.exports = Button;
module.exports.default = module.exports;
