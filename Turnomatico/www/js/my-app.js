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
document.addEventListener('deviceready', function() {
    
//var socket = io('http://192.168.1.68:3000');
//console.log(socket);
//  socket.on('news', function (data) {
//    console.log(data);
//    socket.emit('prueba de conexion', { my: 'data' });
//  });
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
    myApp.showPreloader('Imprimiendo');
    //tama�o=0x1d,0x21,0-7 -120
    //centrar=0x1b,0x61,1
    //cortar=0x1d,0x56, 0x00
    //salto=0x01B, 0x64, n
    //logo centrado funcion FS ( E=0x1c,0x28,0x45,6,0,62,2,0x21,0x48,49,5
    //deshabilitar logo=0x1c,0x28,0x45,4,0,65,2,48-49 top/button,48-49 enabled/disables
    var turno="A-001";
    var servicio="Canje de placas";
    var hora="10:00 PM";
    var fecha="19/12/2016";
    window.DatecsPrinter.listBluetoothDevices(
  function (devices) {
    bluetoothSerial.connect(devices[0].address, 
                function(){
                    bluetoothSerial.write([0x1b,0x21,0,0x1b,0x61,1,0x1d,0x21,2]);
                    bluetoothSerial.write("Gobierno del Estado de Sinaloa\r\n");
                    bluetoothSerial.write([0x1d,0x21,1]);
                    bluetoothSerial.write("USE\r\n\n");
                    bluetoothSerial.write([0x1d,0x21,0]);
                    bluetoothSerial.write("Numero de turno:\r\n\n");
                    bluetoothSerial.write([0x1d,0x21,2]);
                    bluetoothSerial.write(turno+"\r\n\n");
                    bluetoothSerial.write([0x1d,0x21,0]);
                    bluetoothSerial.write("Servicio:"+servicio+"\r\n\n\n");
                    bluetoothSerial.write([0x1d,0x21,0]);
                    bluetoothSerial.write("Hora:"+hora+"\r\n");
                    bluetoothSerial.write("Fecha:"+fecha+"\r\n");
//                    bluetoothSerial.write([0x1c,0x28,0x45,4,0,65,2,48,49]);//deshabilita la impresion de imagen
                    bluetoothSerial.write([0x01B, 0x64, 5, 0x1d, 0x56, 0x00],
                    function(){
                        bluetoothSerial.disconnect(function(){},function(){});
                    },
                    function(error){alert(error);}
                    );
                    myApp.hidePreloader();
                }
            , function(){myApp.hidePreloader();alert("Fallo la conexion con la impresora");});
            },
  function (error) {
    myApp.hidePreloader();
    alert(JSON.stringify(error));
  }
);
}
//validar conexion
function submitNip() {
    var accesCode=$$("#accesscode").val();
      var token =null;
      //8476445
      if(accesCode !== '' && accesCode !== null){
        $$.post('http://192.168.1.68:3000/api/devices/register',{
          nip:{
          nip: accesCode
        }
        },function(respuesta){
            myApp.alert(respuesta);
             view.router.loadPage('principal.html');      
        },function(error) {
          console.log(error,'error');
          if(token===null){
            myApp.alert('Ups! El nip que ingreso es incorrecto o ya fue usado','Error');
          }
        })

      }else {
        myApp.alert('Ingrese un nip','Error');
      }
    }
