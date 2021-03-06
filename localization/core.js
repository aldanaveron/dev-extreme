/**
 * DevExtreme (localization/core.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _dependency_injector = require("../core/utils/dependency_injector");
var _dependency_injector2 = _interopRequireDefault(_dependency_injector);
var _parent_locales = require("./cldr-data/parent_locales");
var _parent_locales2 = _interopRequireDefault(_parent_locales);
var _parentLocale = require("./parentLocale");
var _parentLocale2 = _interopRequireDefault(_parentLocale);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_LOCALE = "en";
module.exports = (0, _dependency_injector2.default)({
    locale: function() {
        var currentLocale = DEFAULT_LOCALE;
        return function(locale) {
            if (!locale) {
                return currentLocale
            }
            currentLocale = locale
        }
    }(),
    getValueByClosestLocale: function(getter) {
        var locale = this.locale();
        var value = getter(locale);
        var isRootLocale;
        while (!value && !isRootLocale) {
            locale = (0, _parentLocale2.default)(_parent_locales2.default, locale);
            if (locale) {
                value = getter(locale)
            } else {
                isRootLocale = true
            }
        }
        if (void 0 === value && locale !== DEFAULT_LOCALE) {
            return getter(DEFAULT_LOCALE)
        }
        return value
    }
});
