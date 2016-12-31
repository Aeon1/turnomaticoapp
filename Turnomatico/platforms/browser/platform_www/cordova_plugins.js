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
    },
    {
        "file": "plugins/com.iigservices.cordova.plugin/www/SignaturePrinter.js",
        "id": "com.iigservices.cordova.plugin.SignaturePrinter",
        "pluginId": "com.iigservices.cordova.plugin",
        "clobbers": [
            "cordova.plugins.SignaturePrinter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
        "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
        "pluginId": "cordova-plugin-bluetooth-serial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "file": "plugins/cordova-plugin-bluetooth-serial/src/browser/bluetoothSerial.js",
        "id": "cordova-plugin-bluetooth-serial.BluetoothSerial_browser",
        "pluginId": "cordova-plugin-bluetooth-serial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "file": "plugins/cordova-plugin-socket-scrutinizer/www/SocketConnection.js",
        "id": "cordova-plugin-socket-scrutinizer.SocketConnection",
        "pluginId": "cordova-plugin-socket-scrutinizer",
        "clobbers": [
            "SocketConnection"
        ]
    },
    {
        "file": "plugins/cz.blocshop.socketsforcordova/socket.js",
        "id": "cz.blocshop.socketsforcordova.Socket",
        "pluginId": "cz.blocshop.socketsforcordova",
        "clobbers": [
            "window.Socket"
        ]
    },
    {
        "file": "plugins/cordova-plugin-preventsleep/www/client.js",
        "id": "cordova-plugin-preventsleep.client",
        "pluginId": "cordova-plugin-preventsleep",
        "clobbers": [
            "community.preventsleep"
        ]
    },
    {
        "file": "plugins/nl.x-services.plugins.insomnia/www/Insomnia.js",
        "id": "nl.x-services.plugins.insomnia.Insomnia",
        "pluginId": "nl.x-services.plugins.insomnia",
        "clobbers": [
            "window.plugins.insomnia"
        ]
    },
    {
        "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
        "id": "cordova-plugin-fullscreen.AndroidFullScreen",
        "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
            "AndroidFullScreen"
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
    "intspirit.cordova.plugin.printer": "0.0.1",
    "com.iigservices.cordova.plugin": "0.0.1",
    "cordova-plugin-bluetooth-serial": "0.4.6",
    "cordova-plugin-socket-scrutinizer": "0.0.0",
    "cordova-plugin-websocket": "0.12.1",
    "cz.blocshop.socketsforcordova": "1.1.0",
    "cordova-plugin-preventsleep": "1.1.1",
    "nl.x-services.plugins.insomnia": "4.1.0",
    "cordova-plugin-fullscreen": "1.1.0"
}
// BOTTOM OF METADATA
});