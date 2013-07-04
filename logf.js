/*
 * Copyright 2013 Ben Priebe and Gerrod Thomas.
 * All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Ben Priebe and Gerrod Thomas
 * Project: https://github.com/benpriebe/logf
 */
;
(function (define) {
    define(function () {
        window.logfilter = window.logfilter || "";

        // Ensure we have a forEach for older browsers
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (fn) {
                for (var i = 0; i < this.length; i++) {
                    fn(this[i]);
                }
            };
        }

        var logf = {
            on: on,
            off: off,
            addType: addType,
            showTimestamps: true,
            stylesEnabled: true
        };

        var loggers = {};
        createLogger("", "#666", "log");
        createLogger("debug", "#777", "debug");
        createLogger("info", "blue", "info");
        createLogger("warn", "orange", "warn", true);
        createLogger("error", "red", "error", true);

        // Add custom log types.
        // e.g.    addType("event", "pink", "info");
        // usage:  flog.event("your log message");
        function addType(name, color, consoleMethod) {
            createLogger(name, color, consoleMethod);

            return logf[name];
        }

        function on() {
            setActive.call(this, true, Array.prototype.slice.call(arguments, 0));
        }

        function off() {
            setActive.call(this, false, Array.prototype.slice.call(arguments, 0));
        }

        function setActive(isActive, names) {
            names.forEach(function (name) {
                if (name == "all") {
                    for (prop in loggers) {
                        loggers[prop] = isActive;
                    }

                } else {
                    loggers[name] = isActive;
                }
            });

            return logf;
        }

        function isLoggerActive(logger) {
            return loggers.hasOwnProperty(logger) && loggers[logger];
        }

        function createLogger(type, color, logger, includeStack) {
            var loggerName = type || logger;

            var impl = function () {
                if (!isLoggerActive(loggerName))
                    return;

                var args = Array.prototype.slice.call(arguments, 0);

                if (logf.showTimestamps) {
                    if (logf.stylesEnabled) {
                        args[0] = str.format("%c{0}%c{1}{2}{3}%c{4}", getTimestamp(), window.logfilter ? ">> " : "", type, type ? ": " : "", args[0]);
                        args.splice(1, 0, "color: #666");
                        args.splice(2, 0, "color: " + color);
                        args.splice(3, 0, "color: black;");
                    } else {
                        args[0] = str.format("{0}{1}{2}{3}{4}", getTimestamp(), window.logfilter ? ">> " : "", type, type ? ": " : "", args[0]);
                    }

                } else {
                    if (logf.stylesEnabled) {
                        args[0] = str.format("%c{0}{1}{2}%c{3}", window.logfilter ? ">> " : "", type, type ? ": " : "", args[0]);
                        args.splice(1, 0, "color: " + color);
                        args.splice(2, 0, "color: black;");
                    } else {
                        args[0] = str.format("{0}{1}{2}{3}", window.logfilter ? ">> " : "", type, type ? ": " : "", args[0]);
                    }
                }

                if (filter.apply(this, args)) {
                    console[logger].apply(console, args);

                    if (includeStack)
                        console.trace();
                }
            };

            logf[loggerName] = impl;
            loggers[loggerName] = true;

            return true;
        }

        function getTimestamp() {
            var timestamp = new Date();
            return str.format("{0}:{1}:{2}:{3}: ",
                str.zeroPad(timestamp.getHours(), 2),
                str.zeroPad(timestamp.getMinutes(), 2),
                str.zeroPad(timestamp.getSeconds(), 2),
                str.zeroPad(timestamp.getMilliseconds(), 3));
        }

        function filter() {
            if (!window.logfilter)
                return true;

            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (typeof arg == "string" && arg.match(window.logfilter))
                    return true;
            }

            return false;
        }

        var str = {
            format: function (value) {
                if (!value)
                    return value;

                var args = Array.prototype.slice.call(arguments, 1);
                return value.replace(/{(\d+)}/g, function (match, number) {
                    return typeof args[number] != 'undefined'
                        ? args[number]
                        : match;
                });
            },

            pad: function (value, length, padCharacter) {
                if (!(length && padCharacter))
                    return value;

                if (!value)
                    value = "";

                if (typeof value !== "string")
                    value = value.toString();

                if (value.length >= length)
                    return value;

                var result = [];
                var index = length - 1;

                for (var i = value.length - 1; i >= 0; i--) {
                    result[index] = value.charAt(i);
                    index--;
                }

                while (index >= 0) {
                    result[index] = padCharacter;
                    index--;
                }

                return result.join("");
            },

            zeroPad: function (value, length) {
                return str.pad(value, length, "0");
            }
        };

        return logf;
    });
}
(typeof define === 'function' && define.amd ? define : function (factory) {
    window['logf'] = factory();
}));