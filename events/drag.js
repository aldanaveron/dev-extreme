/**
 * DevExtreme (events/drag.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var $ = require("../core/renderer");
var dataUtils = require("../core/element_data");
var wrapToArray = require("../core/utils/array").wrapToArray;
var inArray = require("../core/utils/array").inArray;
var iteratorUtils = require("../core/utils/iterator");
var contains = require("../core/utils/dom").contains;
var registerEvent = require("./core/event_registrator");
var eventUtils = require("./utils");
var GestureEmitter = require("./gesture/emitter.gesture");
var registerEmitter = require("./core/emitter_registrator");
var DRAG_START_EVENT = "dxdragstart";
var DRAG_EVENT = "dxdrag";
var DRAG_END_EVENT = "dxdragend";
var DRAG_ENTER_EVENT = "dxdragenter";
var DRAG_LEAVE_EVENT = "dxdragleave";
var DROP_EVENT = "dxdrop";
var DX_DRAG_EVENTS_COUNT_KEY = "dxDragEventsCount";
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
    setup: function(element, data) {
        var knownDropTarget = inArray(element, knownDropTargets) !== -1;
        if (!knownDropTarget) {
            knownDropTargets.push(element);
            knownDropTargetSelectors.push([]);
            knownDropTargetConfigs.push(data || {})
        }
    },
    add: function(element, handleObj) {
        var index = inArray(element, knownDropTargets);
        this.updateEventsCounter(element, handleObj.type, 1);
        var selector = handleObj.selector;
        if (inArray(selector, knownDropTargetSelectors[index]) === -1) {
            knownDropTargetSelectors[index].push(selector)
        }
    },
    updateEventsCounter: function(element, event, value) {
        if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].indexOf(event) > -1) {
            var eventsCount = dataUtils.data(element, DX_DRAG_EVENTS_COUNT_KEY) || 0;
            dataUtils.data(element, DX_DRAG_EVENTS_COUNT_KEY, Math.max(0, eventsCount + value))
        }
    },
    remove: function(element, handleObj) {
        this.updateEventsCounter(element, handleObj.type, -1)
    },
    teardown: function(element) {
        var handlersCount = dataUtils.data(element, DX_DRAG_EVENTS_COUNT_KEY);
        if (!handlersCount) {
            var index = inArray(element, knownDropTargets);
            knownDropTargets.splice(index, 1);
            knownDropTargetSelectors.splice(index, 1);
            knownDropTargetConfigs.splice(index, 1);
            dataUtils.removeData(element, DX_DRAG_EVENTS_COUNT_KEY)
        }
    }
};
registerEvent(DRAG_ENTER_EVENT, dropTargetRegistration);
registerEvent(DRAG_LEAVE_EVENT, dropTargetRegistration);
registerEvent(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function($element) {
    var dropTargetIndex = inArray($element.get(0), knownDropTargets);
    var dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter(function(selector) {
        return selector
    });
    var $delegatedTargets = $element.find(dropTargetSelectors.join(", "));
    if (inArray(void 0, knownDropTargetSelectors[dropTargetIndex]) !== -1) {
        $delegatedTargets = $delegatedTargets.add($element)
    }
    return $delegatedTargets
};
var getItemConfig = function($element) {
    var dropTargetIndex = inArray($element.get(0), knownDropTargets);
    return knownDropTargetConfigs[dropTargetIndex]
};
var getItemPosition = function(dropTargetConfig, $element) {
    if (dropTargetConfig.itemPositionFunc) {
        return dropTargetConfig.itemPositionFunc($element)
    } else {
        return $element.offset()
    }
};
var getItemSize = function(dropTargetConfig, $element) {
    if (dropTargetConfig.itemSizeFunc) {
        return dropTargetConfig.itemSizeFunc($element)
    }
    return {
        width: $element.get(0).getBoundingClientRect().width,
        height: $element.get(0).getBoundingClientRect().height
    }
};
var DragEmitter = GestureEmitter.inherit({
    ctor: function(element) {
        this.callBase(element);
        this.direction = "both"
    },
    _init: function(e) {
        this._initEvent = e
    },
    _start: function(e) {
        e = this._fireEvent(DRAG_START_EVENT, this._initEvent);
        this._maxLeftOffset = e.maxLeftOffset;
        this._maxRightOffset = e.maxRightOffset;
        this._maxTopOffset = e.maxTopOffset;
        this._maxBottomOffset = e.maxBottomOffset;
        var dropTargets = wrapToArray(e.targetElements || (null === e.targetElements ? [] : knownDropTargets));
        this._dropTargets = iteratorUtils.map(dropTargets, function(element) {
            return $(element).get(0)
        })
    },
    _move: function(e) {
        var eventData = eventUtils.eventData(e);
        var dragOffset = this._calculateOffset(eventData);
        e = this._fireEvent(DRAG_EVENT, e, {
            offset: dragOffset
        });
        this._processDropTargets(e);
        if (!e._cancelPreventDefault) {
            e.preventDefault()
        }
    },
    _calculateOffset: function(eventData) {
        return {
            x: this._calculateXOffset(eventData),
            y: this._calculateYOffset(eventData)
        }
    },
    _calculateXOffset: function(eventData) {
        if ("vertical" !== this.direction) {
            var offset = eventData.x - this._startEventData.x;
            return this._fitOffset(offset, this._maxLeftOffset, this._maxRightOffset)
        }
        return 0
    },
    _calculateYOffset: function(eventData) {
        if ("horizontal" !== this.direction) {
            var offset = eventData.y - this._startEventData.y;
            return this._fitOffset(offset, this._maxTopOffset, this._maxBottomOffset)
        }
        return 0
    },
    _fitOffset: function(offset, minOffset, maxOffset) {
        if (null != minOffset) {
            offset = Math.max(offset, -minOffset)
        }
        if (null != maxOffset) {
            offset = Math.min(offset, maxOffset)
        }
        return offset
    },
    _processDropTargets: function(e) {
        var target = this._findDropTarget(e);
        var sameTarget = target === this._currentDropTarget;
        if (!sameTarget) {
            this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
            this._currentDropTarget = target;
            this._fireDropTargetEvent(e, DRAG_ENTER_EVENT)
        }
    },
    _fireDropTargetEvent: function(event, eventName) {
        if (!this._currentDropTarget) {
            return
        }
        var eventData = {
            type: eventName,
            originalEvent: event,
            draggingElement: this._$element.get(0),
            target: this._currentDropTarget
        };
        eventUtils.fireEvent(eventData)
    },
    _findDropTarget: function(e) {
        var that = this;
        var result;
        iteratorUtils.each(knownDropTargets, function(_, target) {
            if (!that._checkDropTargetActive(target)) {
                return
            }
            var $target = $(target);
            iteratorUtils.each(getItemDelegatedTargets($target), function(_, delegatedTarget) {
                var $delegatedTarget = $(delegatedTarget);
                if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, e)) {
                    result = delegatedTarget
                }
            })
        });
        return result
    },
    _checkDropTargetActive: function(target) {
        var active = false;
        iteratorUtils.each(this._dropTargets, function(_, activeTarget) {
            active = active || activeTarget === target || contains(activeTarget, target);
            return !active
        });
        return active
    },
    _checkDropTarget: function(config, $target, e) {
        var isDraggingElement = $target.get(0) === $(e.target).get(0);
        if (isDraggingElement) {
            return false
        }
        var targetPosition = getItemPosition(config, $target);
        if (e.pageX < targetPosition.left) {
            return false
        }
        if (e.pageY < targetPosition.top) {
            return false
        }
        var targetSize = getItemSize(config, $target);
        if (e.pageX > targetPosition.left + targetSize.width) {
            return false
        }
        if (e.pageY > targetPosition.top + targetSize.height) {
            return false
        }
        if (config.checkDropTarget && !config.checkDropTarget($target, e)) {
            return false
        }
        return $target
    },
    _end: function(e) {
        var eventData = eventUtils.eventData(e);
        this._fireEvent(DRAG_END_EVENT, e, {
            offset: this._calculateOffset(eventData)
        });
        this._fireDropTargetEvent(e, DROP_EVENT);
        delete this._currentDropTarget
    }
});
registerEmitter({
    emitter: DragEmitter,
    events: [DRAG_START_EVENT, DRAG_EVENT, DRAG_END_EVENT]
});
exports.move = DRAG_EVENT;
exports.start = DRAG_START_EVENT;
exports.end = DRAG_END_EVENT;
exports.enter = DRAG_ENTER_EVENT;
exports.leave = DRAG_LEAVE_EVENT;
exports.drop = DROP_EVENT;