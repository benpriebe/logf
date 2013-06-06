# logf
A javascript logging framework with pretty colors, timestamps and filtering. 
It works really well with Chrome and does ok with Firebug and Firebug lite.
It has been written to work with/without requireJS.

logf was conceived to replace the DurandalJS system.log function and provide a unified logger for 
DurandalJS Single Page Apps (SPAs) (see section of using with DurandalJS)

## Demo
Demo can be found at http://benpriebe.github.io/logf/index.html

## NuGet Gallery
todo:

## Quick start

###3 Easy Steps
For other API calls, see the [demo]((http://benpriebe.github.io/logf/index.html)).

1. Link to logf.js `<script src="logf.js"></script>`

2. use logf to display a log for log, debug, info, warn or error

```javascript
// Display a console.info log
logf.info('Are you the 6 fingered man?')
```

3. add a filter to the window.logfilter property to restrict log messages that contain that filter.

```javascript
window.logfilter = /trigger/
logf.event('toiletFlushed triggered.'); // will be output
logf.event('toiletFlushed subscribed.'); // will not be output

window.logfilter = "trig"
logf.event('toiletFlushed triggered.'); // will be output
logf.event('toiletFlushed subscribed.'); // will not be output
```

### Other Options

#### Create custom log types

It may be useful to create a custom log type to log a specific category of message. 
An example of this might be when you wish to log event publish/subscribe events.

To add your own custom log types, decide on a name, the color you wish it to show in the console with (if supported) and
console method to use (log, debug, warn, info, error).

```javascript
logf.addType('event', 'blue', 'info');
logf.event('toiletFlushed triggered.');
```

The following message will be output using console.info method.

```event: toiletFlushed triggered.```

#### Logging objects to the console

There are two ways to log objects to the logger. 

```javascript
logf.info("Here is my message", { id: 1, name: "sample name", nested: {}});
```

```12:34:19:063: Here is my message > Object {id: 1, name: "sample name", nested: Object}```

```javascript
logf.info("Here is my message - o%", { id: 1, name: "sample name", nested: {}});
```

```12:34:19:063: Here is my message > Object```

```javascript
logf.info("Here is my o% - message", { id: 1, name: "sample name", nested: {}});
```

```12:34:19:063: Here is my > Object message```


#### Switch Loggers On|Off

```javascript
logf.on("all");
logf.off("all");
logf.off("debug");
logf.off("debug, info");
logf.on("debug, info");
```
	
#### Show|Hide Timestamps

```javascript
logf.showTimestamps = true|false;
```
	
#### Enable Styles (coloring of log types)

Only, google chrome and the full version of Firefox Firebug support css styling of console output. 

```javascript
logf.stylesEnabled = true|false;
```

### Using *logf* with DurandalJS apps

In a typical DurandalJS app you would set turn on Durandal framework log messages by setting debug to true.

```javascript
 system.debug(true);
```

Output from ```system.log``` calls is collapsed by default requiring user interaction to actually see what objects have been logged.

e.g. The user has to expand the output to see that properties and values from a system.log call.

```["Activating Route", Object, ViewModel, Sammy.Object]```

When using *logf* to replace DurandalJSs logging, the output shows more detail at a glance without requiring user
interaction to see more.

```
system: Activating Route Object {name: "Login", url: "login", moduleId: "viewmodels/login", caption: "<i class="icon-search"></i> Login", visible: false…} ViewModel {route: function, router: Object, app: Object, system: Object, config: Object…} Sammy.Object {routeInfo: Object, router: Object, escapeHTML: function, h: function, toHash: function…}
```  

To replace the system.log function in DurandalJS with *logf* just add the following lines of code in your main.js

NOTE: Be sure to require *logf* as a dependency first.

```javascript
// create the custom log type - system
logf.addType("system", "green", "log");
// reassigning the system.logger to custom logger. this replaces -> system.debug(true);
system.log = logf.system;
```

## Authors
**Ben Priebe**

+ http://twitter.com/benpriebe

**Gerrod Thomas**

+ http://twitter.com/gerrod


## Copyright
Copyright © 2013 [Ben Priebe](http://twitter.com/benpriebe) & [Gerrod Thomas](http://twitter.com/gerrod).

## License 
logf is under MIT license - http://www.opensource.org/licenses/mit-license.php




