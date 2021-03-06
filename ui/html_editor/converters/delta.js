/**
 * DevExtreme (ui/html_editor/converters/delta.js)
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
var _converterController = require("../converterController");
var _converterController2 = _interopRequireDefault(_converterController);
var _quill_importer = require("../quill_importer");
var _type = require("../../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _toArray(arr) {
    return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest()
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(n)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) {
        return
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
                break
            }
        }
    } catch (err) {
        _d = true;
        _e = err
    } finally {
        try {
            if (!_n && null != _i.return) {
                _i.return()
            }
        } finally {
            if (_d) {
                throw _e
            }
        }
    }
    return _arr
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
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
var ESCAPING_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
};
var LIST_BLOT_NAME = "list";
var LIST_ITEM_BLOT_NAME = "list-item";
var DeltaConverter = function() {
    function DeltaConverter() {
        _classCallCheck(this, DeltaConverter);
        this.TextBlot = (0, _quill_importer.getQuill)().import("blots/text");
        this.BreakBlot = (0, _quill_importer.getQuill)().import("blots/break")
    }
    _createClass(DeltaConverter, [{
        key: "setQuillInstance",
        value: function(quillInstance) {
            this.quillInstance = quillInstance
        }
    }, {
        key: "toHtml",
        value: function() {
            if (!this.quillInstance) {
                return
            }
            return this._isQuillEmpty() ? "" : this._convertHTML(this.quillInstance.scroll, 0, this.quillInstance.getLength(), true)
        }
    }, {
        key: "_isQuillEmpty",
        value: function() {
            var delta = this.quillInstance.getContents();
            return 1 === delta.length() && this._isDeltaEmpty(delta)
        }
    }, {
        key: "_isDeltaEmpty",
        value: function(delta) {
            return delta.reduce(function(__, _ref) {
                var insert = _ref.insert;
                return insert.indexOf("\n") !== -1
            })
        }
    }, {
        key: "_convertHTML",
        value: function(blot, index, length) {
            var _this = this;
            var isRoot = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : false;
            if ((0, _type.isFunction)(blot.html)) {
                return blot.html(index, length)
            }
            if (blot instanceof this.TextBlot) {
                return this._escapeText(blot.value().slice(index, index + length))
            }
            if (blot.children) {
                if (blot.statics.blotName === LIST_BLOT_NAME) {
                    return this._convertList(blot, index, length)
                }
                var parts = [];
                blot.children.forEachAt(index, length, function(child, offset, childLength) {
                    parts.push(_this._convertHTML(child, offset, childLength))
                });
                this._handleBreakLine(blot.children, parts);
                if (isRoot || blot.statics.blotName === LIST_ITEM_BLOT_NAME) {
                    return parts.join("")
                }
                var _blot$domNode = blot.domNode,
                    outerHTML = _blot$domNode.outerHTML,
                    innerHTML = _blot$domNode.innerHTML;
                var _outerHTML$split = outerHTML.split(">".concat(innerHTML, "<")),
                    _outerHTML$split2 = _slicedToArray(_outerHTML$split, 2),
                    start = _outerHTML$split2[0],
                    end = _outerHTML$split2[1];
                return "".concat(start, ">").concat(parts.join(""), "<").concat(end)
            }
            return blot.domNode.outerHTML
        }
    }, {
        key: "_handleBreakLine",
        value: function(linkedList, parts) {
            if (1 === linkedList.length && linkedList.head instanceof this.BreakBlot) {
                parts.push("<br>")
            }
        }
    }, {
        key: "_convertList",
        value: function(blot, index, length) {
            var items = [];
            var parentFormats = blot.formats();
            blot.children.forEachAt(index, length, function(child, offset, childLength) {
                var childFormats = child.formats();
                items.push({
                    child: child,
                    offset: offset,
                    length: childLength,
                    indent: childFormats.indent || 0,
                    type: parentFormats.list
                })
            });
            return this._getListMarkup(items, -1, [], blot)
        }
    }, {
        key: "_getListMarkup",
        value: function(items, lastIndent, listTypes, listBlot) {
            if (0 === items.length) {
                var _endTag = this._getListType(listTypes.pop());
                if (lastIndent <= 0) {
                    return "</li></".concat(_endTag, ">")
                }
                return this._processListMarkup([
                    [], lastIndent - 1, listTypes
                ], _endTag)
            }
            var _items = _toArray(items),
                _items$ = _items[0],
                child = _items$.child,
                offset = _items$.offset,
                length = _items$.length,
                indent = _items$.indent,
                type = _items$.type,
                rest = _items.slice(1);
            var tag = this._getListType(type);
            var childItemArgs = [child, offset, length];
            var restItemsArgs = [rest, indent, listTypes];
            if (indent > lastIndent) {
                listTypes.push(type);
                var multiLevelTags = this._correctListMultiIndent(listTypes, type, tag, indent - lastIndent - 1);
                return multiLevelTags + this._processIndentListMarkup(childItemArgs, restItemsArgs, tag, listBlot)
            }
            if (indent === lastIndent) {
                return this._processIndentListMarkup(childItemArgs, restItemsArgs)
            }
            var endTag = this._getListType(listTypes.pop());
            return this._processListMarkup([items, lastIndent - 1, listTypes], endTag)
        }
    }, {
        key: "_correctListMultiIndent",
        value: function(listTypes, type, tag, indent) {
            var markup = "";
            while (indent) {
                markup += "<".concat(tag, ">");
                listTypes.push(type);
                indent--
            }
            return markup
        }
    }, {
        key: "_processListMarkup",
        value: function(childItemArgs, tag) {
            return "</li></".concat(tag, ">").concat(this._getListMarkup.apply(this, _toConsumableArray(childItemArgs)))
        }
    }, {
        key: "_processIndentListMarkup",
        value: function(childItemArgs, restItemsArgs) {
            var tag = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "/li";
            var listBlot = arguments.length > 3 ? arguments[3] : void 0;
            var listAttrs = listBlot && this._getBlotNodeAttributes(listBlot) || "";
            var itemAttrs = this._getBlotNodeAttributes(childItemArgs[0]);
            return "<".concat(tag).concat(listAttrs, "><li").concat(itemAttrs, ">").concat(this._convertHTML.apply(this, _toConsumableArray(childItemArgs))).concat(this._getListMarkup.apply(this, _toConsumableArray(restItemsArgs).concat([listBlot])))
        }
    }, {
        key: "_getBlotNodeAttributes",
        value: function(_ref2) {
            var domNode = _ref2.domNode;
            if (!domNode.hasAttributes()) {
                return ""
            }
            var attributes = domNode.attributes;
            var attributesString = " ";
            for (var i = 0; i < attributes.length; i++) {
                var _attributes$i = attributes[i],
                    name = _attributes$i.name,
                    value = _attributes$i.value;
                if ("class" === name) {
                    value = this._removeIndentClass(value)
                }
                if (value.length) {
                    attributesString += "".concat(name, '="').concat(value, '"')
                }
            }
            return attributesString.length > 1 ? attributesString : ""
        }
    }, {
        key: "_getListType",
        value: function(type) {
            return "ordered" === type ? "ol" : "ul"
        }
    }, {
        key: "_removeIndentClass",
        value: function(classString) {
            return classString.replace(/ql-indent-\d/g, "").trim()
        }
    }, {
        key: "_escapeText",
        value: function(text) {
            return text.replace(/[&<>"']/g, function(char) {
                return ESCAPING_MAP[char]
            })
        }
    }]);
    return DeltaConverter
}();
_converterController2.default.addConverter("delta", DeltaConverter);
exports.default = DeltaConverter;
