/**
 * DevExtreme (ui/html_editor/modules/mentions.js)
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
var _renderer = require("../../../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _quill = require("quill");
var _quill2 = _interopRequireDefault(_quill);
var _data = require("../../../core/utils/data");
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
var _dom = require("../../../core/utils/dom");
var _events_engine = require("../../../events/core/events_engine");
var _popup = require("./popup");
var _popup2 = _interopRequireDefault(_popup);
var _mention = require("../formats/mention");
var _mention2 = _interopRequireDefault(_mention);

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

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    };
    return _getPrototypeOf(o)
}
var MentionModule = {};
if (_quill2.default) {
    var USER_ACTION = "user";
    var SILENT_ACTION = "silent";
    var DEFAULT_MARKER = "@";
    var KEY_CODES = {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        ARROW_LEFT: 37,
        ARROW_RIGHT: 39,
        ENTER: 13,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36
    };
    var NAVIGATION_KEYS = [KEY_CODES.ARROW_LEFT, KEY_CODES.ARROW_RIGHT, KEY_CODES.PAGE_UP, KEY_CODES.PAGE_DOWN, KEY_CODES.END, KEY_CODES.HOME];
    var ALLOWED_PREFIX_CHARS = [" ", "\n"];
    var DISABLED_STATE_CLASS = "dx-state-disabled";
    _quill2.default.register({
        "formats/mention": _mention2.default
    }, true);
    MentionModule = function(_PopupModule) {
        _inherits(MentionModule, _PopupModule);
        var _super = _createSuper(MentionModule);
        _createClass(MentionModule, [{
            key: "_getDefaultOptions",
            value: function() {
                var baseConfig = _get(_getPrototypeOf(MentionModule.prototype), "_getDefaultOptions", this).call(this);
                return (0, _extend.extend)(baseConfig, {
                    itemTemplate: "item",
                    valueExpr: "this",
                    displayExpr: "this",
                    template: null,
                    searchExpr: null,
                    searchTimeout: 500,
                    minSearchLength: 0
                })
            }
        }]);

        function MentionModule(quill, options) {
            var _this;
            _classCallCheck(this, MentionModule);
            _this = _super.call(this, quill, options);
            _this._mentions = {};
            _this.editorInstance = options.editorInstance;
            options.mentions.forEach(function(item) {
                var marker = item.marker,
                    template = item.template;
                if (!marker) {
                    item.marker = marker = DEFAULT_MARKER
                }
                if (template) {
                    var preparedTemplate = _this.editorInstance._getTemplate(template);
                    preparedTemplate && _mention2.default.addTemplate(marker, preparedTemplate)
                }
                _this._mentions[marker] = (0, _extend.extend)({}, _this._getDefaultOptions(), item)
            });
            _this._attachKeyboardHandlers();
            _this.editorInstance.addCleanCallback(_this.clean.bind(_assertThisInitialized(_this)));
            _this.quill.on("text-change", _this.onTextChange.bind(_assertThisInitialized(_this)));
            return _this
        }
        _createClass(MentionModule, [{
            key: "_attachKeyboardHandlers",
            value: function() {
                var _this2 = this;
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.ARROW_UP
                }, this._moveToItem.bind(this, "prev"));
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.ARROW_DOWN
                }, this._moveToItem.bind(this, "next"));
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.ENTER
                }, this._selectItemHandler.bind(this));
                var enterBindings = this.quill.keyboard.bindings[KEY_CODES.ENTER];
                enterBindings.unshift(enterBindings.pop());
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.ESCAPE
                }, this._escapeKeyHandler.bind(this));
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.SPACE
                }, this._selectItemHandler.bind(this));
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.ARROW_LEFT,
                    shiftKey: true
                }, this._ignoreKeyHandler.bind(this));
                this.quill.keyboard.addBinding({
                    key: KEY_CODES.ARROW_RIGHT,
                    shiftKey: true
                }, this._ignoreKeyHandler.bind(this));
                NAVIGATION_KEYS.forEach(function(key) {
                    _this2.quill.keyboard.addBinding({
                        key: key
                    }, _this2._ignoreKeyHandler.bind(_this2))
                })
            }
        }, {
            key: "_moveToItem",
            value: function(direction) {
                var dataSource = this._list.getDataSource();
                if (this._isMentionActive && !dataSource.isLoading()) {
                    var $focusedItem = (0, _renderer2.default)(this._list.option("focusedElement"));
                    var defaultItemPosition = "next" === direction ? "first" : "last";
                    var $nextItem = $focusedItem[direction]();
                    $nextItem = $nextItem.length ? $nextItem : this._activeListItems[defaultItemPosition]();
                    this._list.option("focusedElement", (0, _dom.getPublicElement)($nextItem));
                    this._list.scrollToItem($nextItem)
                }
                return !this._isMentionActive
            }
        }, {
            key: "_ignoreKeyHandler",
            value: function() {
                return !this._isMentionActive
            }
        }, {
            key: "_fitIntoRange",
            value: function(value, start, end) {
                if (value > end) {
                    return start
                }
                if (value < start) {
                    return end
                }
                return value
            }
        }, {
            key: "_selectItemHandler",
            value: function() {
                if (this._isMentionActive) {
                    this._list.selectItem(this._list.option("focusedElement"))
                }
                return !this._isMentionActive
            }
        }, {
            key: "_escapeKeyHandler",
            value: function() {
                if (this._isMentionActive) {
                    this._popup.hide()
                }
                return !this._isMentionActive
            }
        }, {
            key: "renderList",
            value: function($container, options) {
                this.compileGetters(this.options);
                _get(_getPrototypeOf(MentionModule.prototype), "renderList", this).call(this, $container, options)
            }
        }, {
            key: "compileGetters",
            value: function(_ref) {
                var displayExpr = _ref.displayExpr,
                    valueExpr = _ref.valueExpr;
                this._valueGetter = (0, _data.compileGetter)(displayExpr);
                this._idGetter = (0, _data.compileGetter)(valueExpr)
            }
        }, {
            key: "_getListConfig",
            value: function(options) {
                var _this3 = this;
                var baseConfig = _get(_getPrototypeOf(MentionModule.prototype), "_getListConfig", this).call(this, options);
                return (0, _extend.extend)(baseConfig, {
                    itemTemplate: this.options.itemTemplate,
                    onContentReady: function() {
                        if (_this3._hasSearch) {
                            _this3._popup.repaint();
                            _this3._focusFirstElement();
                            _this3._hasSearch = false
                        }
                    }
                })
            }
        }, {
            key: "insertEmbedContent",
            value: function() {
                var markerLength = this._activeMentionConfig.marker.length;
                var textLength = markerLength + this._searchValue.length;
                var caretPosition = this.getPosition();
                var startIndex = Math.max(0, caretPosition - markerLength);
                var selectedItem = this._list.option("selectedItem");
                var value = {
                    value: this._valueGetter(selectedItem),
                    id: this._idGetter(selectedItem),
                    marker: this._activeMentionConfig.marker
                };
                setTimeout(function() {
                    this.quill.insertText(startIndex, " ", SILENT_ACTION);
                    this.quill.deleteText(startIndex + 1, textLength, SILENT_ACTION);
                    this.quill.insertEmbed(startIndex, "mention", value);
                    this.quill.setSelection(startIndex + 2)
                }.bind(this))
            }
        }, {
            key: "_getLastInsertOperation",
            value: function(ops) {
                var lastOperation = ops[ops.length - 1];
                var isLastOperationInsert = "insert" in lastOperation;
                if (isLastOperationInsert) {
                    return lastOperation
                }
                var isLastOperationDelete = "delete" in lastOperation;
                if (isLastOperationDelete && ops.length >= 2) {
                    var penultOperation = ops[ops.length - 2];
                    var isPenultOperationInsert = "insert" in penultOperation;
                    var isSelectionReplacing = isLastOperationDelete && isPenultOperationInsert;
                    if (isSelectionReplacing) {
                        return penultOperation
                    }
                }
                return null
            }
        }, {
            key: "onTextChange",
            value: function(newDelta, oldDelta, source) {
                if (source === USER_ACTION) {
                    var lastOperation = newDelta.ops[newDelta.ops.length - 1];
                    if (this._isMentionActive) {
                        this._processSearchValue(lastOperation) && this._filterList(this._searchValue)
                    } else {
                        var ops = newDelta.ops;
                        var lastInsertOperation = this._getLastInsertOperation(ops);
                        if (lastInsertOperation) {
                            this.checkMentionRequest(lastInsertOperation, ops)
                        }
                    }
                }
            }
        }, {
            key: "_processSearchValue",
            value: function(operation) {
                var isInsertOperation = "insert" in operation;
                if (isInsertOperation) {
                    this._searchValue += operation.insert
                } else {
                    if (!this._searchValue.length) {
                        this._popup.hide();
                        return false
                    } else {
                        this._searchValue = this._searchValue.slice(0, -1)
                    }
                }
                return true
            }
        }, {
            key: "checkMentionRequest",
            value: function(_ref2, ops) {
                var insert = _ref2.insert;
                var caret = this.quill.getSelection();
                if (!insert || !(0, _type.isString)(insert) || !caret || this._isMarkerPartOfText(ops[0].retain)) {
                    return
                }
                this._activeMentionConfig = this._mentions[insert];
                if (this._activeMentionConfig) {
                    this._updateList(this._activeMentionConfig);
                    this.savePosition(caret.index);
                    this._popup.option("position", this._popupPosition);
                    this._searchValue = "";
                    this._popup.show()
                }
            }
        }, {
            key: "_isMarkerPartOfText",
            value: function(retain) {
                if (!retain || ALLOWED_PREFIX_CHARS.indexOf(this._getCharByIndex(retain - 1)) !== -1) {
                    return false
                }
                return true
            }
        }, {
            key: "_getCharByIndex",
            value: function(index) {
                return this.quill.getContents(index, 1).ops[0].insert
            }
        }, {
            key: "_updateList",
            value: function(_ref3) {
                var dataSource = _ref3.dataSource,
                    displayExpr = _ref3.displayExpr,
                    valueExpr = _ref3.valueExpr,
                    itemTemplate = _ref3.itemTemplate,
                    searchExpr = _ref3.searchExpr;
                this.compileGetters({
                    displayExpr: displayExpr,
                    valueExpr: valueExpr
                });
                this._list.unselectAll();
                this._list.option({
                    dataSource: dataSource,
                    displayExpr: displayExpr,
                    itemTemplate: itemTemplate,
                    searchExpr: searchExpr
                })
            }
        }, {
            key: "_filterList",
            value: function(searchValue) {
                var _this4 = this;
                if (!this._isMinSearchLengthExceeded(searchValue)) {
                    this._resetFilter();
                    return
                }
                var searchTimeout = this._activeMentionConfig.searchTimeout;
                if (searchTimeout) {
                    clearTimeout(this._searchTimer);
                    this._searchTimer = setTimeout(function() {
                        _this4._search(searchValue)
                    }, searchTimeout)
                } else {
                    this._search(searchValue)
                }
            }
        }, {
            key: "_isMinSearchLengthExceeded",
            value: function(searchValue) {
                return searchValue.length >= this._activeMentionConfig.minSearchLength
            }
        }, {
            key: "_resetFilter",
            value: function() {
                clearTimeout(this._searchTimer);
                this._search(null)
            }
        }, {
            key: "_search",
            value: function(searchValue) {
                this._hasSearch = true;
                this._list.option("searchValue", searchValue)
            }
        }, {
            key: "_focusFirstElement",
            value: function() {
                if (!this._list) {
                    return
                }
                var $firstItem = this._activeListItems.first();
                this._list.option("focusedElement", (0, _dom.getPublicElement)($firstItem));
                this._list.scrollToItem($firstItem)
            }
        }, {
            key: "_getPopupConfig",
            value: function() {
                var _this5 = this;
                return (0, _extend.extend)(_get(_getPrototypeOf(MentionModule.prototype), "_getPopupConfig", this).call(this), {
                    closeOnTargetScroll: false,
                    onShown: function() {
                        _this5._isMentionActive = true;
                        _this5._hasSearch = false;
                        _this5._focusFirstElement()
                    },
                    onHidden: function() {
                        _this5._list.unselectAll();
                        _this5._list.option("focusedElement", null);
                        _this5._isMentionActive = false;
                        _this5._search(null)
                    },
                    focusStateEnabled: false
                })
            }
        }, {
            key: "clean",
            value: function() {
                var _this6 = this;
                Object.keys(this._mentions).forEach(function(marker) {
                    if (_this6._mentions[marker].template) {
                        _mention2.default.removeTemplate(marker)
                    }
                })
            }
        }, {
            key: "_popupPosition",
            get: function() {
                var position = this.getPosition();
                var _this$quill$getBounds = this.quill.getBounds(position ? position - 1 : position),
                    mentionLeft = _this$quill$getBounds.left,
                    mentionTop = _this$quill$getBounds.top,
                    mentionHeight = _this$quill$getBounds.height;
                var _$$offset = (0, _renderer2.default)(this.quill.root).offset(),
                    leftOffset = _$$offset.left,
                    topOffset = _$$offset.top;
                var positionEvent = (0, _events_engine.Event)("positionEvent", {
                    pageX: leftOffset + mentionLeft,
                    pageY: topOffset + mentionTop
                });
                return {
                    of: positionEvent,
                    offset: {
                        v: mentionHeight
                    },
                    my: "top left",
                    at: "top left",
                    collision: {
                        y: "flip",
                        x: "flipfit"
                    }
                }
            }
        }, {
            key: "_activeListItems",
            get: function() {
                return this._list.itemElements().filter(":not(.".concat(DISABLED_STATE_CLASS, ")"))
            }
        }]);
        return MentionModule
    }(_popup2.default)
}
exports.default = MentionModule;
