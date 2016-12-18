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
//centrado= 0x1b,0x61,1
        window.DatecsPrinter.disconnect();
      bluetoothSerial.connect(devicex, 
                function(){
                    bluetoothSerial.write([0x1d,0x21,3,0x1d,0x21,5,0x1b,0x61,1,0x01B,0x2d,0], 
                    function(){
                        var image = new Image();
  image.src = 'img/imagen.jpg';
  image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.height = 100;
      canvas.width = 100;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
      console.log(imageData);
       var binary_string =  window.atob(imageData);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    console.log(bytes.buffer);
    bluetoothSerial.write(bytes.buffer,function(){
                           bluetoothSerial.write([0x01B, 0x64, 10, 0x1d, 0x56, 0x00], 
                    function(){bluetoothSerial.disconnect();}, 
                    function(){alert("error");}); 
                        },function(){alert("error")});
}
                        
                    }, 
                    function(){alert("error");});
                }
            , function(){alert("fallo la conexcion");});





})

