// JavaScript Document
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

var inicio=0;
var timeout=0;
var resglob;

function empezarDetener(elemento)
{
	if(timeout==0)
	{
		elemento.value = "Detener";
		inicio = vuelta = new Date().getTime();
		funcionando();
	}
	else{
		elemento.value="Empezar";
		clearTimeout(timeout);
        timeout=0;
	}
}

function funcionando()
{
	var actual = new Date().getTime();
	var diff = new Date(actual-inicio);
	var result = LeadingZero(diff.getUTCHours())+":"+LeadingZero(diff.getUTCMinutes())+":"+LeadingZero(diff.getUTCSeconds());
	document.getElementById('crono').innerHTML = result;
	resglob = result;
	timeout=setTimeout("funcionando()",1000);
}

document.getElementById('log').innerHTML += '<br>Some new content!';

function LeadingZero(Time) {
	return (Time < 10) ? "0" + Time : + Time;
}

function start() {
	if(localStorage.datos) {
		LoadData(this);
	}
	else {
		var pagina3 = document.getElementById('DivTabla');			
		var datostabla = document.createElement("table");
		var datoshilera = document.createElement("tr");	
		var datosdia = document.createTextNode("Día");
		var datosvuelta = document.createTextNode("Vuelta");
		var datosasig = document.createTextNode("Asignatura");			
		var datostiempo = document.createTextNode("Tiempo");
		var datoscelda = document.createElement("td");
		datoscelda.appendChild(datosdia);
		datoshilera.appendChild(datoscelda);
		var datoscelda = document.createElement("td");
		datoscelda.appendChild(datosvuelta);
		datoshilera.appendChild(datoscelda);
		var datoscelda = document.createElement("td");
		datoscelda.appendChild(datosasig);
		datoshilera.appendChild(datoscelda);
		var datoscelda = document.createElement("td");
		datoscelda.appendChild(datostiempo);
		datoshilera.appendChild(datoscelda);
		datostabla.appendChild(datoshilera);
		datostabla.setAttribute("border","3");
		datostabla.setAttribute("id","tabladatos");
		datostabla.setAttribute("class","tabla");
		pagina3.appendChild(datostabla);
	}
}

function LoadData() {
	var pagina3 = document.getElementById('DivTabla');			
	var datosimp = localStorage.getItem("datos");
	var datostabla = document.createElement("table");
	var datarray = datosimp.split("-");
	var rep = (datarray.length/4);
	for (i = 0; i < rep; i++) {
		var datoshilera = document.createElement("tr");
		var k1 = 0 + (4*i);
		var k1 = Number(k1);
		var k2 = 1 + (4*i);
		var k2 = Number(k2);
		var k3 = 2 + (4*i);
		var k3 = Number(k3);
		var k4 = 3 + (4*i);
		var k4 = Number(k4);
		var datoscelda = document.createElement("td");
		var datos1 = datarray[k1];
		datoscelda.appendChild(document.createTextNode(datos1));
		datoshilera.appendChild(datoscelda);
		var datoscelda = document.createElement("td");
		var datos2 = datarray[k2];
		datoscelda.appendChild(document.createTextNode(datos2));
		datoshilera.appendChild(datoscelda);
		var datoscelda = document.createElement("td");
		var datos3 = datarray[k3];
		datoscelda.appendChild(document.createTextNode(datos3));
		datoshilera.appendChild(datoscelda);
		var datoscelda = document.createElement("td");
		var datos4 = datarray[k4];
		datoscelda.appendChild(document.createTextNode(datos4));
		datoshilera.appendChild(datoscelda);
		datostabla.appendChild(datoshilera);		
	}
	datostabla.setAttribute("border","3");
	datostabla.setAttribute("id","tabladatos");
	datostabla.setAttribute("class","tabla");
	pagina3.appendChild(datostabla);
}

function SaveData () {
	var tabladat = document.getElementById('tabladatos');
	var fil = tabladat.rows.length;
	var filas = tabladat.rows.length + 1;
	var cols = 4;
	var i = 0;
	var j = 0;
	var k = 1;
	var datarray = [];
	for(i = 0 ; i < filas ; i++) {
		for (j = 0 ; j < cols ; j++) {
			var data = tabladat.rows[i].cells[j].innerHTML;
			datarray.push(data);
			var datastring = datarray.join("-");
			localStorage.setItem("datos",datastring);
		}
	} 
}

function SaveTime() {
	var lista = document.getElementById('Asig');
	var vuelta = document.getElementById('Vuelta');
	if (lista.value == 0){
		alert("No has seleccionado una asignatura");
	}
	else {
		
		var dia = new Date().getDate();
		var mes = new Date().getMonth() + 1;
		var año = new Date().getFullYear();
		var arrayfecha = new Array(dia,mes,año);
		var fecha = arrayfecha.join("/");
		var hor = new Date().getHours();
		
		if (hor <= 9){
			if (hor == 0){
				var hora = '00';
			}
			else {
				var horarray = new Array('0',hor);
				var hora = horarray.join('');
			}
		}
		else {
			var hora = hor;
		}
		
		var minu = new Date().getMinutes();
		
		if (minu <= 9){
			if (minu == 0){
				var minut = '00';
			}
			else {
				var minarray = new Array('0',minu);
				var minut = minarray.join('');
			}
		}
		else {
			var minut = minu;
		}		
		
		var arraytiempo = new Array(hora,minut);
		var tiempo = arraytiempo.join(":");
		var arrayahora = new Array(fecha,tiempo);
		var ahora = arrayahora.join(" ");
		
		var tabladat = document.getElementById('tabladatos');
		var hilera = document.createElement("tr");
		var celda = document.createElement("td");
		celda.appendChild(document.createTextNode(ahora));
		hilera.appendChild(celda);
		var celda = document.createElement("td");
		celda.appendChild(document.createTextNode(vuelta.value));
		hilera.appendChild(celda);
		var celda = document.createElement("td");
		celda.appendChild(document.createTextNode(lista.value));
		hilera.appendChild(celda);
		var celda = document.createElement("td");
		celda.appendChild(document.createTextNode(resglob));	
		hilera.appendChild(celda);		
		tabladat.appendChild(hilera);
		
		alert('Datos guardados');
		
		SaveData(this);
	}
}

function Buscar () {
	RemoveChilds(this);
	var asig = document.getElementById('AsigBus');
	var dia = document.getElementById('Dias');
	var vuelt = document.getElementById('VueltaBus')
	if (dia.value == 0) {
		if (asig.value == 0) {
			if(vuelt.value == 0) {
				alert('Seleccione vuelta, dia y/o asignatura');
			}
			else {
				alert('Vuelta');
				OnlyVuelta(this);
			}	
		}
		else {
			if(vuelt.value == 0){
				alert('Asignatura');
				alert('hello');
				var asig = document.getElementById('AsigBus');
				var datos = document.getElementById('DivDatos');
				var tablaorden = document.createElement("table");
				var value = asig.value;
				var tabladat = document.getElementById('tabladatos');
				var fil = tabladat.rows.length;
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data = tabladat.rows[i].cells[1].innerHTML;
					var str1 = value.toString();
					var str2 = data.toString();
					if (str1 == str2){
						alert('hi')
						var hilera = document.createElement("tr");
						var celda = document.createElement("td");
						var dat1 = tabladat.rows[i].cells[0].innerHTML;
						celda.appendChild(document.createTextNode('dat1'));
						hilera.appendChild(celda);
						tablaorden.appendChild(hilera);
					} 
				}
				tablaorden.setAttribute("border","3");
				tablaorden.setAttribute("id","orden");
				tablaorden.setAttribute("class","tabla");
				datos.appendChild(tablaorden);	
			}
			else {
				alert('Asignatura y Vuelta');
				AsigYVuelta(this);
			}
		}
	}
	else {
		if (asig.value == 0) {
			if(vuelt.value == 0) {
				alert('Dia');
				OnlyDia(this);
			}
			else {
				alert('Dia y Vuelta');
				DiaYVuelta(this);
			}
		}
		else {
			if(vuelt.value == 0) {
				alert('Dia y Asignatura');
				DiaYAsig(this);
			}
			else {
				alert('Todo');
				AllThings(this);
			}
		}
	}
}
function RemoveChilds() {
	alert('A limpiar')
	var list = document.getElementById('DivDatos');
	while (list.hasChildNodes()) {   
    		list.removeChild(list.firstChild);
	}
	alert('Limpio')
}


function OnlyAsig() {
	
}
