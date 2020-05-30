class Billete
{
    constructor(valor, cantidad)
    {
      this.valor = valor;
      this.cantidad = cantidad;
      this.imagen = new Image();

      this.imagen.src = "Imagenes/" + imagenes[this.valor];
    }

    mostrar()
    {

      //document.body.appendChild(this.imagen);

      var p = document.createElement("p");
      document.body.appendChild(p);
      p.appendChild(this.imagen);
      p.innerHTML += " X " + this.cantidad ;
    }
}
