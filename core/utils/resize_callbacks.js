/**
 * DevExtreme (core/utils/resize_callbacks.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var windowUtils = require("./window");
var domAdapter = require("../dom_adapter");
var Callbacks = require("./callbacks");
var readyCallbacks = require("./ready_callbacks");
var callOnce = require("./call_once");
var resizeCallbacks = function() {
    var prevSize;
    var callbacks = Callbacks();
    var originalCallbacksAdd = callbacks.add;
    var originalCallbacksRemove = callbacks.remove;
    if (!windowUtils.hasWindow()) {
        return callbacks
    }
    var formatSize = function() {
        var window = windowUtils.getWindow();
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
    var handleResize = function() {
        var now = formatSize();
        if (now.width === prevSize.width && now.height === prevSize.height) {
            return
        }
        var changedDimension;
        if (now.width === prevSize.width) {
            changedDimension = "height"
        }
        if (now.height === prevSize.height) {
            changedDimension = "width"
        }
        prevSize = now;
        callbacks.fire(changedDimension)
    };
    var setPrevSize = callOnce(function() {
        prevSize = formatSize()
    });
    var removeListener;
    callbacks.add = function() {
        var result = originalCallbacksAdd.apply(callbacks, arguments);
        setPrevSize();
        readyCallbacks.add(function() {
            if (!removeListener && callbacks.has()) {
                removeListener = domAdapter.listen(windowUtils.getWindow(), "resize", handleResize)
            }
        });
        return result
    };
    callbacks.remove = function() {
        var result = originalCallbacksRemove.apply(callbacks, arguments);
        if (!callbacks.has() && removeListener) {
            removeListener();
            removeListener = void 0
        }
        return result
    };
    return callbacks
}();
module.exports = resizeCallbacks;
