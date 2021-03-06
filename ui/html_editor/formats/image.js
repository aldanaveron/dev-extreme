/**
 * DevExtreme (ui/html_editor/formats/image.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _quill = require("quill");
var _quill2 = _interopRequireDefault(_quill);
var _type = require("../../../core/utils/type");

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
var ExtImage = {};
if (_quill2.default) {
    var Image = _quill2.default.import("formats/image");
    ExtImage = function(_Image) {
        _inherits(ExtImage, _Image);
        var _super = _createSuper(ExtImage);

        function ExtImage() {
            _classCallCheck(this, ExtImage);
            return _super.apply(this, arguments)
        }
        _createClass(ExtImage, [{
            key: "formats",
            value: function formats() {
                var formats = _get(_getPrototypeOf(ExtImage.prototype), "formats", this).call(this);
                var floatValue = this.domNode.style.float;
                if (floatValue) {
                    formats.float = floatValue
                }
                return formats
            }
        }, {
            key: "format",
            value: function(name, value) {
                if ("float" === name) {
                    this.domNode.style[name] = value
                } else {
                    _get(_getPrototypeOf(ExtImage.prototype), "format", this).call(this, name, value)
                }
            }
        }], [{
            key: "create",
            value: function(data) {
                var SRC = data && data.src || data;
                var node = _get(_getPrototypeOf(ExtImage), "create", this).call(this, SRC);
                if ((0, _type.isObject)(data)) {
                    var setAttribute = function(attr, value) {
                        data[attr] && node.setAttribute(attr, value)
                    };
                    setAttribute("alt", data.alt);
                    setAttribute("width", data.width);
                    setAttribute("height", data.height)
                }
                return node
            }
        }, {
            key: "formats",
            value: function formats(domNode) {
                var formats = _get(_getPrototypeOf(ExtImage), "formats", this).call(this, domNode);
                formats.imageSrc = domNode.getAttribute("src");
                return formats
            }
        }, {
            key: "value",
            value: function(domNode) {
                return {
                    src: domNode.getAttribute("src"),
                    width: domNode.getAttribute("width"),
                    height: domNode.getAttribute("height"),
                    alt: domNode.getAttribute("alt")
                }
            }
        }]);
        return ExtImage
    }(Image);
    ExtImage.blotName = "extendedImage"
}
exports.default = ExtImage;
