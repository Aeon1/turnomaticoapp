// Initialize app
var myApp = new Framework7({material:true});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var value="";
//var ip="http://192.168.1.138:3000";
var ip="http://turnomatico.quody.xyz";
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
                console.log(data.response);
                mainView.router.loadPage('principal.html');        
            },
          error:
            function(status){
                //console.log(status);
                window.localStorage.removeItem("token");    
            }
        })
    }
    window.plugins.insomnia.keepAwake();
    AndroidFullScreen.immersiveMode(function(){console.log("bien");}, function(){console.log("mal");});
});


// Now we need to run the code that will be executed only for About page.

//cargar servicios al abrir el home
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
            $$("#btn_options").html("");
            $$.each(data.services, function (index,value) {                
                $$("#btn_options").append("<a href='celular.html?id="+value._id+"&ser="+value.name+"' class='button button-mega-big button-fill button-raised color-cyan size-btn'><b>"+value.name+"</b></a>");
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
//optener los datos del servicio al abrir la pagina de celular
myApp.onPageInit('celular', function(page) {
    id_serivicio=page.query.id;
    servicio=page.query.ser;
});

//escribir numero de celular
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
//borrar numero de celular
function borrar(){    
    var actual=$$("input#numero_celular").val();
    $$("input#numero_celular").val(actual.substring(0,actual.length-1));
}
//funcion para escribir nip de cita
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
//funcion de borrar nip
function borrarnip(){    
    var actual=$$("input#numero_celular_nip").val();
    $$("input#numero_celular_nip").val(actual.substring(0,actual.length-1));
}
function sendsms(){
    var numcel=$$("#numero_celular").val();
    if(numcel=="" || numcel.length<10){
        myApp.alert('Debe ingresar un n&uacute;mero de celular valido', 'Requerido');
    }else{
        socket.emit('createTicket', {'ticket':{phoneNumber:numcel,serviceId: id_serivicio}}, function(res) {
    respuesta=JSON.parse(JSON.stringify(res));
    if(respuesta[0]!==null){
        myApp.alert(respuesta.message,"Error");
    }else{
        //myApp.modal({
//        title:  '<img src="img/checked.svg" style="height:50px;margin:auto;display:block"/>'+
//                  '<h1 class="center-text" style="margin:0px">Registrado</h1>',
//        text: "<p class='center-text'>Por favor, tome asiento y en breve lo atenderemos</p>"+
//        "<h3 class='center-text'>Su numero de turno es:</h3><h1 class='center-text'>"+respuesta[1].key+"</h1>"+
//        "<p>En un momento le llegara el ticket a su celular</p>",
//        buttons: [
//        {
//        text: 'Ok, gracias',
//        bold: true,
//        onClick: function() {
//          mainView.router.loadPage('principal.html');
//            }
//        }
//        ]
//      })
        var date = new Date(respuesta[1].createdAt);
        var fecha=date.getDate() + '/' + (date.getMonth() + 1) + '/' +   date.getFullYear();
        var hora=addZero(date.getHours())+":"+addZero(date.getMinutes())+":"+addZero(date.getSeconds())+" "+((date.getHours() >= 12) ? "PM" : "AM");
        var key=respuesta[1].key;
        imprimir(key,fecha,hora);
    }        
  });
//haveAppointment
    }
}
function sendprint(){
    var numcel=$$("#numero_celular").val();    
    socket.emit('createTicket', {'ticket':{phoneNumber:numcel,serviceId: id_serivicio}}, function(res) {
    respuesta=JSON.parse(JSON.stringify(res));
    if(respuesta[0]!==null){
        myApp.alert(respuesta.message,"Error");
    }else{
        var date = new Date(respuesta[1].createdAt);
        var fecha=date.getDate() + '/' + (date.getMonth() + 1) + '/' +   date.getFullYear();
        var hora=addZero(date.getHours())+":"+addZero(date.getMinutes())+":"+addZero(date.getSeconds())+" "+((date.getHours() >= 12) ? "PM" : "AM");
        var key=respuesta[1].key;
        imprimir(key,fecha,hora);
    } 
});
}
function addZero(i) {if (i < 10) {i = "0" + i;}return i;}

function imprimir(key,fecha,hora){
    myApp.showPreloader('Imprimiendo');
    //tamaño=0x1d,0x21,0-7 -120
    //centrar=0x1b,0x61,1
    //cortar=0x1d,0x56, 0x00
    //salto=0x01B, 0x64, n
    //logo centrado funcion FS ( E=0x1c,0x28,0x45,6,0,62,2,0x21,0x48,49,5
    //deshabilitar logo=0x1c,0x28,0x45,4,0,65,2,48-49 top/button,48-49 enabled/disables
    //                    bluetoothSerial.write([0x1c,0x28,0x45,4,0,65,2,48,49]);//deshabilita la impresion de imagen
 var turno=key;
    var serviciox=servicio;
    var hora=hora;
    var fecha=fecha;
    window.DatecsPrinter.listBluetoothDevices(
  function (devices) { 
    bluetoothSerial.connect(devices[0].address, 
                function(){
                    //bluetoothSerial.write([0x10,0x04,4],function(data){alert(data);},function(err){alert(err);});
                    //bluetoothSerial.write([0x1c,0x28,0x45,4,0,65,2,48,49]);//deshabilita la impresion de imagen
                    bluetoothSerial.write([0x1b,0x21,0,0x1b,0x61,1,0x1d,0x21,2]);
                    bluetoothSerial.write("Gobierno del Estado de Sinaloa\r\n");
                    bluetoothSerial.write([0x1d,0x21,1]);
                    bluetoothSerial.write("USE\r\n\n");
                    bluetoothSerial.write([0x1d,0x21,0]);
                    bluetoothSerial.write("Numero de turno:\r\n\n");
                    bluetoothSerial.write([0x1b,0x21,0,0x1b,0x61,1,0x1d,0x21,2]);
                    bluetoothSerial.write(turno+"\r\n\n");
                    bluetoothSerial.write([0x1d,0x21,0]);
                    bluetoothSerial.write("Servicio: "+serviciox+"\r\n\n\n");
                    bluetoothSerial.write([0x1d,0x21,0]);
                    bluetoothSerial.write("Hora:"+hora+"\r\n");
                    bluetoothSerial.write("Fecha:"+fecha+"\r\n");
                    bluetoothSerial.write([0x01B, 0x64, 5, 0x1d, 0x56, 0x00],
                    function(){
                        bluetoothSerial.write([0x10,0x14,8,1,3,14,1,6,2,8]);
                        bluetoothSerial.disconnect(function(){
                          myApp.modal({
                            title:  '<img src="img/checked.svg" style="height:50px;margin:auto;display:block"/>'+
                                      '<h1 class="center-text" style="margin:0px">Registrado</h1>',
                            text: "<p class='center-text'>Por favor, tome asiento y en breve lo atenderemos</p>"+
                            "<h3 class='center-text'>Su numero de turno es:</h3><h1 class='center-text'>"+turno+"</h1>",
                            buttons: [
                            {
                                text: 'Reimprimir',
                                bold: true,
                                onClick: function() {
                                  imprimir(key,fecha,hora);
                                }
                              },{
                                text: 'Ok, gracias',
                                bold: true,
                                onClick: function() {
                                mainView.router.loadPage('principal.html');
                                }
                            },
                            ]
                          })
                        },function(){});
                        //window.DatecsPrinter.listBluetoothDevices(
//                          function (devices) {
//                            bluetoothSerial.connect(devices[0].address, 
//                            function() {
//                                    bluetoothSerial.write([0x01B, 0x64, 5, 0x1d, 0x56, 0x00],
//                                    function(){
//                                        bluetoothSerial.write([0x10,0x14,8,1,3,14,1,6,2,8],function(){alert("buffer vaciado");},function(error){alert("buffer error: "+error);});
//                                        bluetoothSerial.disconnect();
//                                    },function(error){
//                                        myApp.alert(error,"Error");
//                                    });
//                              },
//                              function() {
//                                alert(JSON.stringify(error));
//                              }); 
//                          },
//                          function (error) {
//                            alert(JSON.stringify(error));
//                          }
//                        );
                    },
                    function(error){
                        myApp.alert(error,"Error");
                        }
                    );
                    myApp.hidePreloader();
                }
            , function(){myApp.hidePreloader();
                myApp.modal({
                    title:  '<h2>Ocurri&oacute; un error</h2>',
                    text: 'No se pudo conectar con la impresora',
                    buttons: [
                      {
                        text: 'Reimprimir',
                        onClick: function() {
                          imprimir(key,fecha,hora);
                        }
                      },
                      {
                        text: 'Cancelar',
                        onClick: function() {
                          myApp.closeModal()
                        }
                      },
                    ]
                  })
            });
            },
  function (error) {
    myApp.hidePreloader();
    alert(JSON.stringify(error));
  }
);
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



//validar nip de cita
function sendnipdate(){
    var numnip=$$("#numero_celular_nip").val();
    if(numnip==""){
        myApp.alert('Ingrese el nip de su cita','Error');
    }else{
    var sJWS = window.localStorage.getItem("token");;
  var hN = "a1f8160ae2e3c9b465ce8d2d656263362b927dbe29e1f02477fc1625cc90a136e38bd93497c5b6ea63dd7711e67c7429f956b0fb8a8f089adc4b69893cc1333f53edd019b87784252fec914fe4857769594bea4280d32c0f55bf62944f130396bc6e9bdf6ebdd2bda3678eeca0c668f701b38dbffb38c8342ce2fe6d27fade4a5a4874979dd4b9cf9adec4c75b05852c2c0f5ef8a5c1750392f944e8ed64c110c6b647609aa4783aeb9c6c9ad755313050638b83665c6f6f7a82a396702a1f641b82d3ebf2392219491fb686872c5716f50af8358d9a8b9d17c340728f7f87d89a18d8fcab67ad84590c2ecf759339363c07034d6f606f9e21e05456cae5e9a1";
  var hE = "010001";

  var jws = new KJUR.jws.JWS();
  var pubKey;
  try {
    pubKey = KEYUTIL.getKey({n: hN, e: hE});
    jws.parseJWS(sJWS);
    result = KJUR.jws.JWS.verify(sJWS, pubKey, ["RS256"]);
  } catch (ex) {result = 0;}
  var head = jws.parsedJWS.headS;
  var decodificado = jws.parsedJWS.payloadS;
var xx=JSON.parse(decodificado);   
    socket.emit('haveAppointment', {nip:numnip,serviceId: id_serivicio,branchId:xx.branch.id}, function(res) {
    respuesta=JSON.parse(JSON.stringify(res));
    if(respuesta[0]!==null){
        myApp.alert(respuesta.message,"Error");
    }else{
        var date = new Date(respuesta[1].createdAt);
        var fecha=date.getDate() + '/' + (date.getMonth() + 1) + '/' +   date.getFullYear();
        var hora=addZero(date.getHours())+":"+addZero(date.getMinutes())+":"+addZero(date.getSeconds())+" "+((date.getHours() >= 12) ? "PM" : "AM");
        var key=respuesta[1].key;
        imprimir(key,fecha,hora);
    } 
});
}
}
function verificar(){
    var user=$$("#username").val();
    var pass=$$("#password").val();
    if(user==""){
        $$("#username").focus();
    }
    if(pass==""){
        $$("#password").focus();
    }
    if(user!="" && pass!=""){
        var x1 = new Object();
    x1=JSON.stringify({email: user,password:pass})
        $$.ajax({
      url: ip+'/api/sign_in',
      method:"POST",
      dataType:'json',
      data:x1,
      contentType:"application/json",
      success:
        function (data, status, xhr){
            var sJWS = data.token;
  var hN = "a1f8160ae2e3c9b465ce8d2d656263362b927dbe29e1f02477fc1625cc90a136e38bd93497c5b6ea63dd7711e67c7429f956b0fb8a8f089adc4b69893cc1333f53edd019b87784252fec914fe4857769594bea4280d32c0f55bf62944f130396bc6e9bdf6ebdd2bda3678eeca0c668f701b38dbffb38c8342ce2fe6d27fade4a5a4874979dd4b9cf9adec4c75b05852c2c0f5ef8a5c1750392f944e8ed64c110c6b647609aa4783aeb9c6c9ad755313050638b83665c6f6f7a82a396702a1f641b82d3ebf2392219491fb686872c5716f50af8358d9a8b9d17c340728f7f87d89a18d8fcab67ad84590c2ecf759339363c07034d6f606f9e21e05456cae5e9a1";
  var hE = "010001";

  var jws = new KJUR.jws.JWS();
  var pubKey;
  try {
    pubKey = KEYUTIL.getKey({n: hN, e: hE});
    jws.parseJWS(sJWS);
    result = KJUR.jws.JWS.verify(sJWS, pubKey, ["RS256"]);
  } catch (ex) {result = 0;}
  var head = jws.parsedJWS.headS;
  var decodificado = jws.parsedJWS.payloadS;
var xx=JSON.parse(decodificado);
console.log(xx);
if(xx.role=="admin" || xx.role=="manager"){
    window.localStorage.removeItem("token");
    mainView.router.loadPage('index.html');
    myApp.closeModal();
}else{
    myApp.alert("No tiene permisos suficientes","No permitido");
}
        },
      error:
        function(status){
            myApp.alert(status.response,"Error");   
            }
    }) 
    }
}
