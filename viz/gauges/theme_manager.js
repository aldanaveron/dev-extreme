/**
 * DevExtreme (viz/gauges/theme_manager.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var extend = require("../../core/utils/extend").extend;
var _extend = extend;
var BaseThemeManager = require("../core/base_theme_manager").BaseThemeManager;
var ThemeManager = BaseThemeManager.inherit({
    ctor: function(options) {
        this.callBase.apply(this, arguments);
        this._subTheme = options.subTheme
    },
    _initializeTheme: function() {
        var that = this;
        var subTheme;
        if (that._subTheme) {
            subTheme = _extend(true, {}, that._theme[that._subTheme], that._theme);
            _extend(true, that._theme, subTheme)
        }
        that.callBase.apply(that, arguments)
    }
});
module.exports = {
    ThemeManager: ThemeManager
};
