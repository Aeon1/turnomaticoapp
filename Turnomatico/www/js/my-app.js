// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    //Create an ePOS-Print Builder object

 
     
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
 window.DatecsPrinter.listBluetoothDevices(
  function (devices) {
    window.DatecsPrinter.connect(devices[0].address, 
      function() {
        printSomeTestText();
         var builder = new epson.ePOSBuilder();
         builder.addCut(builder.CUT_FEED);

      },
      function() {
        alert(JSON.stringify(error));
      }
    );
  },
  function (error) {
    alert(JSON.stringify(error));
  }
);
 
function printSomeTestText() {
var data = "hello world"+[0x01B, 0x64, 10];
var buffer = new Uint8Array(data).buffer;
var corte="PGN1dC8+";
  window.DatecsPrinter.printText(String.fromCharCode(27)+" d 10 ", 'ISO-8859-1', 
    function() {
        alert("impreso");
      //printMyImage();
    }
  );
}
 
function printMyImage() {
  var image = new Image();
  image.src = 'img/imagen.jpg';
  image.onload = function() {
      var canvas = document.createElement('canvas');
      canvas.height = 100;
      canvas.width = 100;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype 
      
      window.DatecsPrinter.printImage(
          imageData, //base64 
          canvas.width, 
          canvas.height, 
          1, 
          function() {
            printMyBarcode();
          },
          function(error) {
              alert(JSON.stringify(error));
          }
      )
  };
}
 
function printMyBarcode() {
  window.DatecsPrinter.printBarcode(
    75, //here goes the barcode type code 
    '13132498746313210584982011487', //your barcode data 
    function() {
      alert('success!');
    },
    function() {
      alert(JSON.stringify(error));
    }
  );
}

})
