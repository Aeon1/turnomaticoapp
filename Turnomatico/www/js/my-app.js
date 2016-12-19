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
    //window.DatecsPrinter.listBluetoothDevices(
//  function (devices) {
//    devicex=devices[0].address;
//  },
//  function (error) {
//    alert(JSON.stringify(error));
//  }
//);

     
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
    //    window.DatecsPrinter.disconnect();
//      bluetoothSerial.connect(devicex, 
//                function(){
//                    bluetoothSerial.write([0x1c , 0x21, 0x48 ,0x1d,0x21,2,0x1b,0x61,1], 
//                    function(){  
//                        bluetoothSerial.write("Audios \r\n",function(){
//                           bluetoothSerial.write([0x01B, 0x64, 3, 0x1d, 0x56, 0x00], 
//                    function(){bluetoothSerial.disconnect();}, 
//                    function(){alert("error");}); 
//                        },function(){alert("error")});
//                    }, 
//                    function(){alert("error");});
//                }
//            , function(){alert("fallo la conexcion");});
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
    //tamaño=0x1d,0x21,0-8
    //centrar=0x1b,0x61,1
    //cortar=0x1d,0x56, 0x00
    //salto=0x01B, 0x64, n
    var turno="A-001";
    var servicio="Canje de placas";
    var hora="10:00 PM";
    var fecha="19/12/2016";
    window.DatecsPrinter.listBluetoothDevices(
  function (devices) {//
//    devicex=devices[0].address;
    bluetoothSerial.connect(devices[0].address, 
                function(){
                    bluetoothSerial.write([0x1b,0x21,0,0x1b,0x61,1,0x1d,0x21,112,]);
                    bluetoothSerial.write("Gobierno\r\n");
                    
                   // bluetoothSerial.write([0x1b,0x21,0,0x1b,0x61,1,0x1d,0x21,2]);
//                    bluetoothSerial.write("Gobierno del Estado de Sinaloa\r\n");
//                    bluetoothSerial.write([0x1d,0x21,1]);
//                    bluetoothSerial.write("USE\r\n\n");
//                    bluetoothSerial.write([0x1d,0x21,0]);
//                    bluetoothSerial.write("Numero de turno:\r\n\n");
//                    bluetoothSerial.write([0x1d,0x21,2]);
//                    bluetoothSerial.write(turno+"\r\n\n");
//                    bluetoothSerial.write([0x1d,0x21,0]);
//                    bluetoothSerial.write("Servicio:"+servicio+"\r\n\n\n");
//                    bluetoothSerial.write([0x1d,0x21,0]);
//                    bluetoothSerial.write("Hora:"+hora+"\r\n");
//                    bluetoothSerial.write("Fecha:"+fecha+"\r\n");
                    bluetoothSerial.write([0x01B, 0x64, 5, 0x1d, 0x56, 0x00],
                    function(){
                        bluetoothSerial.disconnect(function(){alert("desconectado");},function(){alert("no se pudo desconectar");});
                    },
                    function(error){alert(error);}
                    );
                }
            , function(){alert("fallo la conexcion");});
            },
  function (error) {
    alert(JSON.stringify(error));
  }
);
//  window.DatecsPrinter.connect(devicex, 
//      function() {
//var canvas = document.createElement('canvas');
//      canvas.height = 80;
//      canvas.width = 400;
//      var ctx = canvas.getContext('2d');
//      ctx.fillStyle = "#FFFFFF";
//      ctx.fillRect(0, 0, 400, 80);
//       
//    ctx.fillStyle="#000000";
//    ctx.textAlign = "center"; 
//    ctx.font = "bold 50px Avenir";
//    ctx.fillText("Gobierno del Estado de Sinaloa", 200, 50,400);
//    ctx.font = "20px avenir";
//    ctx.fillText("USE", 200,70);
//    //ctx.font = "10px Avenir";
////    ctx.fillText("Número de turno;", 75,120);
////    ctx.font = "20px Avenir";
////    ctx.fillText("A-02", 75,170);
////    ctx.font = "10px Avenir";
////    ctx.fillText("Servicio:", 75,200);
////    ctx.font = "bold 10px Avenir";
////    ctx.fillText("Canje de placas", 75,220);
////    ctx.font = "10px Avenir";
////    ctx.fillText("Hora: 10:00 PM.", 75,250);
////    ctx.font = "10px Avenir";
////    ctx.fillText("Fecha: 18/dic/2016", 75,280);
//    var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
//    window.DatecsPrinter.printImage(
//        imageData, //base64 
//        canvas.width, 
//        canvas.height, 
//        1, 
//    function() {         
//          window.DatecsPrinter.disconnect(function(){alert("cortar");},function(){alert('mal');});
//        bluetoothSerial.connect(devicex, 
//                function(){
//                    bluetoothSerial.write([0x01B, 0x64, 10, 0x1d, 0x56, 0x00], 
//                    function(){bluetoothSerial.disconnect();}, 
//                    function(){alert("error");});
//                }
//            , function(){alert("fallo la conexcion");});
//        
//          },
//          function(error) {
//              alert(JSON.stringify(error));
//          }
//      ) 
//
//      },
//      function() {
//        alert(JSON.stringify(error));
//      }
//    );

}


