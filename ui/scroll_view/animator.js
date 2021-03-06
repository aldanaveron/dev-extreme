/**
 * DevExtreme (ui/scroll_view/animator.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var noop = require("../../core/utils/common").noop;
var Class = require("../../core/class");
var abstract = Class.abstract;
var animationFrame = require("../../animation/frame");
var Animator = Class.inherit({
    ctor: function() {
        this._finished = true;
        this._stopped = false;
        this._proxiedStepCore = this._stepCore.bind(this)
    },
    start: function() {
        this._stopped = false;
        this._finished = false;
        this._stepCore()
    },
    stop: function() {
        this._stopped = true;
        animationFrame.cancelAnimationFrame(this._stepAnimationFrame)
    },
    _stepCore: function() {
        if (this._isStopped()) {
            this._stop();
            return
        }
        if (this._isFinished()) {
            this._finished = true;
            this._complete();
            return
        }
        this._step();
        this._stepAnimationFrame = animationFrame.requestAnimationFrame(this._proxiedStepCore)
    },
    _step: abstract,
    _isFinished: noop,
    _stop: noop,
    _complete: noop,
    _isStopped: function() {
        return this._stopped
    },
    inProgress: function() {
        return !(this._stopped || this._finished)
    }
});
module.exports = Animator;
