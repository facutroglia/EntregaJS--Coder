const precioXHora = 12000;
const precioXHoraPico = 16000;

function pedirNumero(mensaje, minimo, maximo) {
  let numero = parseInt(prompt(mensaje));

  while (isNaN(numero) || numero < minimo || numero > maximo) {
    alert(
      "Dato inválido. Ingresá un número entre " + minimo + " y " + maximo + ".",
    );
    numero = parseInt(prompt(mensaje));
  }
  return numero;
}

const calcularPrecio = function (horaInicio, cantidadHoras) {
  let total = 0;

  for (let i = 0; i < cantidadHoras; i++) {
    let horaActual = horaInicio + i;

    if (horaActual >= 19) {
      total = total + precioXHoraPico;
    } else {
      total = total + precioXHora;
    }
  }

  return total;
};

console.log(calcularPrecio(14, 2));

const aplicarDescuento = (precio, porcentaje) =>
  precio - (precio * porcentaje) / 100;

function mostrarResumen(nombre, cancha, horaInicio, cantidadHoras, total) {
  let horaFin = horaInicio + cantidadHoras;
  let mensaje =
    "✅ Turno confirmado\n" +
    "Jugador: " +
    nombre +
    "\n" +
    "Cancha: " +
    cancha +
    "\n" +
    "Horario: " +
    horaInicio +
    ":00 a " +
    horaFin +
    ":00 hs\n" +
    "Total a pagar: $" +
    total;

  alert(mensaje);
  console.log(mensaje);
}

alert("¡Bienvenido al simulador de turnos de pádel! 🎾");

let seguir = true;
let turnosReservados = 0;
let recaudacion = 0;

while (seguir) {
  let nombre = prompt("¿Cuál es tu nombre?");
  while (nombre === null || nombre.trim() === "") {
    alert("Tenés que ingresar un nombre.");
    nombre = prompt("¿Cuál es tu nombre?");
  }

  let cancha = pedirNumero("¿Qué cancha querés reservar? (1, 2 o 3)", 1, 3);
  let horaInicio = pedirNumero(
    "¿A qué hora querés empezar? ( desde 14hs a 22hs )",
    14,
    22,
  );

  let maximoHoras = 23 - horaInicio;
  let cantidadHoras = pedirNumero(
    "¿Cuántas horas querés jugar? (1 a " + maximoHoras + " horas)",
    1,
    maximoHoras,
  );

  let total = calcularPrecio(horaInicio, cantidadHoras);

  if (cantidadHoras >= 2) {
    total = aplicarDescuento(total, 10);
    alert("¡Tenés 10% de descuento por reservar 2 horas o más!");
  }

  mostrarResumen(nombre, cancha, horaInicio, cantidadHoras, total);

  turnosReservados++;
  recaudacion = recaudacion + total;

  seguir = confirm("¿Querés reservar otro turno?");
}

console.log("===== CIERRE =====");
console.log("Turnos reservados: " + turnosReservados);
console.log("Recaudación total: $" + recaudacion);
alert("Gracias por usar el simulador. Turnos reservados: " + turnosReservados);
