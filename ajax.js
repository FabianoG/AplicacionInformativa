agregarEvento(window,'load',inicializarEventos,false);

function inicializarEventos()
{
  var ref=document.getElementById('formulario');
  agregarEvento(ref,'submit',enviarDatos,false);
}

function enviarDatos(e)
{
  if (window.event)
    window.event.returnValue=false;
  else
    if (e)
      e.preventDefault();
  enviarFormulario();
}


function retornarDatos()
{
  var cad='';
  var nom=document.getElementById('nombre').value;
  var com=document.getElementById('comentarios').value;
  cad='nombre='+encodeURIComponent(nom)+'&comentarios='+encodeURIComponent(com);
  return cad;
}

var conexion1;
function enviarFormulario() 
{
  conexion1=crearXMLHttpRequest();
  conexion1.onreadystatechange = procesarEventos;
  conexion1.open('POST','pagina1.php', true);
  conexion1.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  conexion1.send(retornarDatos());  
}

function procesarEventos()
{
  var resultados = document.getElementById("resultados");
  if(conexion1.readyState == 4)
  {
    resultados.innerHTML = 'Gracias.';
  } 
  else 
  {
    resultados.innerHTML = 'Procesando...';
  }
}

//***************************************
//Funciones comunes a todos los problemas
//***************************************
function agregarEvento(elemento,nomevento,funcion,captura)
{
  if (elemento.attachEvent)
  {
    elemento.attachEvent('on'+nomevento,funcion);
    return true;
  }
  else  
    if (elemento.addEventListener)
    {
      elemento.addEventListener(nomevento,funcion,captura);
      return true;
    }
    else
      return false;
}

function crearXMLHttpRequest() 
{
  var xmlHttp=null;
  if (window.ActiveXObject) 
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  else 
    if (window.XMLHttpRequest) 
      xmlHttp = new XMLHttpRequest();
  return xmlHttp;
}