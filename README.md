# logf
**logf** A javascript logging framework with pretty colors, timestamps and filtering. 
It works really well with Chrome and does ok with Firebug and Firebug lite.
It has been written to work with/without requireJS.


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

## Authors
**Ben Priebe**

+ http://twitter.com/benpriebe

**Gerrod Thomas**

+ http://twitter.com/gerrodthomas


## Copyright
Copyright © 2013 [Ben Priebe](http://twitter.com/benpriebe) & [Gerrod Thomas](http://twitter.com/gerrod).

## License 
logf is under MIT license - http://www.opensource.org/licenses/mit-license.php




