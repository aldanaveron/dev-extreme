/**
 * DevExtreme (localization/parentLocale.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var PARENT_LOCALE_SEPARATOR = "-";
module.exports = function(parentLocales, locale) {
    var parentLocale = parentLocales[locale];
    if (parentLocale) {
        return "root" !== parentLocale && parentLocale
    }
    return locale.substr(0, locale.lastIndexOf(PARENT_LOCALE_SEPARATOR))
};
