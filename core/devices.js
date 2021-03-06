/**
 * DevExtreme (core/devices.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = require("../core/renderer");
var _renderer2 = _interopRequireDefault(_renderer);
var _window = require("./utils/window");
var _window2 = _interopRequireDefault(_window);
var _extend = require("./utils/extend");
var _type = require("./utils/type");
var _iterator = require("./utils/iterator");
var _errors = require("./errors");
var _errors2 = _interopRequireDefault(_errors);
var _callbacks = require("./utils/callbacks");
var _callbacks2 = _interopRequireDefault(_callbacks);
var _resize_callbacks = require("./utils/resize_callbacks");
var _resize_callbacks2 = _interopRequireDefault(_resize_callbacks);
var _events_strategy = require("./events_strategy");
var _storage = require("./utils/storage");
var _view_port = require("./utils/view_port");
var _view_port2 = _interopRequireDefault(_view_port);
var _config = require("./config");
var _config2 = _interopRequireDefault(_config);

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
var navigator = _window2.default.getNavigator();
var window = _window2.default.getWindow();
var KNOWN_UA_TABLE = {
    iPhone: "iPhone",
    iPhone5: "iPhone",
    iPhone6: "iPhone",
    iPhone6plus: "iPhone",
    iPad: "iPad",
    iPadMini: "iPad Mini",
    androidPhone: "Android Mobile",
    androidTablet: "Android",
    msSurface: "Windows ARM Tablet PC",
    desktop: "desktop"
};
var DEFAULT_DEVICE = {
    deviceType: "desktop",
    platform: "generic",
    version: [],
    phone: false,
    tablet: false,
    android: false,
    ios: false,
    generic: true,
    grade: "A",
    mac: false
};
var uaParsers = {
    generic: function(userAgent) {
        var isPhone = /windows phone/i.test(userAgent) || userAgent.match(/WPDesktop/);
        var isTablet = !isPhone && /Windows(.*)arm(.*)Tablet PC/i.test(userAgent);
        var isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
        var isMac = /((intel|ppc) mac os x)/.test(userAgent.toLowerCase());
        if (!(isPhone || isTablet || isDesktop || isMac)) {
            return
        }
        return {
            deviceType: isPhone ? "phone" : isTablet ? "tablet" : "desktop",
            platform: "generic",
            version: [],
            grade: "A",
            mac: isMac
        }
    },
    ios: function(userAgent) {
        if (!/ip(hone|od|ad)/i.test(userAgent)) {
            return
        }
        var isPhone = /ip(hone|od)/i.test(userAgent);
        var matches = userAgent.match(/os (\d+)_(\d+)_?(\d+)?/i);
        var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
        var isIPhone4 = 480 === window.screen.height;
        var grade = isIPhone4 ? "B" : "A";
        return {
            deviceType: isPhone ? "phone" : "tablet",
            platform: "ios",
            version: version,
            grade: grade
        }
    },
    android: function(userAgent) {
        if (!/android|htc_|silk/i.test(userAgent)) {
            return
        }
        var isPhone = /mobile/i.test(userAgent);
        var matches = userAgent.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
        var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2] || 0, 10), parseInt(matches[3] || 0, 10)] : [];
        var worseThan4_4 = version.length > 1 && (version[0] < 4 || 4 === version[0] && version[1] < 4);
        var grade = worseThan4_4 ? "B" : "A";
        return {
            deviceType: isPhone ? "phone" : "tablet",
            platform: "android",
            version: version,
            grade: grade
        }
    }
};
var Devices = function() {
    function Devices(options) {
        _classCallCheck(this, Devices);
        this._window = (null === options || void 0 === options ? void 0 : options.window) || window;
        this._realDevice = this._getDevice();
        this._currentDevice = void 0;
        this._currentOrientation = void 0;
        this._eventsStrategy = new _events_strategy.EventsStrategy(this);
        this.changed = (0, _callbacks2.default)();
        if (_window2.default.hasWindow()) {
            this._recalculateOrientation();
            _resize_callbacks2.default.add(this._recalculateOrientation.bind(this))
        }
    }
    _createClass(Devices, [{
        key: "current",
        value: function(deviceOrName) {
            if (deviceOrName) {
                this._currentDevice = this._getDevice(deviceOrName);
                this._forced = true;
                this.changed.fire();
                return
            }
            if (!this._currentDevice) {
                deviceOrName = void 0;
                try {
                    deviceOrName = this._getDeviceOrNameFromWindowScope()
                } catch (e) {
                    deviceOrName = this._getDeviceNameFromSessionStorage()
                } finally {
                    if (!deviceOrName) {
                        deviceOrName = this._getDeviceNameFromSessionStorage()
                    }
                    if (deviceOrName) {
                        this._forced = true
                    }
                }
                this._currentDevice = this._getDevice(deviceOrName)
            }
            return this._currentDevice
        }
    }, {
        key: "real",
        value: function(forceDevice) {
            return (0, _extend.extend)({}, this._realDevice)
        }
    }, {
        key: "orientation",
        value: function() {
            return this._currentOrientation
        }
    }, {
        key: "isForced",
        value: function() {
            return this._forced
        }
    }, {
        key: "isRippleEmulator",
        value: function() {
            return !!this._window.tinyHippos
        }
    }, {
        key: "_getCssClasses",
        value: function(device) {
            var result = [];
            var realDevice = this._realDevice;
            device = device || this.current();
            if (device.deviceType) {
                result.push("dx-device-".concat(device.deviceType));
                if ("desktop" !== device.deviceType) {
                    result.push("dx-device-mobile")
                }
            }
            result.push("dx-device-".concat(realDevice.platform));
            if (realDevice.version && realDevice.version.length) {
                result.push("dx-device-".concat(realDevice.platform, "-").concat(realDevice.version[0]))
            }
            if (this.isSimulator()) {
                result.push("dx-simulator")
            }
            if ((0, _config2.default)().rtlEnabled) {
                result.push("dx-rtl")
            }
            return result
        }
    }, {
        key: "attachCssClasses",
        value: function(element, device) {
            this._deviceClasses = this._getCssClasses(device).join(" ");
            (0, _renderer2.default)(element).addClass(this._deviceClasses)
        }
    }, {
        key: "detachCssClasses",
        value: function(element) {
            (0, _renderer2.default)(element).removeClass(this._deviceClasses)
        }
    }, {
        key: "isSimulator",
        value: function() {
            try {
                return this._isSimulator || _window2.default.hasWindow() && this._window.top !== this._window.self && this._window.top["dx-force-device"] || this.isRippleEmulator()
            } catch (e) {
                return false
            }
        }
    }, {
        key: "forceSimulator",
        value: function() {
            this._isSimulator = true
        }
    }, {
        key: "_getDevice",
        value: function(deviceName) {
            if ("genericPhone" === deviceName) {
                deviceName = {
                    deviceType: "phone",
                    platform: "generic",
                    generic: true
                }
            }
            if ((0, _type.isPlainObject)(deviceName)) {
                return this._fromConfig(deviceName)
            } else {
                var ua;
                if (deviceName) {
                    ua = KNOWN_UA_TABLE[deviceName];
                    if (!ua) {
                        throw _errors2.default.Error("E0005")
                    }
                } else {
                    ua = navigator.userAgent
                }
                return this._fromUA(ua)
            }
        }
    }, {
        key: "_getDeviceOrNameFromWindowScope",
        value: function() {
            var result;
            if (_window2.default.hasWindow() && (this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"])) {
                result = this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"]
            }
            return result
        }
    }, {
        key: "_getDeviceNameFromSessionStorage",
        value: function() {
            var sessionStorage = (0, _storage.sessionStorage)();
            if (!sessionStorage) {
                return
            }
            var deviceOrName = sessionStorage.getItem("dx-force-device");
            try {
                return JSON.parse(deviceOrName)
            } catch (ex) {
                return deviceOrName
            }
        }
    }, {
        key: "_fromConfig",
        value: function(config) {
            var result = (0, _extend.extend)({}, DEFAULT_DEVICE, this._currentDevice, config);
            var shortcuts = {
                phone: "phone" === result.deviceType,
                tablet: "tablet" === result.deviceType,
                android: "android" === result.platform,
                ios: "ios" === result.platform,
                generic: "generic" === result.platform
            };
            return (0, _extend.extend)(result, shortcuts)
        }
    }, {
        key: "_fromUA",
        value: function(ua) {
            var config;
            (0, _iterator.each)(uaParsers, function(platform, parser) {
                config = parser(ua);
                return !config
            });
            if (config) {
                return this._fromConfig(config)
            }
            return DEFAULT_DEVICE
        }
    }, {
        key: "_changeOrientation",
        value: function() {
            var $window = (0, _renderer2.default)(this._window);
            var orientation = $window.height() > $window.width() ? "portrait" : "landscape";
            if (this._currentOrientation === orientation) {
                return
            }
            this._currentOrientation = orientation;
            this._eventsStrategy.fireEvent("orientationChanged", [{
                orientation: orientation
            }])
        }
    }, {
        key: "_recalculateOrientation",
        value: function() {
            var windowWidth = (0, _renderer2.default)(this._window).width();
            if (this._currentWidth === windowWidth) {
                return
            }
            this._currentWidth = windowWidth;
            this._changeOrientation()
        }
    }, {
        key: "on",
        value: function(eventName, eventHandler) {
            this._eventsStrategy.on(eventName, eventHandler);
            return this
        }
    }, {
        key: "off",
        value: function(eventName, eventHandler) {
            this._eventsStrategy.off(eventName, eventHandler);
            return this
        }
    }]);
    return Devices
}();
var devices = new Devices;
_view_port2.default.changeCallback.add(function(viewPort, prevViewport) {
    devices.detachCssClasses(prevViewport);
    devices.attachCssClasses(viewPort)
});
module.exports = devices;
module.exports.default = module.exports;
