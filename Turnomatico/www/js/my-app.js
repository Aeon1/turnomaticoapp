// Initialize app
var myApp = new Framework7({material:true});


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
$$(document).on('pageInit', '.page[data-page="aboutx"]', function (e) {
//centrado= 0x1b,0x61,1
        window.DatecsPrinter.disconnect();
      bluetoothSerial.connect(devicex, 
                function(){
                    bluetoothSerial.write([0x1d,0x21,3,0x1d,0x21,5,0x1b,0x61,1,0x01B,0x2d,0], 
                    function(){  
                        bluetoothSerial.write(" Audios \r\n",function(){
                           bluetoothSerial.write([0x01B, 0x64, 10, 0x1d, 0x56, 0x00], 
                    function(){bluetoothSerial.disconnect();}, 
                    function(){alert("error");}); 
                        },function(){alert("error")});
                    }, 
                    function(){alert("error");});
                }
            , function(){alert("fallo la conexcion");});
})
function pressbtn(num){
    var actual=$$("input#numero_celular").val();
    if(actual.length<10){
        if(actual!=""){
        valor=actual+num;
        $$("input#numero_celular").val(valor);
        }else{
            $$("input#numero_celular").val(num);
        }
    }
}
function borrar(){
    
    var actual=$$("input#numero_celular").val();
    $$("input#numero_celular").val(actual.substring(0,actual.length-1));
}
function imprimir(){
  window.DatecsPrinter.connect(devicex, 
      function() {
           var canvas = document.createElement('canvas');
      canvas.height = 200;
      canvas.width = 300;
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, 300, 200);
      ctx.fillStyle="#000000";
      ctx.font = "30px Georgia";
    ctx.textAlign = "center"; 
    ctx.fillText("Lorem Ipsum", 150, 50,190);
    ctx.font = "15px Verdana";
    ctx.fillText("A-001", 150,100);
    ctx.font = "4px Verdana";
    ctx.fillText("Tome asiento, en un momento sera llamado", 150,140);
      var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  window.DatecsPrinter.printImage(
          imageData, //base64 
          canvas.width, 
          canvas.height, 
          1, 
          function() {
            window.DatecsPrinter.disconnect();
        bluetoothSerial.connect(devicex, 
                function(){
                    bluetoothSerial.write([0x01B, 0x64, 10, 0x1d, 0x56, 0x00], 
                    function(){bluetoothSerial.disconnect();}, 
                    function(){alert("error");});
                }
            , function(){alert("fallo la conexcion");});
          },
          function(error) {
              alert(JSON.stringify(error));
          }
      ) 
      },
      function() {
        alert(JSON.stringify(error));
      }
    );

}

// window.DatecsPrinter.printText("hola", 'ISO-8859-1', 
//        function() {
//          window.DatecsPrinter.disconnect();
//        bluetoothSerial.connect(devicex, 
//                function(){
//                    bluetoothSerial.write([0x01B, 0x64, 10, 0x1d, 0x56, 0x00], 
//                    function(){bluetoothSerial.disconnect();}, 
//                    function(){alert("error");});
//                }
//            , function(){alert("fallo la conexcion");});
//        }
//      );
