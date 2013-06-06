# logf
**logf** A javascript logging framework with pretty colors, timestamps and filtering. It has been written to work with/without requireJS.


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

3. use logf to define your own log types - e.g. events, system

    	```javascript
    	logf.addType('event', 'blue', 'info');
    	logf.event('event:toiletFlushed triggered.');
    	````

### Other Options

#### Switch Loggers On|Off

	```javascript
	logf.on("all");
	logf.off("all");
	logf.off("debug");
	logf.off("debug, info");
	long.on("debug, info");
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




