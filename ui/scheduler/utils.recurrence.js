/**
 * DevExtreme (ui/scheduler/utils.recurrence.js)
 * Version: 20.1.1
 * Build date: Wed Mar 25 2020
 *
 * Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var errors = require("../../core/errors");
var extend = require("../../core/utils/extend").extend;
var each = require("../../core/utils/iterator").each;
var inArray = require("../../core/utils/array").inArray;
var isDefined = require("../../core/utils/type").isDefined;
var dateUtils = require("../../core/utils/date");
var toMs = dateUtils.dateToMilliseconds;
var leastDaysInWeek = 4;
var ruleNames = ["freq", "interval", "byday", "byweekno", "byyearday", "bymonth", "bymonthday", "count", "until", "byhour", "byminute", "bysecond", "bysetpos", "wkst"];
var freqNames = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY", "SECONDLY", "MINUTELY", "HOURLY"];
var days = {
    SU: 0,
    MO: 1,
    TU: 2,
    WE: 3,
    TH: 4,
    FR: 5,
    SA: 6
};
var daysNames = {
    0: "SU",
    1: "MO",
    2: "TU",
    3: "WE",
    4: "TH",
    5: "FR",
    6: "SA"
};
var intervalMap = {
    secondly: "seconds",
    minutely: "minutes",
    hourly: "hours",
    daily: "days",
    weekly: "weeks",
    monthly: "months",
    yearly: "years"
};
var resultUtils = {};
var dateSetterMap = {
    bysecond: function(date, value) {
        date.setSeconds(value)
    },
    byminute: function(date, value) {
        date.setMinutes(value)
    },
    byhour: function(date, value) {
        date.setHours(value)
    },
    bymonth: function(date, value) {
        date.setMonth(value)
    },
    bymonthday: function(date, value) {
        if (value < 0) {
            var initialDate = new Date(date);
            setDateByNegativeValue(initialDate, 1, -1);
            var daysInMonth = initialDate.getDate();
            if (daysInMonth >= Math.abs(value)) {
                setDateByNegativeValue(date, 1, value)
            } else {
                setDateByNegativeValue(date, 2, value)
            }
        } else {
            date.setDate(value);
            correctDate(date, value)
        }
    },
    byday: function(date, byDay, appointmentWeekStart, frequency, firstDayOfWeek) {
        var appointmentDayOfWeek = date.getDay();
        var weekStart = days[appointmentWeekStart];
        byDay += byDay >= weekStart === weekStart > appointmentDayOfWeek ? 7 : 0;
        date.setDate(date.getDate() - appointmentDayOfWeek + byDay)
    },
    byweekno: function(date, weekNumber, weekStart) {
        var initialDate = new Date(date);
        var firstYearDate = new Date(initialDate.setMonth(0, 1));
        var dayShift = firstYearDate.getDay() - days[weekStart];
        var firstDayOfYear = firstYearDate.getTime() - dayShift * toMs("day");
        var newFirstYearDate = dayShift + 1;
        if (newFirstYearDate > leastDaysInWeek) {
            date.setTime(firstDayOfYear + 7 * weekNumber * toMs("day"))
        } else {
            date.setTime(firstDayOfYear + 7 * (weekNumber - 1) * toMs("day"))
        }
        var timezoneDiff = (date.getTimezoneOffset() - firstYearDate.getTimezoneOffset()) * toMs("minute");
        timezoneDiff && date.setTime(date.getTime() + timezoneDiff)
    },
    byyearday: function(date, dayOfYear) {
        date.setMonth(0, 1);
        date.setDate(dayOfYear)
    }
};

function setDateByNegativeValue(date, month, value) {
    var initialDate = new Date(date);
    date.setMonth(date.getMonth() + month);
    if (date.getMonth() - initialDate.getMonth() > month) {
        date.setDate(value + 1)
    }
    date.setDate(value + 1)
}
var dateGetterMap = {
    bysecond: function(date) {
        return date.getSeconds()
    },
    byminute: function(date) {
        return date.getMinutes()
    },
    byhour: function(date) {
        return date.getHours()
    },
    bymonth: function(date) {
        return date.getMonth()
    },
    bymonthday: function(date) {
        return date.getDate()
    },
    byday: function(date) {
        return date.getDay()
    },
    byweekno: function(date, weekStart) {
        var current = new Date(date);
        var diff = leastDaysInWeek - current.getDay() + days[weekStart] - 1;
        var dayInMilliseconds = toMs("day");
        if (date.getDay() < days[weekStart]) {
            diff -= 7
        }
        current.setHours(0, 0, 0);
        current.setDate(current.getDate() + diff);
        var yearStart = new Date(current.getFullYear(), 0, 1);
        var timezoneDiff = (yearStart.getTimezoneOffset() - current.getTimezoneOffset()) * toMs("minute");
        var daysFromYearStart = 1 + (current - yearStart + timezoneDiff) / dayInMilliseconds;
        return Math.ceil(daysFromYearStart / 7)
    },
    byyearday: function(date) {
        var yearStart = new Date(date.getFullYear(), 0, 0);
        var timezoneDiff = date.getTimezoneOffset() - yearStart.getTimezoneOffset();
        var diff = date - yearStart - timezoneDiff * toMs("minute");
        var dayLength = toMs("day");
        return Math.floor(diff / dayLength)
    }
};

function getTimeZoneOffset() {
    return (new Date).getTimezoneOffset()
}
var dateInRecurrenceRange = function(options) {
    var result = [];
    if (options.rule) {
        result = getDatesByRecurrence(options)
    }
    return !!result.length
};
var normalizeInterval = function(rule) {
    var interval = rule.interval;
    var freq = rule.freq;
    var intervalObject = {};
    var intervalField = intervalMap[freq.toLowerCase()];
    if ("MONTHLY" === freq && rule.byday) {
        intervalField = intervalMap.daily
    }
    intervalObject[intervalField] = interval;
    return intervalObject
};
var getDatesByRecurrenceException = function(ruleValues, date) {
    var result = [];
    for (var i = 0, len = ruleValues.length; i < len; i++) {
        result[i] = getDateByAsciiString(ruleValues[i], date)
    }
    return result
};
var dateIsRecurrenceException = function(date, recurrenceException) {
    var result = false;
    if (!recurrenceException) {
        return result
    }
    var splitDates = recurrenceException.split(",");
    var exceptDates = getDatesByRecurrenceException(splitDates, date);
    var shortFormat = /\d{8}$/;
    for (var i = 0, len = exceptDates.length; i < len; i++) {
        if (splitDates[i].match(shortFormat)) {
            var diffs = getDatePartDiffs(date, exceptDates[i]);
            if (0 === diffs.years && 0 === diffs.months && 0 === diffs.days) {
                result = true
            }
        } else {
            if (date.getTime() === exceptDates[i].getTime()) {
                result = true
            }
        }
    }
    return result
};
var doNextIteration = function(date, startIntervalDate, endIntervalDate, recurrenceRule, iterationCount) {
    var matchCountIsCorrect = true;
    endIntervalDate = endIntervalDate.getTime();
    if (recurrenceRule.until) {
        if (recurrenceRule.until.getTime() < endIntervalDate) {
            endIntervalDate = recurrenceRule.until.getTime()
        }
    }
    if (recurrenceRule.count) {
        if (iterationCount === recurrenceRule.count) {
            matchCountIsCorrect = false
        }
    }
    var dateInInterval = date.getTime() <= endIntervalDate;
    return dateInInterval && matchCountIsCorrect
};

function getDatesByRecurrence(options) {
    var result = [];
    var recurrenceRule = getRecurrenceRule(options.rule);
    var iterationResult = {};
    var rule = recurrenceRule.rule;
    var recurrenceStartDate = options.start;
    if (!recurrenceRule.isValid || !rule.freq) {
        return result
    }
    rule.interval = normalizeInterval(rule);
    var dateRules = splitDateRules(rule, options.firstDayOfWeek);
    var duration = options.end ? options.end.getTime() - options.start.getTime() : toMs("day");
    var config = {
        exception: options.exception,
        min: options.min,
        dateRules: dateRules,
        rule: rule,
        recurrenceStartDate: recurrenceStartDate,
        recurrenceEndDate: options.end,
        duration: duration
    };
    if (dateRules.length && rule.count) {
        var iteration = 0;
        getDatesByCount(dateRules, new Date(recurrenceStartDate), new Date(recurrenceStartDate), rule).forEach(function(currentDate, i) {
            if (currentDate < options.max) {
                iteration++;
                iterationResult = pushToResult(iteration, iterationResult, currentDate, i, config, true)
            }
        })
    } else {
        getDatesByRules(dateRules, new Date(recurrenceStartDate), rule).forEach(function(currentDate, i) {
            var iteration = 0;
            while (doNextIteration(currentDate, recurrenceStartDate, options.max, rule, iteration)) {
                iteration++;
                iterationResult = pushToResult(iteration, iterationResult, currentDate, i, config);
                currentDate = incrementDate(currentDate, recurrenceStartDate, rule, i)
            }
        })
    }
    if (rule.bysetpos) {
        each(iterationResult, function(iterationIndex, iterationDates) {
            iterationResult[iterationIndex] = filterDatesBySetPos(iterationDates, rule.bysetpos)
        })
    }
    each(iterationResult, function(_, iterationDates) {
        result = result.concat(iterationDates)
    });
    result.sort(function(a, b) {
        return a - b
    });
    return result
}

function pushToResult(iteration, iterationResult, currentDate, i, config, verifiedField) {
    if (!iterationResult[iteration]) {
        iterationResult[iteration] = []
    }
    if (checkDate(currentDate, i, config, verifiedField)) {
        iterationResult[iteration].push(currentDate)
    }
    return iterationResult
}

function checkDate(currentDate, i, config, verifiedField) {
    if (!dateIsRecurrenceException(currentDate, config.exception)) {
        var duration = dateUtils.sameDate(currentDate, config.recurrenceEndDate) && config.recurrenceEndDate.getTime() > currentDate.getTime() ? config.recurrenceEndDate.getTime() - currentDate.getTime() : config.duration;
        if (currentDate.getTime() >= config.recurrenceStartDate.getTime() && currentDate.getTime() + duration > config.min.getTime()) {
            return verifiedField || checkDateByRule(currentDate, [config.dateRules[i]], config.rule.wkst)
        }
    }
    return false
}

function filterDatesBySetPos(dates, bySetPos) {
    var resultArray = [];
    bySetPos.split(",").forEach(function(index) {
        index = Number(index);
        var dateIndex = index > 0 ? index - 1 : dates.length + index;
        if (dates[dateIndex]) {
            resultArray.push(dates[dateIndex])
        }
    });
    return resultArray
}

function correctDate(originalDate, date) {
    if (originalDate.getDate() !== date) {
        originalDate.setDate(date)
    }
}

function incrementDate(date, originalStartDate, rule, iterationStep) {
    var initialDate = new Date(date);
    var needCorrect = true;
    date = dateUtils.addInterval(date, rule.interval);
    if ("DAILY" === rule.freq && !isDefined(rule.byhour) && originalStartDate.getHours() !== date.getHours()) {
        date = new Date(date.getTime() - (initialDate.getHours() - originalStartDate.getHours()) * toMs("hour"))
    }
    if ("MONTHLY" === rule.freq && !rule.byday) {
        var expectedDate = originalStartDate.getDate();
        if (rule.bymonthday) {
            expectedDate = Number(rule.bymonthday.split(",")[iterationStep]);
            if (expectedDate < 0) {
                initialDate.setMonth(initialDate.getMonth() + 1, 1);
                dateSetterMap.bymonthday(initialDate, expectedDate);
                date = initialDate;
                needCorrect = false
            }
        }
        needCorrect && correctDate(date, expectedDate)
    }
    if ("YEARLY" === rule.freq) {
        if (rule.byyearday) {
            var dayNumber = Number(rule.byyearday.split(",")[iterationStep]);
            dateSetterMap.byyearday(date, dayNumber)
        }
        var dateRules = splitDateRules(rule);
        for (var field in dateRules[iterationStep]) {
            dateSetterMap[field] && dateSetterMap[field](date, dateRules[iterationStep][field], rule.wkst)
        }
    }
    return date
}

function getDatePartDiffs(date1, date2) {
    return {
        years: date1.getFullYear() - date2.getFullYear(),
        months: date1.getMonth() - date2.getMonth(),
        days: date1.getDate() - date2.getDate(),
        hours: date1.getHours() - date2.getHours(),
        minutes: date1.getMinutes() - date2.getMinutes(),
        seconds: date1.getSeconds() - date2.getSeconds()
    }
}

function getRecurrenceRule(recurrence) {
    var result = {
        rule: {},
        isValid: false
    };
    if (recurrence) {
        result.rule = parseRecurrenceRule(recurrence);
        result.isValid = validateRRule(result.rule, recurrence)
    }
    return result
}
var loggedWarnings = [];

function validateRRule(rule, recurrence) {
    if (brokenRuleNameExists(rule) || inArray(rule.freq, freqNames) === -1 || wrongCountRule(rule) || wrongIntervalRule(rule) || wrongDayOfWeek(rule) || wrongByMonthDayRule(rule) || wrongByMonth(rule) || wrongUntilRule(rule)) {
        logBrokenRule(recurrence);
        return false
    }
    return true
}

function wrongUntilRule(rule) {
    var wrongUntil = false;
    var until = rule.until;
    if (void 0 !== until && !(until instanceof Date)) {
        wrongUntil = true
    }
    return wrongUntil
}

function wrongCountRule(rule) {
    var wrongCount = false;
    var count = rule.count;
    if (count && "string" === typeof count) {
        wrongCount = true
    }
    return wrongCount
}

function wrongByMonthDayRule(rule) {
    var wrongByMonthDay = false;
    var byMonthDay = rule.bymonthday;
    if (byMonthDay && isNaN(parseInt(byMonthDay))) {
        wrongByMonthDay = true
    }
    return wrongByMonthDay
}

function wrongByMonth(rule) {
    var wrongByMonth = false;
    var byMonth = rule.bymonth;
    if (byMonth && isNaN(parseInt(byMonth))) {
        wrongByMonth = true
    }
    return wrongByMonth
}

function wrongIntervalRule(rule) {
    var wrongInterval = false;
    var interval = rule.interval;
    if (interval && "string" === typeof interval) {
        wrongInterval = true
    }
    return wrongInterval
}

function wrongDayOfWeek(rule) {
    var daysByRule = daysFromByDayRule(rule);
    var brokenDaysExist = false;
    each(daysByRule, function(_, day) {
        if (!Object.prototype.hasOwnProperty.call(days, day)) {
            brokenDaysExist = true;
            return false
        }
    });
    return brokenDaysExist
}

function brokenRuleNameExists(rule) {
    var brokenRuleExists = false;
    each(rule, function(ruleName) {
        if (inArray(ruleName, ruleNames) === -1) {
            brokenRuleExists = true;
            return false
        }
    });
    return brokenRuleExists
}

function logBrokenRule(recurrence) {
    if (inArray(recurrence, loggedWarnings) === -1) {
        errors.log("W0006", recurrence);
        loggedWarnings.push(recurrence)
    }
}

function parseRecurrenceRule(recurrence) {
    var ruleObject = {};
    var ruleParts = recurrence.split(";");
    for (var i = 0, len = ruleParts.length; i < len; i++) {
        var rule = ruleParts[i].split("=");
        var ruleName = rule[0].toLowerCase();
        var ruleValue = rule[1];
        ruleObject[ruleName] = ruleValue
    }
    var count = parseInt(ruleObject.count);
    if (!isNaN(count)) {
        ruleObject.count = count
    }
    if (ruleObject.interval) {
        var interval = parseInt(ruleObject.interval);
        if (!isNaN(interval)) {
            ruleObject.interval = interval
        }
    } else {
        ruleObject.interval = 1
    }
    if (ruleObject.freq && ruleObject.until) {
        ruleObject.until = getDateByAsciiString(ruleObject.until)
    }
    return ruleObject
}

function getDateByAsciiString(string, initialDate) {
    if ("string" !== typeof string) {
        return string
    }
    var arrayDate = string.match(/(\d{4})(\d{2})(\d{2})(T(\d{2})(\d{2})(\d{2}))?(Z)?/);
    if (!arrayDate) {
        return null
    }
    var isUTC = void 0 !== arrayDate[8];
    var currentOffset = initialDate ? initialDate.getTimezoneOffset() : resultUtils.getTimeZoneOffset();
    var date = new(Function.prototype.bind.apply(Date, prepareDateArrayToParse(arrayDate)));
    currentOffset = 6e4 * currentOffset;
    if (isUTC) {
        date = new Date(date.getTime() - currentOffset)
    }
    return date
}

function prepareDateArrayToParse(arrayDate) {
    arrayDate.shift();
    if (void 0 === arrayDate[3]) {
        arrayDate.splice(3)
    } else {
        arrayDate.splice(3, 1);
        arrayDate.splice(6)
    }
    arrayDate[1]--;
    arrayDate.unshift(null);
    return arrayDate
}

function daysFromByDayRule(rule) {
    var result = [];
    if (rule.byday) {
        if (Array.isArray(rule.byday)) {
            result = rule.byday
        } else {
            result = rule.byday.split(",")
        }
    }
    return result
}

function getAsciiStringByDate(date) {
    var currentOffset = 6e4 * resultUtils.getTimeZoneOffset();
    date = new Date(date.getTime() + currentOffset);
    return date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + "T" + ("0" + date.getHours()).slice(-2) + ("0" + date.getMinutes()).slice(-2) + ("0" + date.getSeconds()).slice(-2) + "Z"
}

function splitDateRules(rule) {
    var firstDayOfWeek = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
    var result = [];
    if (isDefined(firstDayOfWeek)) {
        rule.fdow = firstDayOfWeek
    }
    if (!rule.wkst) {
        rule.wkst = isDefined(firstDayOfWeek) ? daysNames[firstDayOfWeek] : "MO"
    }
    if (rule.byweekno && !rule.byday) {
        var dayNames = Object.keys(days);
        for (var i = 0; i < days[rule.wkst]; i++) {
            dayNames.push(dayNames.shift())
        }
        rule.byday = dayNames.join(",")
    }
    for (var field in dateSetterMap) {
        if (!rule[field]) {
            continue
        }
        var ruleFieldValues = rule[field].split(",");
        var ruleArray = getDateRuleArray(field, ruleFieldValues);
        result = result.length ? extendObjectArray(ruleArray, result) : ruleArray
    }
    return result
}

function getDateRuleArray(field, values) {
    var result = [];
    for (var i = 0, length = values.length; i < length; i++) {
        var dateRule = {};
        dateRule[field] = handleRuleFieldValue(field, values[i]);
        result.push(dateRule)
    }
    return result
}

function handleRuleFieldValue(field, value) {
    var result = parseInt(value);
    if ("bymonth" === field) {
        result -= 1
    }
    if ("byday" === field) {
        result = days[value]
    }
    return result
}

function extendObjectArray(firstArray, secondArray) {
    var result = [];
    for (var i = 0, firstArrayLength = firstArray.length; i < firstArrayLength; i++) {
        for (var j = 0, secondArrayLength = secondArray.length; j < secondArrayLength; j++) {
            result.push(extend({}, firstArray[i], secondArray[j]))
        }
    }
    return result
}

function getDatesByRules(dateRules, startDate, rule) {
    var result = [];
    for (var i = 0, len = dateRules.length; i < len; i++) {
        var current = dateRules[i];
        var updatedDate = prepareDate(startDate, dateRules, rule.wkst);
        for (var field in current) {
            dateSetterMap[field] && dateSetterMap[field](updatedDate, current[field], rule.wkst, rule.freq, rule.fdow)
        }
        if (Array.isArray(updatedDate)) {
            result = result.concat(updatedDate)
        } else {
            result.push(new Date(updatedDate))
        }
    }
    if (!result.length) {
        result.push(startDate)
    }
    return result
}

function getDatesByCount(dateRules, startDate, recurrenceStartDate, rule) {
    var result = [];
    var count = rule.count;
    var counter = 0;
    var date = prepareDate(startDate, dateRules, rule.wkst);
    while (counter < count) {
        var dates = getDatesByRules(dateRules, date, rule);
        var checkedDates = [];
        var i = void 0;
        for (i = 0; i < dates.length; i++) {
            if (dates[i].getTime() >= recurrenceStartDate.getTime()) {
                checkedDates.push(dates[i])
            }
        }
        var length = checkedDates.length;
        counter += length;
        var delCount = counter - count;
        if (counter > count) {
            checkedDates.splice(length - delCount, delCount)
        }
        for (i = 0; i < checkedDates.length; i++) {
            result.push(checkedDates[i])
        }
        var interval = rule.interval;
        if ("days" === Object.keys(interval)[0]) {
            interval = {
                weeks: 1
            }
        }
        date = dateUtils.addInterval(date, interval)
    }
    return result
}

function prepareDate(startDate, dateRules, weekStartRule) {
    var date = new Date(startDate);
    var day = date.getDay();
    if (dateRules.length && isDefined(dateRules[0].byday)) {
        date.setDate(date.getDate() - day + days[weekStartRule] - (day < days[weekStartRule] ? 7 : 0))
    } else {
        date.setDate(1)
    }
    return date
}

function checkDateByRule(date, rules, weekStart) {
    var result = false;
    for (var i = 0; i < rules.length; i++) {
        var current = rules[i];
        var currentRuleResult = true;
        for (var field in current) {
            var processNegative = "bymonthday" === field && current[field] < 0;
            if (dateGetterMap[field] && !processNegative && current[field] !== dateGetterMap[field](date, weekStart)) {
                currentRuleResult = false
            }
        }
        result = result || currentRuleResult
    }
    return result || !rules.length
}
var getRecurrenceString = function(object) {
    if (!object || !object.freq) {
        return
    }
    var result = "";
    for (var field in object) {
        var value = object[field];
        if ("interval" === field && value < 2) {
            continue
        }
        if ("until" === field) {
            value = getAsciiStringByDate(value)
        }
        result += field + "=" + value + ";"
    }
    result = result.substring(0, result.length - 1);
    return result.toUpperCase()
};
extend(resultUtils, {
    getRecurrenceString: getRecurrenceString,
    getRecurrenceRule: getRecurrenceRule,
    getAsciiStringByDate: getAsciiStringByDate,
    getDatesByRecurrence: getDatesByRecurrence,
    dateInRecurrenceRange: dateInRecurrenceRange,
    getDateByAsciiString: getDateByAsciiString,
    daysFromByDayRule: daysFromByDayRule,
    getTimeZoneOffset: getTimeZoneOffset
});
module.exports = resultUtils;
