/**
 * DevExtreme (mobile/init_mobile_viewport/init_mobile_viewport.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../../core/renderer");
var domAdapter = require("../../core/dom_adapter");
var windowUtils = require("../../core/utils/window");
var window = windowUtils.getWindow();
var eventsEngine = require("../../events/core/events_engine");
var extend = require("../../core/utils/extend").extend;
var resizeCallbacks = require("../../core/utils/resize_callbacks");
var support = require("../../core/utils/support");
var styleUtils = require("../../core/utils/style");
var devices = require("../../core/devices");
var initMobileViewport = function(options) {
    options = extend({}, options);
    var realDevice = devices.real();
    var allowZoom = options.allowZoom;
    var allowPan = options.allowPan;
    var allowSelection = "allowSelection" in options ? options.allowSelection : "generic" === realDevice.platform;
    var metaSelector = "meta[name=viewport]";
    if (!$(metaSelector).length) {
        $("<meta>").attr("name", "viewport").appendTo("head")
    }
    var metaVerbs = ["width=device-width"];
    var msTouchVerbs = [];
    if (allowZoom) {
        msTouchVerbs.push("pinch-zoom")
    } else {
        metaVerbs.push("initial-scale=1.0", "maximum-scale=1.0, user-scalable=no")
    }
    if (allowPan) {
        msTouchVerbs.push("pan-x", "pan-y")
    }
    if (!allowPan && !allowZoom) {
        $("html, body").css({
            msContentZooming: "none",
            msUserSelect: "none",
            overflow: "hidden"
        })
    } else {
        $("html").css("msOverflowStyle", "-ms-autohiding-scrollbar")
    }
    if (!allowSelection && support.supportProp("userSelect")) {
        $(".dx-viewport").css(styleUtils.styleProp("userSelect"), "none")
    }
    $(metaSelector).attr("content", metaVerbs.join());
    $("html").css("msTouchAction", msTouchVerbs.join(" ") || "none");
    realDevice = devices.real();
    if (support.touch) {
        eventsEngine.off(domAdapter.getDocument(), ".dxInitMobileViewport");
        eventsEngine.on(domAdapter.getDocument(), "dxpointermove.dxInitMobileViewport", function(e) {
            var count = e.pointers.length;
            var isTouchEvent = "touch" === e.pointerType;
            var zoomDisabled = !allowZoom && count > 1;
            var panDisabled = !allowPan && 1 === count && !e.isScrollingEvent;
            if (isTouchEvent && (zoomDisabled || panDisabled)) {
                e.preventDefault()
            }
        })
    }
    if (realDevice.ios) {
        var isPhoneGap = "file:" === domAdapter.getLocation().protocol;
        if (!isPhoneGap) {
            resizeCallbacks.add(function() {
                var windowWidth = $(window).width();
                $("body").width(windowWidth)
            })
        }
    }
    if (realDevice.android) {
        resizeCallbacks.add(function() {
            setTimeout(function() {
                var activeElement = domAdapter.getActiveElement();
                activeElement.scrollIntoViewIfNeeded ? activeElement.scrollIntoViewIfNeeded() : activeElement.scrollIntoView(false)
            })
        })
    }
};
exports.initMobileViewport = initMobileViewport;
