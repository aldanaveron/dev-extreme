/**
 * DevExtreme (ui/themes.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../core/renderer");
var domAdapter = require("../core/dom_adapter");
var windowUtils = require("../core/utils/window");
var window = windowUtils.getWindow();
var Deferred = require("../core/utils/deferred").Deferred;
var errors = require("./widget/ui.errors");
var domUtils = require("../core/utils/dom");
var readyCallbacks = require("../core/utils/ready_callbacks");
var ready = readyCallbacks.add;
var each = require("../core/utils/iterator").each;
var devices = require("../core/devices");
var viewPortUtils = require("../core/utils/view_port");
var themeReadyCallback = require("./themes_callback");
var viewPort = viewPortUtils.value;
var Promise = require("../core/polyfills/promise");
var viewPortChanged = viewPortUtils.changeCallback;
var DX_LINK_SELECTOR = "link[rel=dx-theme]";
var THEME_ATTR = "data-theme";
var ACTIVE_ATTR = "data-active";
var DX_HAIRLINES_CLASS = "dx-hairlines";
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var timerId;
var THEME_MARKER_PREFIX = "dx.";

function readThemeMarker() {
    if (!windowUtils.hasWindow()) {
        return null
    }
    var element = $("<div>", context).addClass("dx-theme-marker").appendTo(context.documentElement);
    var result;
    try {
        result = element.css("fontFamily");
        if (!result) {
            return null
        }
        result = result.replace(/["']/g, "");
        if (result.substr(0, THEME_MARKER_PREFIX.length) !== THEME_MARKER_PREFIX) {
            return null
        }
        return result.substr(THEME_MARKER_PREFIX.length)
    } finally {
        element.remove()
    }
}

function waitForThemeLoad(themeName) {
    var waitStartTime;
    pendingThemeName = themeName;

    function handleLoaded() {
        pendingThemeName = null;
        themeReadyCallback.fire();
        themeReadyCallback.empty()
    }
    if (isPendingThemeLoaded()) {
        handleLoaded()
    } else {
        waitStartTime = Date.now();
        timerId = setInterval(function() {
            var isLoaded = isPendingThemeLoaded();
            var isTimeout = !isLoaded && Date.now() - waitStartTime > 15e3;
            if (isTimeout) {
                errors.log("W0004", pendingThemeName)
            }
            if (isLoaded || isTimeout) {
                clearInterval(timerId);
                timerId = void 0;
                handleLoaded()
            }
        }, 10)
    }
}

function isPendingThemeLoaded() {
    return !pendingThemeName || readThemeMarker() === pendingThemeName
}

function processMarkup() {
    var $allThemeLinks = $(DX_LINK_SELECTOR, context);
    if (!$allThemeLinks.length) {
        return
    }
    knownThemes = {};
    $activeThemeLink = $(domUtils.createMarkupFromString("<link rel=stylesheet>"), context);
    $allThemeLinks.each(function() {
        var link = $(this, context);
        var fullThemeName = link.attr(THEME_ATTR);
        var url = link.attr("href");
        var isActive = "true" === link.attr(ACTIVE_ATTR);
        knownThemes[fullThemeName] = {
            url: url,
            isActive: isActive
        }
    });
    $allThemeLinks.last().after($activeThemeLink);
    $allThemeLinks.remove()
}

function resolveFullThemeName(desiredThemeName) {
    var desiredThemeParts = desiredThemeName ? desiredThemeName.split(".") : [];
    var result = null;
    if (knownThemes) {
        if (desiredThemeName in knownThemes) {
            return desiredThemeName
        }
        each(knownThemes, function(knownThemeName, themeData) {
            var knownThemeParts = knownThemeName.split(".");
            if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
                return
            }
            if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
                return
            }
            if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
                return
            }
            if (!result || themeData.isActive) {
                result = knownThemeName
            }
            if (themeData.isActive) {
                return false
            }
        })
    }
    return result
}

function initContext(newContext) {
    try {
        if (newContext !== context) {
            knownThemes = null
        }
    } catch (x) {
        knownThemes = null
    }
    context = newContext
}

function init(options) {
    options = options || {};
    initContext(options.context || domAdapter.getDocument());
    if (!context) {
        return
    }
    processMarkup();
    currentThemeName = void 0;
    current(options)
}

function current(options) {
    if (!arguments.length) {
        currentThemeName = currentThemeName || readThemeMarker();
        return currentThemeName
    }
    detachCssClasses(viewPort());
    options = options || {};
    if ("string" === typeof options) {
        options = {
            theme: options
        }
    }
    var isAutoInit = options._autoInit;
    var loadCallback = options.loadCallback;
    var currentThemeData;
    currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
    if (currentThemeName) {
        currentThemeData = knownThemes[currentThemeName]
    }
    if (loadCallback) {
        themeReadyCallback.add(loadCallback)
    }
    if (currentThemeData) {
        $activeThemeLink.attr("href", knownThemes[currentThemeName].url);
        if ((themeReadyCallback.has() || options._forceTimeout) && !timerId) {
            waitForThemeLoad(currentThemeName)
        } else {
            if (pendingThemeName) {
                pendingThemeName = currentThemeName
            }
        }
    } else {
        if (isAutoInit) {
            themeReadyCallback.fire();
            themeReadyCallback.empty()
        } else {
            throw errors.Error("E0021", currentThemeName)
        }
    }
    checkThemeDeprecation();
    attachCssClasses(viewPortUtils.originalViewPort(), currentThemeName)
}

function getCssClasses(themeName) {
    themeName = themeName || current();
    var result = [];
    var themeNameParts = themeName && themeName.split(".");
    if (themeNameParts) {
        result.push("dx-theme-" + themeNameParts[0], "dx-theme-" + themeNameParts[0] + "-typography");
        if (themeNameParts.length > 1) {
            result.push("dx-color-scheme-" + themeNameParts[1] + (isMaterial(themeName) ? "-" + themeNameParts[2] : ""))
        }
    }
    return result
}
var themeClasses;

function attachCssClasses(element, themeName) {
    themeClasses = getCssClasses(themeName).join(" ");
    $(element).addClass(themeClasses);
    var activateHairlines = function() {
        var pixelRatio = windowUtils.hasWindow() && window.devicePixelRatio;
        if (!pixelRatio || pixelRatio < 2) {
            return
        }
        var $tester = $("<div>");
        $tester.css("border", ".5px solid transparent");
        $("body").append($tester);
        if (1 === $tester.outerHeight()) {
            $(element).addClass(DX_HAIRLINES_CLASS);
            themeClasses += " " + DX_HAIRLINES_CLASS
        }
        $tester.remove()
    };
    activateHairlines()
}

function detachCssClasses(element) {
    $(element).removeClass(themeClasses)
}

function themeReady(callback) {
    themeReadyCallback.add(callback)
}

function isTheme(themeRegExp, themeName) {
    if (!themeName) {
        themeName = currentThemeName || readThemeMarker()
    }
    return new RegExp(themeRegExp).test(themeName)
}

function isMaterial(themeName) {
    return isTheme("material", themeName)
}

function isIos7(themeName) {
    return isTheme("ios7", themeName)
}

function isGeneric(themeName) {
    return isTheme("generic", themeName)
}

function isDark(themeName) {
    return isTheme("dark", themeName)
}

function checkThemeDeprecation() {
    if (isIos7()) {
        errors.log("W0010", "The 'ios7' theme", "19.1", "Use the 'generic' theme instead.")
    }
}

function isWebFontLoaded(text, fontWeight) {
    var testedFont = "Roboto, RobotoFallback, Arial";
    var etalonFont = "Arial";
    var document = domAdapter.getDocument();
    var testElement = document.createElement("span");
    testElement.style.position = "absolute";
    testElement.style.top = "-9999px";
    testElement.style.left = "-9999px";
    testElement.style.visibility = "hidden";
    testElement.style.fontFamily = etalonFont;
    testElement.style.fontSize = "250px";
    testElement.style.fontWeight = fontWeight;
    testElement.innerHTML = text;
    document.body.appendChild(testElement);
    var etalonFontWidth = testElement.offsetWidth;
    testElement.style.fontFamily = testedFont;
    var testedFontWidth = testElement.offsetWidth;
    testElement.parentNode.removeChild(testElement);
    return etalonFontWidth !== testedFontWidth
}

function waitWebFont(text, fontWeight) {
    var interval = 15;
    var timeout = 2e3;
    return new Promise(function(resolve) {
        var check = function() {
            if (isWebFontLoaded(text, fontWeight)) {
                clear()
            }
        };
        var clear = function() {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            resolve()
        };
        var intervalId = setInterval(check, interval);
        var timeoutId = setTimeout(clear, timeout)
    })
}
var initDeferred = new Deferred;

function autoInit() {
    init({
        _autoInit: true,
        _forceTimeout: true
    });
    if ($(DX_LINK_SELECTOR, context).length) {
        throw errors.Error("E0022")
    }
    initDeferred.resolve()
}
if (windowUtils.hasWindow()) {
    autoInit()
} else {
    ready(autoInit)
}
viewPortChanged.add(function(viewPort, prevViewPort) {
    initDeferred.done(function() {
        detachCssClasses(prevViewPort);
        attachCssClasses(viewPort)
    })
});
devices.changed.add(function() {
    init({
        _autoInit: true
    })
});
exports.current = current;
exports.ready = themeReady;
exports.init = init;
exports.attachCssClasses = attachCssClasses;
exports.detachCssClasses = detachCssClasses;
exports.waitForThemeLoad = waitForThemeLoad;
exports.isMaterial = isMaterial;
exports.isIos7 = isIos7;
exports.isGeneric = isGeneric;
exports.isDark = isDark;
exports.isWebFontLoaded = isWebFontLoaded;
exports.waitWebFont = waitWebFont;
exports.resetTheme = function() {
    $activeThemeLink && $activeThemeLink.attr("href", "about:blank");
    currentThemeName = null;
    pendingThemeName = null
};
module.exports.default = module.exports;
