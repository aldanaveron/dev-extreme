/**
 * DevExtreme (viz/tree_map/node.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _extend = require("../../core/utils/extend").extend;

function Node() {}
var updateTile = [updateLeaf, updateGroup];
_extend(Node.prototype, {
    value: 0,
    isNode: function() {
        return !!(this.nodes && this.level < this.ctx.maxLevel)
    },
    isActive: function() {
        var ctx = this.ctx;
        return this.level >= ctx.minLevel && this.level <= ctx.maxLevel
    },
    updateStyles: function() {
        var that = this;
        var isNode = Number(that.isNode());
        that.state = that._buildState(that.ctx.settings[isNode].state, !isNode && that.color && {
            fill: that.color
        })
    },
    _buildState: function(state, extra) {
        var base = _extend({}, state);
        return extra ? _extend(base, extra) : base
    },
    updateLabelStyle: function() {
        var settings = this.ctx.settings[Number(this.isNode())];
        this.labelState = settings.labelState;
        this.labelParams = settings.labelParams
    },
    _getState: function() {
        return this.state
    },
    applyState: function() {
        updateTile[Number(this.isNode())](this.tile, this._getState())
    }
});

function updateLeaf(content, attrs) {
    content.smartAttr(attrs)
}

function updateGroup(content, attrs) {
    content.outer.attr({
        stroke: attrs.stroke,
        "stroke-width": attrs["stroke-width"],
        "stroke-opacity": attrs["stroke-opacity"]
    });
    content.inner.smartAttr({
        fill: attrs.fill,
        opacity: attrs.opacity,
        hatching: attrs.hatching
    })
}
module.exports = Node;