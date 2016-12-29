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
document.addEventListener('deviceready', function () {
    WebSocket.pluginOptions = {
    origin: 'http://192.168.1.68',
    maxConnectTime: 5000,
    override: true
};
 
var ws = new WebSocket('ws://echo.websocket.org');

ws.onopen = function () {
        alert('open');
       // this.send('hello');
    };
ws.onmessage = function (event) {
        alert(event.data);    // will be "hello" 
        //this.close();
    };
ws.onerror = function () {
        console.log('error occurred!');
    };
 
ws.onclose = function (event) {
    console.log('close code=' + event.code);
};
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


