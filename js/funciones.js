var valorRetiro = document.getElementById('txtValor');
var resultado = document.getElementById('txtResultado');
var btn = document.getElementById('btnRetirar');
var lbDisponible = document.getElementById('lbDisponible');

btn.addEventListener("click", sacarDinero);

var imagenes = [];
imagenes["100"] = "100.jpg";
imagenes["50"] = "50.jpg";
imagenes["20"] = "20.jpg";
imagenes["10"] = "10.jpg";

var billetesEntregados = new Array();
var caja = new Array();
caja.push(new Billete(100, 10));
caja.push(new Billete(50, 10));
caja.push(new Billete(20, 8));
caja.push(new Billete(10, 7));

lbDisponible.innerText = " Valor Disponible: " + calcularDisponible();

function sacarDinero()
{
  var monto = valorRetiro.value;
  var cantidadBilletes = 0;
  var terminaCiclo = false;

  //Verifico que el monto sea un multiplo de 10
  if (monto%10 != 0)
  {
    agregarMensaje(":::la cantidad no es un multiplo de 10:::");
  } else if (monto > calcularDisponible()) {
    agregarMensaje("::: El saldo del cajero es insuficiente :::");
  }
  else
  {
    //Verifico que no se este recorriendo el arreglo de nuevo
    while (monto > 0 && !terminaCiclo) {
        for (b of caja)
        {
          cantidadBilletes = Math.floor(monto / b.valor);
          //Si existe la cantidad de billetes en el cajero, la entrego
          if (cantidadBilletes <= b.cantidad)
          {
            if (cantidadBilletes != 0) {
              billetesEntregados.push(new Billete(b.valor, cantidadBilletes));
              //console.log(cantidadBilletes + " billetes de " + b.valor);
              monto = monto - (cantidadBilletes * b.valor);
              b.cantidad = b.cantidad - cantidadBilletes; //Descuento los bolletes del cajero
            }

          }
          else if(b.cantidad > 0)
          {
            //Sino, entrego la cantidad que haya
            billetesEntregados.push(new Billete(b.valor, b.cantidad));
            //console.log(b.cantidad + " billetes de " + b.valor);
            monto = monto - (b.cantidad * b.valor);
            b.cantidad = 0;
          }
        }
        terminaCiclo = true;
        if (monto > 0)
        {
          console.log("===No alcanzó el dinero!===");
          resultado.innerHTML = "===No alcanzó el dinero!===";
        }else
        {
          for(e of billetesEntregados)
          {
            //resultado.innerHTML = resultado.innerHTML + e.cantidad + " billetes de " + e.valor + "<br/>";
            e.mostrar();
          }
          agregarMensaje(":::Has retirado " + valorRetiro.value + " a las " + hora() + " !:::");
          lbDisponible.innerText = " Valor Disponible: " + calcularDisponible();

          //console.log(":::Proceso Terminado!:::");
          //console.log(billetesEntregados);
          billetesEntregados = []; //Vacio la variable
        }
    }

    valorRetiro.value = ""; 
  }

}

function agregarMensaje(texto)
{
  var p = document.createElement("p");
  document.body.appendChild(p);
  p.innerHTML += texto;
  p.innerHTML += "<hr>"
}

function hora()
{
  var hoy = new Date();
  var hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
  var fecha = hoy.getDate() + "-" + (hoy.getMonth()+1) + "-" + hoy.getFullYear();
  return hora + " del " + fecha;
}

//Verifico cuanto dinero hay en el cajero
function calcularDisponible()
{
  var total = 0;
  for (c of caja)
  {
    total += (c.valor * c.cantidad);
  }

  return total;
}
