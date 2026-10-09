// simulador de compras
alert("Bienvenido al simulador de compras");
let nombre;

function saludar() {
  nombre = prompt("Ingrese su nombre");
  alert("Hola, " + nombre + "! Bienvenido al simulador de compras.");
  return nombre;
}

let producto;
let cantidad;

function comprar() {
  do {
    producto = parseInt(
      prompt(
        "Ingrese el producto que desea comprar:  \n1. Camiseta - $2000 \n2. Pantalón - $4000 \n3. Zapatos - $6000 \n4. Accesorios - $1000",
      ),
    );
    if (isNaN(producto) || producto < 1 || producto > 4) {
      alert("Producto no válido");
    }
  } while (isNaN(producto) || producto < 1 || producto > 4);
  cantidad = parseInt(prompt("Ingrese la cantidad que desea comprar:"));
  switch (producto) {
    case 1:
      producto = "Camiseta";
      precioTotal = 2000 * cantidad;
      alert("El precio total de su compra es: $" + precioTotal);
      break;

    case 2:
      producto = "Pantalón";
      precioTotal = 4000 * cantidad;
      alert("El precio total de su compra es: $" + precioTotal);
      break;
    case 3:
      producto = "Zapatos";
      precioTotal = 6000 * cantidad;
      alert("El precio total de su compra es: $" + precioTotal);
      break;
    case 4:
      producto = "Accesorios";
      precioTotal = 1000 * cantidad;
      alert("El precio total de su compra es: $" + precioTotal);
      break;
    default:
      alert("Producto no válido");
      return;
  }
  return precioTotal;
}
function metodoPago(precioTotal) {
  metodo = parseFloat(
    prompt(
      "Ingrese el metodo de pago que desea utilizar:\n1- Efectivo (10% de descuento) \n2- Transeferencia (5% de recargo) \n3- tarjeta de credito (10% de recargo)",
    ),
  );
  switch (metodo) {
    case 1:
      metodo = "efectivo (10% de descuento)";
      precioTotal = precioTotal - precioTotal * 0.1;
      alert("El precio total con descuento es: $" + precioTotal);
      break;
    case 2:
      metodo = "transferencia (5% de recargo)";
      precioTotal = precioTotal + precioTotal * 0.05;
      alert("El precio total con recargo es: $" + precioTotal);
      break;
    case 3:
      metodo = "tarjeta de credito (10% de recargo)";
      precioTotal = precioTotal + precioTotal * 0.1;
      alert("El precio total con recargo es: $" + precioTotal);
      break;
    default:
      alert("Método de pago no válido");
      return;
  }
  return precioTotal;
}
const MostrarDeCompra = (
  usuario,
  producto,
  cantidad,
  precioTotal,
  metodoPago,
) => {
  alert(
    "Detalle de la compra: \nNombre: " +
      usuario +
      "\nProducto: " +
      producto +
      "\nCantidad: " +
      cantidad +
      "\nPrecio total: $" +
      precioTotal +
      "\nMétodo de pago: " +
      metodoPago,
  );
  console.log(
    "Detalle de la compra: \nNombre: " +
      usuario +
      "\nProducto: " +
      producto +
      "\nCantidad: " +
      cantidad +
      "\nPrecio total: $" +
      precioTotal +
      "\nMétodo de pago: " +
      metodoPago,
  );
};
saludar();
comprar();
metodoPago(precioTotal);
MostrarDeCompra(nombre, producto, cantidad, precioTotal, metodo);
