/**
 * DevExtreme (core/utils/browser.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var extend = require("./extend").extend;
var windowUtils = require("./window");
var navigator = windowUtils.getNavigator();
var webkitRegExp = /(webkit)[ /]([\w.]+)/;
var ieRegExp = /(msie) (\d{1,2}\.\d)/;
var ie11RegExp = /(trident).*rv:(\d{1,2}\.\d)/;
var msEdge = /(edge)\/((\d+)?[\w.]+)/;
var mozillaRegExp = /(mozilla)(?:.*? rv:([\w.]+))/;
var browserFromUA = function(ua) {
    ua = ua.toLowerCase();
    var result = {};
    var matches = ieRegExp.exec(ua) || ie11RegExp.exec(ua) || msEdge.exec(ua) || ua.indexOf("compatible") < 0 && mozillaRegExp.exec(ua) || webkitRegExp.exec(ua) || [];
    var browserName = matches[1];
    var browserVersion = matches[2];
    if ("webkit" === browserName) {
        result.webkit = true;
        if (ua.indexOf("chrome") >= 0 || ua.indexOf("crios") >= 0) {
            browserName = "chrome";
            browserVersion = /(?:chrome|crios)\/(\d+\.\d+)/.exec(ua);
            browserVersion = browserVersion && browserVersion[1]
        } else {
            if (ua.indexOf("fxios") >= 0) {
                browserName = "mozilla";
                browserVersion = /fxios\/(\d+\.\d+)/.exec(ua);
                browserVersion = browserVersion && browserVersion[1]
            } else {
                if (ua.indexOf("safari") >= 0 && /version|phantomjs/.test(ua)) {
                    browserName = "safari";
                    browserVersion = /(?:version|phantomjs)\/([0-9.]+)/.exec(ua);
                    browserVersion = browserVersion && browserVersion[1]
                } else {
                    browserName = "unknown";
                    browserVersion = /applewebkit\/([0-9.]+)/.exec(ua);
                    browserVersion = browserVersion && browserVersion[1]
                }
            }
        }
    }
    if ("trident" === browserName || "edge" === browserName) {
        browserName = "msie"
    }
    if (browserName) {
        result[browserName] = true;
        result.version = browserVersion
    }
    return result
};
module.exports = extend({
    _fromUA: browserFromUA
}, browserFromUA(navigator.userAgent));
