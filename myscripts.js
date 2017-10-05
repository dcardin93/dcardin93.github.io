// JavaScript Document
function show(shown, hidden) {
  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  LoadDays(this);
  return false;
}
 	
var inicio=0;
var timeout=0;
var resglob;

function empezarDetener(elemento) {
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

function RemoveDays() {
	var list = document.getElementById('DiasBus');
	while (list.hasChildNodes()) {   
    		list.removeChild(list.firstChild);
	}
}

function LoadDays() {
	RemoveDays(this);
	var divi = document.getElementById('DiasBus');
	var sel = document.createElement("select");
	var tabla = document.getElementById('tabladatos');
	var opcion1 = document.createElement("option");
	var node1 = document.createTextNode("Elige un día");
	opcion1.appendChild(node1);
	opcion1.setAttribute("value","0");
	sel.appendChild(opcion1);
	sel.setAttribute("class","lista");
	sel.setAttribute("id","DiaBus");
	divi.appendChild(sel);
	var filas = tabla.rows.length + 1;
	for (i = 1 ; i < filas ; i++) {
		var var1 = tabla.rows[i].cells[0].innerHTML;
		var arr1 = var1.split(" ");
		var data1 = arr1[0].toString();
		var var0 = tabla.rows[i-1].cells[0].innerHTML;
		var arr0 = var0.split(" ");
		var data0 = arr0[0].toString();
		if (data1 == data0) {
		} else {
			var opcion = document.createElement("option");
			var data = document.createTextNode(data1);
			opcion.appendChild(data);
			sel.appendChild(opcion);
			divi.appendChild(sel);
		}
	}
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

function BorrarDatos () {
    	var r = confirm("¿seguro que desea borrar todos los datos?");
    	if (r == true) {
        	localStorage.removeItem("datos");
    	} 
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
	if (lista.value == 0 || vuelta.value == 0){
		if (lista.value == 0 && vuelta.value == 0) {
			alert("No has seleccionado ni asignatura ni vuelta");
		} else {
			if (lista.value == 0) {
				alert("No has seleccionado una asignatura");
			} else {
				alert("No has seleccionado la vuelta");
			}
		}
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

function RemoveChilds() {
	var list = document.getElementById('DivDatos');
	while (list.hasChildNodes()) {   
    		list.removeChild(list.firstChild);
	}
}

function IntDatos() {
	var div = document.getElementById('DatosInt');
	var tiempo = div.getElementsByTagName('input');
	var tabla = document.getElementById('tabladatos');
	var vuelta = document.getElementById('VueltaIntro');
	var asig = document.getElementById('AsigIntro');
	
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
	alert('hey')
	
	var tiempo0 = tiempo[0].value;
	tiempo0 = tiempo0.toString();
	alert(tiempo0);
	var tiempo1 = tiempo[1].value;
	tiempo0 = tiempo1.toString();
	alert(tiempo1);
	var tiempo2 = tiempo[2].value;
	tiempo0 = tiempo2.toString();
	alert(tiempo2);
	var arraytiempo = [tiempo0,tiempo1,tiempo2];
	var tiempodat = arraytiempo.join(":");
	
	var hilera = document.createElement("tr");
	var celda = document.createElement("td");
	celda.appendChild(document.createTextNode(ahora));
	hilera.appendChild(celda);
	var celda = document.createElement("td");
	celda.appendChild(document.createTextNode(vuelta.value));
	hilera.appendChild(celda);
	var celda = document.createElement("td");
	celda.appendChild(document.createTextNode(asig.value));
	hilera.appendChild(celda);
	var celda = document.createElement("td");
	celda.appendChild(document.createTextNode(tiempodat));
	hilera.appendChild(celda);
	tabla.appendChild(hilera);
	tiempo[0].value = "h";
	tiempo[1].value = "min";
	tiempo[2].value = "s";
	alert('Datos introducidos');
	SaveData(this);
	
}

function Buscar () {
	var datos = document.getElementById('DivDatos');
	var tabladat = document.getElementById('tabladatos');
	var tablaorden = document.createElement("table");
	var hilera = document.createElement("tr");
        var celda = document.createElement("td");
	var name0 = document.createTextNode('Dia');
	celda.appendChild(name0);
	hilera.appendChild(celda);
	var celda = document.createElement("td");
	var name1 = document.createTextNode('Vuelta');
	celda.appendChild(name1);
	hilera.appendChild(celda);
	var celda = document.createElement("td");
	var name2 = document.createTextNode('Asignatura');
	celda.appendChild(name2);
	hilera.appendChild(celda);
	var celda = document.createElement("td");
	var name3 = document.createTextNode('Tiempo');
	celda.appendChild(name3);
	hilera.appendChild(celda);
	tablaorden.appendChild(hilera);
	tablaorden.setAttribute("id","tablaorden");
	RemoveChilds(this);
	var asig = document.getElementById('AsigBus');
	var dia = document.getElementById('DiaBus');
	var vuelt = document.getElementById('VueltaBus')
	if (dia.value == 0) {
		if (asig.value == 0) {
			if(vuelt.value == 0) {
				alert('Seleccione vuelta, dia y/o asignatura');
			}
			else {
				alert('Vuelta');
				var value = vuelt.value;
				var fil = tabladat.rows.length;
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data = tabladat.rows[i].cells[1].innerHTML;
					var str1 = value.toString();
					var str2 = data.toString();
					if (str1 == str2) {
						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
						var name3 = document.createTextNode(dat3);

						celda.appendChild(name3);
						hilera.appendChild(celda);
						
						tablaorden.appendChild(hilera);
												
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					} 
				}
			}	
		}
		else {
			if(vuelt.value == 0) {
				alert('Asignatura');
				var value = asig.value;
				var fil = tabladat.rows.length;
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data = tabladat.rows[i].cells[2].innerHTML;
					var str1 = value.toString();
					var str2 = data.toString();
					if (str1 == str2) {

						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
						
						var tiempo = tiempo + dat3;
						var msg = 'Has estudiado ' + tiempo + ' horas la vuelta ' + str1;
						document.getElementById('tiempodiv').innerHTML = msg
						
						var name3 = document.createTextNode(dat3);
						celda.appendChild(name3);
						hilera.appendChild(celda);
						
						tablaorden.appendChild(hilera);				
				
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					} 
				}
					
			}
			else {
				alert('Asignatura y Vuelta');
				var value1 = asig.value;
				var value2 = vuelt.value;
				var fil = tabladat.rows.length
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data1 = tabladat.rows[i].cells[2].innerHTML;
					var data2 = tabladat.rows[i].cells[1].innerHTML;
					var str1 = value1.toString();
					var str12 = value2.toString();
					var str2 = data1.toString();
					var str22 = data2.toString();
					if (str1 == str2 && str12 == str22) {
						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);

						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
												
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
				
						var tiempo = tiempo + dat3;
						var msg = 'Has estudiado ' + tiempo + ' horas el dia ' + str1 + ' en la vuelta ' + str12;
						document.getElementById('tiempodiv').innerHTML = msg
						
						var name3 = document.createTextNode(dat3);
						celda.appendChild(name3);
						hilera.appendChild(celda);
												
						tablaorden.appendChild(hilera);
							
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					}
				}
			}
		}
	}
	else {
		if (asig.value == 0) {
			if(vuelt.value == 0) {
				alert('Dia');
				var value = dia.value;
				var fil = tabladat.rows.length;
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var arr1 = value.split(" ");
					var data1 = arr1[0].toString();
					var var0 = tabladat.rows[i].cells[0].innerHTML;
					var arr0 = var0.split(" ");
					var data0 = arr0[0].toString();
					var str1 = data0.toString();
					var str2 = data1.toString();
					if (str1 == str2) {

						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
						
						var tiempo = tiempo + dat3;
						var msg = 'Has estudiado ' + tiempo + ' horas el dia ' + str1;
						document.getElementById('tiempodiv').innerHTML = msg;
						
						var name3 = document.createTextNode(dat3);
						celda.appendChild(name3);
						hilera.appendChild(celda);
						
						tablaorden.appendChild(hilera);				
				
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					} 
				}
			}
			else {
				alert('Dia y Vuelta');
				var value1 = dia.value;
				var value2 = vuelt.value;
				var fil = tabladat.rows.length
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data2 = tabladat.rows[i].cells[1].innerHTML;
					var arr1 = value1.split(" ");
					var data1 = arr1[0].toString();
					var var0 = tabladat.rows[i].cells[0].innerHTML;
					var arr0 = var0.split(" ");
					var data0 = arr0[0].toString();
					var str1 = data1.toString();
					var str12 = value2.toString();
					var str2 = data0.toString();
					var str22 = data2.toString();
					if (str1 == str2 && str12 == str22) {
						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);

						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
												
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
						
						var tiempo = tiempo + dat3;
						var msg = 'Has estudiado ' + tiempo + ' horas el dia ' + str1 + ' en la vuelta ' + str12;
						document.getElementById(tiempodiv).innerHTML = msg
						
						var name3 = document.createTextNode(dat3);
						celda.appendChild(name3);
						hilera.appendChild(celda);
												
						tablaorden.appendChild(hilera);
							
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					}
				}
			}
		}
		else {
			if(vuelt.value == 0) {
				alert('Dia y Asignatura');
				var value1 = dia.value;
				var value2 = asig.value;
				var fil = tabladat.rows.length
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data2 = tabladat.rows[i].cells[2].innerHTML;
					var arr1 = value1.split(" ");
					var data1 = arr1[0].toString();
					var var0 = tabladat.rows[i].cells[0].innerHTML;
					var arr0 = var0.split(" ");
					var data0 = arr0[0].toString();
					var str1 = data1.toString();
					var str12 = value2.toString();
					var str2 = data0.toString();
					var str22 = data2.toString();
					if (str1 == str2 && str12 == str22) {
						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);

						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
												
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
						
						var tiempo = tiempo + dat3;
						var msg = 'Has estudiado ' + tiempo + ' horas el dia ' + str1 + ' de ' + str12;
						document.getElementById(tiempodiv).innerHTML = msg
						
						var name3 = document.createTextNode(dat3);
						celda.appendChild(name3);
						hilera.appendChild(celda);
												
						tablaorden.appendChild(hilera);
							
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					}
				}
			}
			else {
				alert('Todo');
				var value1 = dia.value;
				var value2 = vuelt.value;
				var value3 = asig.value;
				var fil = tabladat.rows.length
				var filas = tabladat.rows.length + 1;
				for (i = 0 ; i < filas ; i++) {
					var data3 = tabladat.rows[i].cells[2].innerHTML;
					var data2 = tabladat.rows[i].cells[1].innerHTML;
					var arr1 = value1.split(" ");
					var data1 = arr1[0].toString();
					var var0 = tabladat.rows[i].cells[0].innerHTML;
					var arr0 = var0.split(" ");
					var data0 = arr0[0].toString();
					var str1 = data1.toString();
					var str12 = value2.toString();
					var str13 = value3.toString();
					var str2 = data0.toString();
					var str22 = data2.toString();
					var str23 = data3.toString();
					if (str1 == str2 && str12 == str22 && str13 == str23) {
						var hilera = document.createElement("tr");
						
						var celda = document.createElement("td");
						var data0 = tabladat.rows[i].cells[0].innerHTML;
						var dat0 = data0.toString();
						var name0 = document.createTextNode(dat0);
						celda.appendChild(name0);
						hilera.appendChild(celda);

						var celda = document.createElement("td");
						var data1 = tabladat.rows[i].cells[1].innerHTML;
						var dat1 = data1.toString();
						var name1 = document.createTextNode(dat1);
						celda.appendChild(name1);
						hilera.appendChild(celda);
						
						var celda = document.createElement("td");
						var data2 = tabladat.rows[i].cells[2].innerHTML;
						var dat2 = data2.toString();
						var name2 = document.createTextNode(dat2);
						celda.appendChild(name2);
						hilera.appendChild(celda);
												
						var celda = document.createElement("td");
						var data3 = tabladat.rows[i].cells[3].innerHTML;
						var dat3 = data3.toString();
						
						var tiempo = tiempo + dat3;
						var msg = 'Has estudiado ' + tiempo + ' horas el dia ' + str1 + ' en la vuelta ' + str12 + ' de ' + str13;
						document.getElementById(tiempodiv).innerHTML = msg
						
						var name3 = document.createTextNode(dat3);
						celda.appendChild(name3);
						hilera.appendChild(celda);
												
						tablaorden.appendChild(hilera);
							
						tablaorden.setAttribute("border","3");
						tablaorden.setAttribute("id","orden");
						tablaorden.setAttribute("class","tabla");
						datos.appendChild(tablaorden);
					}
				}
			}
		}
	}
}
