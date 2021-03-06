/**
 * DevExtreme (events/index.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var eventsEngine = require("./core/events_engine");
exports.on = eventsEngine.on;
exports.one = eventsEngine.one;
exports.off = eventsEngine.off;
exports.trigger = eventsEngine.trigger;
exports.triggerHandler = eventsEngine.triggerHandler;
exports.Event = eventsEngine.Event;
