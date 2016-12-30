// Initialize app
var myApp = new Framework7({material:true});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var value="";
var ip="http://192.168.1.73:3000";
var socket="";
var servicio="";
var id_serivicio="";
// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
var devicex="";
// Handle Cordova Device Ready Event
document.addEventListener('deviceready', function() {
value = window.localStorage.getItem("token");
    if(value!=""){
        $$.ajax({
          url: ip+'/api/devices/info',
          method:"POST",
          dataType:'json',
          headers: {        
            'token':value 
            },
          contentType:"application/json",
          success:
            function (data, status, xhr){
                //console.log(data.response);
                mainView.router.loadPage('principal.html');        
            },
          error:
            function(status){
                //console.log(status);
                window.localStorage.removeItem("token");    }
        })
    }
});



// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('home', function (page) {
    value = window.localStorage.getItem("token");
    if(value!=""){
        $$.ajax({
      url: ip+'/api/devices/info',
      method:"POST",
      dataType:'json',
      headers: {        
        'token':value 
        },
      contentType:"application/json",
      success:
        function (data, status, xhr){
            //console.log(data.services);
            $$("#btn_options").html("");
            $$.each(data.services, function (index,value) {                
                $$("#btn_options").append("<a href='celular.html?id="+value._id+"&ser="+value.name+"' class='button button-mega-big button-fill button-raised color-cyan'>"+value.name+"</a>");
                //console.log(value.name); 
                //socket = io.connect(ip);
                socket = plugin.socket.io.connect(ip);

            });          
        },
      error:
        function(status){
            myApp.alert("Error de validacion de token","Error");
            mainView.router.loadPage('index.html');
            window.localStorage.removeItem("token");    
            }
    })
    }
})

myApp.onPageInit('celular', function(page) {
    id_serivicio=page.query.id;
    servicio=page.query.ser;
});


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
function pressnip(num){
    var actual=$$("input#numero_celular_nip").val();
    if(actual.length<10){
        if(actual!=""){
        valor=actual+num;
        $$("input#numero_celular_nip").val(valor);
        }else{
            $$("input#numero_celular_nip").val(num);
        }
    }
}
function borrarnip(){    
    var actual=$$("input#numero_celular_nip").val();
    $$("input#numero_celular_nip").val(actual.substring(0,actual.length-1));
}
function sendsms(){
    var numcel=$$("#numero_celular").val();
    if(numcel=="" || numcel.length<10){
        myApp.alert('Debe ingresar un n&uacute;mero de celular', 'Requerido');
    }else{
        socket.emit('createTicket', {'ticket':{phoneNumber:numcel,serviceId: id_serivicio}}, function(res) {
    alert(JSON.stringify(res));
  });
    //socket.emit('createTicket', {'ticket':{phoneNumber:numcel,serviceId: id_serivicio}}, function (data,response) {        
//      var key=response.key;
//      alert(key);
//    });
    }
}
function addZero(i) {if (i < 10) {i = "0" + i;}return i;}

function imprimir(key){
    myApp.showPreloader('Imprimiendo');
    //tamaño=0x1d,0x21,0-7 -120
    //centrar=0x1b,0x61,1
    //cortar=0x1d,0x56, 0x00
    //salto=0x01B, 0x64, n
    //logo centrado funcion FS ( E=0x1c,0x28,0x45,6,0,62,2,0x21,0x48,49,5
    //deshabilitar logo=0x1c,0x28,0x45,4,0,65,2,48-49 top/button,48-49 enabled/disables
    //                    bluetoothSerial.write([0x1c,0x28,0x45,4,0,65,2,48,49]);//deshabilita la impresion de imagen
   // var date = new Date();
//      fecha=date.getDate() + '/' + (date.getMonth() + 1) + '/' +   date.getFullYear();
//      hora=addZero(date.getHours())+":"+addZero(date.getMinutes())+":"+addZero(date.getSeconds())+" "+((date.getHours() >= 12) ? "PM" : "AM");
    var turno=key;
    var serviciox=servicio;
    var hora="";
    var fecha="";
  //  window.DatecsPrinter.listBluetoothDevices(
//  function (devices) { 
//    bluetoothSerial.connect(devices[0].address, 
//                function(){
//                    bluetoothSerial.write([0x1b,0x21,0,0x1b,0x61,1,0x1d,0x21,2]);
//                    bluetoothSerial.write("Gobierno del Estado de Sinaloa\r\n");
//                    bluetoothSerial.write([0x1d,0x21,1]);
//                    bluetoothSerial.write("USE\r\n\n");
//                    bluetoothSerial.write([0x1d,0x21,0]);
//                    bluetoothSerial.write("Numero de turno:\r\n\n");
//                    bluetoothSerial.write([0x1d,0x21,2]);
//                    bluetoothSerial.write(turno+"\r\n\n");
//                    bluetoothSerial.write([0x1d,0x21,0]);
//                    bluetoothSerial.write("Servicio: "+serviciox+"\r\n\n\n");
//                    bluetoothSerial.write([0x1d,0x21,0]);
//                    bluetoothSerial.write("Hora:"+hora+"\r\n");
//                    bluetoothSerial.write("Fecha:"+fecha+"\r\n");
//                    bluetoothSerial.write([0x01B, 0x64, 5, 0x1d, 0x56, 0x00],
//                    function(){
//                        bluetoothSerial.disconnect(function(){},function(){});
//                    },
//                    function(error){alert(error);}
//                    );
//                    myApp.hidePreloader();
//                }
//            , function(){myApp.hidePreloader();alert("Fallo la conexion con la impresora");});
//            },
//  function (error) {
//    myApp.hidePreloader();
//    alert(JSON.stringify(error));
//  }
//);
}
//validar conexion
function submitNip(acceso) {
    var accesCode="";
        accesCode=$$("#accesscode").val();
      var token =null;
if(accesCode !== '' && accesCode !== null){
    var x1 = new Object();
    x1=JSON.stringify({ nip: accesCode})
$$.ajax({
  url: ip+'/api/devices/register',
  method:"POST",
  dataType:'json',
  contentType:"application/json",
  data: x1,
  success:
    function (data, status, xhr){
        //console.log(data.token);
        window.localStorage.setItem("token", data.token);
        mainView.router.loadPage('principal.html');        
    }
  ,
  error:
    function(status){
        var error=JSON.parse(status.response);
        myApp.alert(error.message,"Error");
        $$("#accesscode").val("");
    }
})
}else {
        myApp.alert('Ingrese un nip','Error');
      }

    }

//funcion salir y quitar token
function deletetoken(){
    window.localStorage.removeItem("token");
    mainView.router.loadPage('index.html');
    myApp.closePanel(); 
}