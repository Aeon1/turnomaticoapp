Cordova IOS-Bluetooth-Print plugin
==================================

## Description
This plugin is based on ePOS-Print SDK for iOS

## Adding the Plugin to your project
Through the [Command-line Interface](http://cordova.apache.org/docs/en/3.0.0/guide_cli_index.md.html#The%20Command-line%20Interface):

```bash
cordova plugin add https://github.com/Natalia21/phoneGapIOSPrintingPlugin.git
cordova build
```

## Removing the Plugin from your project

```bash
cordova plugin rm intspirit.cordova.plugin.printer
```


## Using the plugin
The plugin creates the object ```window.plugin.printer``` with 2 methods:

```javascript
/*
*
* @param {successCallback}
*		 Will be called if any printer found
*  		 with array of available printers names as @param
*
* @param {errorCallback}
*		 Will be called if no printers found
* 		 or operation is failed
*
*/

window.plugin.printer.getAvailablePriners(successCallback, errorCallback);

/*
*
* @param {content}
* 		 HTML string that you would like to print
*
* @param {chosenPrinter}
* 		 Chosen printer from array that have been returned 
*		 from getAvailablePriners() function
*
* @param {successCallback}
* 		 Will be called when document is send for print
*		 
* @param {errorCallback}
* 		 Will be called if print is failed
*
*/

window.plugin.printer.print(content, chosenPrinter, successCallback, errorCallback);
```

### Printing 

** Below example uses print share app for printing files.
```javascript

	var chosenPrinter = null;

	window.plugin.printer.getAvailablePriners(function(printers) {
		console.log('found printers: ', printers);
		chosenPrinter = printers[0];
	}, function(error) {
		console.log(error);
	});

	window.plugin.printer.print('content', chosenPrinter, function() {
		console.log('documend is send to print');
	}, function(error) {
		console.log(error);
	});

```


## License

This software is released under the [Apache 2.0 License](http://opensource.org/licenses/Apache-2.0).
