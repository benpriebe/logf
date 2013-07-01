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
        var noop = function () { };

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

        var implementations = {
            log: function () {
                logIt("", "#666", "log").apply(this, arguments);
            },

            debug: function () {
                logIt("debug", "#333", "debug").apply(this, arguments);
            },

            info: function () {
                logIt("info", "blue", "info").apply(this, arguments);
            },

            warn: function () {
                logIt("warn", "orange", "warn").apply(this, arguments);
            },

            error: function () {
                logIt("error", "red", "error").apply(this, arguments);
            },
        };

        // Add custom log types.
        // e.g.    addType("event", "pink", "info");
        // usage:  flog.event("your log message");
        function addType(name, color, consoleMethod) {
            var logger = function () {
                logIt(name, color, consoleMethod).apply(this, arguments);
            };

            // turn it on by default
            implementations[name] = logger;
            on(name);

            return logger;
        }

        function on() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.forEach(function (logger) {
                if (logger == "all") {
                    for (prop in implementations) {
                        logf[prop] = implementations[prop];
                    }
                } else {
                    logf[logger] = implementations[logger];
                }
            });

            return logf;
        }

        function off() {
            var args = Array.prototype.slice.call(arguments, 0);
            args.forEach(function (logger) {
                if (logger == "all") {
                    for (prop in implementations) {
                        logf[prop] = noop;
                    }
                } else {
                    logf[logger] = noop;
                }
            });

            return logf;
        }

        function logIt(type, color, logger) {
            return function () {
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

                if (filter.apply(this, args))
                    console[logger].apply(console, args);
            };
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

        // turn the standard loggers on by default
        on("all");
        return logf;
    });
}
(typeof define === 'function' && define.amd ? define : function (factory) {
    window['logf'] = factory();
}));