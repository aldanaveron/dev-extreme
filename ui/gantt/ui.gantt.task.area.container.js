/**
 * DevExtreme (ui/gantt/ui.gantt.task.area.container.js)
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
exports.TaskAreaContainer = void 0;
var _scroll_view = require("../scroll_view");
var _scroll_view2 = _interopRequireDefault(_scroll_view);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
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
var TaskAreaContainer = exports.TaskAreaContainer = function() {
    function TaskAreaContainer(element, ganttViewWidget) {
        _classCallCheck(this, TaskAreaContainer);
        this._element = element;
        this._scrollView = ganttViewWidget._createComponent(this._element, _scroll_view2.default, {
            scrollByContent: false,
            scrollByThumb: true,
            showScrollbar: "onHover",
            direction: "both",
            onScroll: function() {
                ganttViewWidget.updateView()
            }
        })
    }
    _createClass(TaskAreaContainer, [{
        key: "getWidth",
        value: function() {
            return this._element.offsetWidth
        }
    }, {
        key: "getHeight",
        value: function() {
            return this._element.offsetHeight
        }
    }, {
        key: "getElement",
        value: function() {
            return this._element
        }
    }, {
        key: "scrollTop",
        get: function() {
            return this._scrollView.scrollTop()
        },
        set: function(value) {
            var diff = value - this._scrollView.scrollTop();
            if (0 !== diff) {
                this._scrollView.scrollBy({
                    left: 0,
                    top: diff
                })
            }
        }
    }, {
        key: "scrollLeft",
        get: function() {
            return this._scrollView.scrollLeft()
        },
        set: function(value) {
            var diff = value - this._scrollView.scrollLeft();
            if (0 !== diff) {
                this._scrollView.scrollBy({
                    left: diff,
                    top: 0
                })
            }
        }
    }, {
        key: "scrollWidth",
        get: function() {
            return this._scrollView.scrollWidth()
        }
    }, {
        key: "scrollHeight",
        get: function() {
            return this._scrollView.scrollHeight()
        }
    }, {
        key: "isExternal",
        get: function() {
            return true
        }
    }]);
    return TaskAreaContainer
}();
