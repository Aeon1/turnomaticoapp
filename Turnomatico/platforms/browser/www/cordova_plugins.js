cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-datecs-printer/www/printer.js",
        "id": "cordova-plugin-datecs-printer.DatecsPrinter",
        "pluginId": "cordova-plugin-datecs-printer",
        "clobbers": [
            "DatecsPrinter"
        ]
    },
    {
        "file": "plugins/intspirit.cordova.plugin.printer/www/printer.js",
        "id": "intspirit.cordova.plugin.printer.NPrinter",
        "pluginId": "intspirit.cordova.plugin.printer",
        "clobbers": [
            "plugin.printer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-statusbar": "1.0.1",
    "cordova-plugin-datecs-printer": "0.5.0",
    "intspirit.cordova.plugin.printer": "0.0.1"
}
// BOTTOM OF METADATA
});