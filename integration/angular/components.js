/**
 * DevExtreme (integration/angular/components.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var Callbacks = require("../../core/utils/callbacks");
var ngModule = require("./module");
ngModule.service("dxDigestCallbacks", ["$rootScope", function($rootScope) {
    var begin = Callbacks();
    var prioritizedEnd = Callbacks();
    var end = Callbacks();
    var digestPhase = false;
    $rootScope.$watch(function() {
        if (digestPhase) {
            return
        }
        digestPhase = true;
        begin.fire();
        $rootScope.$$postDigest(function() {
            digestPhase = false;
            prioritizedEnd.fire();
            end.fire()
        })
    });
    return {
        begin: {
            add: function(callback) {
                if (digestPhase) {
                    callback()
                }
                begin.add(callback)
            },
            remove: begin.remove.bind(begin)
        },
        end: {
            add: end.add.bind(end),
            addPrioritized: prioritizedEnd.add.bind(prioritizedEnd),
            remove: end.remove.bind(end)
        }
    }
}]);
