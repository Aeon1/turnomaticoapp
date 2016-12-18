// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
var devicex="";
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {    
    window.DatecsPrinter.listBluetoothDevices(
  function (devices) {
    devicex=devices[0].address;
  },
  function (error) {
    alert(JSON.stringify(error));
  }
);

     
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page
    


})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

})
// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {

        window.DatecsPrinter.disconnect();
      bluetoothSerial.connect(devicex, 
                function(){
                    var data='<epos-print xmlns="http://www.epson-pos.com/schemas/2011/03/epos-print"><text lang="en"/><text smooth="true"/><text font="font_a"/><text width="4" height="4"/><text reverse="false" ul="false" em="true"/><text>Hello,&#9;World!&#10;</text><cut type="feed"/></epos-print>';
                    bluetoothSerial.write(data, 
                    function(){bluetoothSerial.disconnect();}, 
                    function(){alert("error");});
                }
            , function(){alert("fallo la conexcion");});





})

