/**
 * DevExtreme (viz/sankey/tooltip.js)
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
exports.setTooltipCustomOptions = setTooltipCustomOptions;
var _extend = require("../../core/utils/extend").extend;
var isFunction = require("../../core/utils/type").isFunction;
var defaultCustomizeLinkTooltip = function(info) {
    return {
        html: "<strong>".concat(info.source, " > ").concat(info.target, "</strong><br/>Weight: ").concat(info.weight)
    }
};
var defaultCustomizeNodeTooltip = function(info) {
    return {
        html: "<strong>".concat(info.label, "</strong><br/>Incoming weight: ").concat(info.weightIn, "<br/>Outgoing weight: ").concat(info.weightOut)
    }
};
var generateCustomCallback = function(customCallback, defaultCallback) {
    return function(objectInfo) {
        var res = isFunction(customCallback) ? customCallback.call(objectInfo, objectInfo) : {};
        var hasOwnProperty = Object.prototype.hasOwnProperty.bind(res);
        if (!hasOwnProperty("html") && !hasOwnProperty("text")) {
            res = _extend(res, defaultCallback.call(objectInfo, objectInfo))
        }
        return res
    }
};

function setTooltipCustomOptions(sankey) {
    sankey.prototype._setTooltipOptions = function() {
        var tooltip = this._tooltip;
        var options = tooltip && this._getOption("tooltip");
        var linkTemplate;
        var nodeTemplate;
        if (options.linkTooltipTemplate) {
            linkTemplate = this._getTemplate(options.linkTooltipTemplate)
        }
        if (options.nodeTooltipTemplate) {
            nodeTemplate = this._getTemplate(options.nodeTooltipTemplate)
        }
        tooltip && tooltip.update(_extend({}, options, {
            customizeTooltip: function(args) {
                if (!(linkTemplate && "link" === args.type || nodeTemplate && "node" === args.type)) {
                    args.skipTemplate = true
                }
                if ("node" === args.type) {
                    return generateCustomCallback(options.customizeNodeTooltip, defaultCustomizeNodeTooltip)(args.info)
                } else {
                    if ("link" === args.type) {
                        return generateCustomCallback(options.customizeLinkTooltip, defaultCustomizeLinkTooltip)(args.info)
                    }
                }
                return {}
            },
            contentTemplate: function(arg, div) {
                var templateArgs = {
                    model: arg.info,
                    container: div
                };
                if (linkTemplate && "link" === arg.type) {
                    return linkTemplate.render(templateArgs)
                }
                if (nodeTemplate && "node" === arg.type) {
                    return nodeTemplate.render(templateArgs)
                }
            },
            enabled: options.enabled
        }))
    };
    sankey.prototype.hideTooltip = function() {
        this._tooltip && this._tooltip.hide()
    }
}
