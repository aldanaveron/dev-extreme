/**
 * DevExtreme (data/endpoint_selector.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var errors = require("../core/errors");
var window = require("../core/utils/window").getWindow();
var proxyUrlFormatter = require("./proxy_url_formatter");
var IS_WINJS_ORIGIN;
var IS_LOCAL_ORIGIN;

function isLocalHostName(url) {
    return /^(localhost$|127\.)/i.test(url)
}
var EndpointSelector = function(config) {
    this.config = config;
    IS_WINJS_ORIGIN = "ms-appx:" === window.location.protocol;
    IS_LOCAL_ORIGIN = isLocalHostName(window.location.hostname)
};
EndpointSelector.prototype = {
    urlFor: function(key) {
        var bag = this.config[key];
        if (!bag) {
            throw errors.Error("E0006")
        }
        if (proxyUrlFormatter.isProxyUsed()) {
            return proxyUrlFormatter.formatProxyUrl(bag.local)
        }
        if (bag.production) {
            if (IS_WINJS_ORIGIN && !Debug.debuggerEnabled || !IS_WINJS_ORIGIN && !IS_LOCAL_ORIGIN) {
                return bag.production
            }
        }
        return bag.local
    }
};
module.exports = EndpointSelector;
module.exports.default = module.exports;
