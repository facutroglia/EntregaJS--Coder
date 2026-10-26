const precioXHora = 12000;
const precioXHoraPico = 16000;

const canchasReservadas = [];
const horariosDeInicio = [];
const horariosDeFin = [];
const nombresReservas = [];

const pedirNumero = (mensaje, minimo, maximo) => {
  let numero = parseInt(prompt(mensaje));

  while (isNaN(numero) || numero < minimo || numero > maximo) {
    alert(
      "Dato inválido. Ingresá un número entre " + minimo + " y " + maximo + ".",
    );
    numero = parseInt(prompt(mensaje));
  }
  return numero;
};

const calcularPrecio = (horaInicio, cantidadHoras) => {
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

const aplicarDescuento = (precio, porcentaje) =>
  precio - (precio * porcentaje) / 100;

const modificarReserva = (nombre) => {
  const i = nombresReservas.indexOf(nombre);
  if (i === -1) {
    alert("no se encontro ninguna reserva a nombre de " + nombre);
    return;
  }
  const canchaActual = canchasReservadas[i];
  const inicio = horariosDeInicio[i];
  const fin = horariosDeFin[i];

  const nuevaCancha = pedirNumero(
    "Tu reserva es en la cancha " +
      canchaActual +
      " de " +
      inicio +
      ":00 a " +
      fin +
      ":00.\n¿A qué cancha querés pasarte? (1 a 5)",
    1,
    5,
  );

  if (nuevaCancha === canchaActual) {
    alert("Ya tenés reservada esa cancha.");
  } else if (validarReserva(nuevaCancha, inicio, fin)) {
    alert("La cancha " + nuevaCancha + " está ocupada en ese horario.");
  } else {
    canchasReservadas.splice(i, 1, nuevaCancha);
    alert(
      "Listo, " +
        nombre +
        ". Tu reserva pasó de la cancha " +
        canchaActual +
        " a la " +
        nuevaCancha +
        ".",
    );
  }
};

const validarReserva = (cancha, horaInicio, horaFin) => {
  let reservada = false;
  for (let i = 0; i < canchasReservadas.length; i++) {
    if (canchasReservadas[i] === cancha) {
      if (horaInicio < horariosDeFin[i] && horaFin > horariosDeInicio[i]) {
        reservada = true;
        break;
      }
    }
  }
  return reservada;
};
alert("¡Bienvenido al simulador de turnos de pádel! ");

let seguir = true;
let turnosReservados = 0;
let recaudacion = 0;
let cancha;
let horaInicio;
let cantidadHoras;
let nombre;

while (seguir) {
  nombre = prompt("¿Cuál es tu nombre?");
  while (nombre === null || nombre.trim() === "" || !isNaN(nombre)) {
    alert("Tenés que ingresar un nombre.");
    nombre = prompt("¿Cuál es tu nombre?");
  }

  let datosValidos = false;
  while (!datosValidos) {
    cancha = pedirNumero("¿Qué cancha querés reservar? (1, 2, 3, 4, 5 )", 1, 5);

    horaInicio = pedirNumero(
      "¿A qué hora querés empezar? ( desde 14hs a 22hs )",
      14,
      22,
    );

    let maximoHoras = 23 - horaInicio;
    cantidadHoras = pedirNumero(
      "¿Cuántas horas querés jugar? (1 a " + maximoHoras + " horas)",
      1,
      maximoHoras,
    );

    let horaFinal = cantidadHoras + horaInicio;

    if (validarReserva(cancha, horaInicio, horaFinal)) {
      alert(
        "lo siento, la cancha " +
          cancha +
          " en el horario de " +
          horaInicio +
          ":00 a " +
          horaFinal +
          ":00 esta reservada. \nPruebe en un horario diferente a ese.",
      );
    } else {
      datosValidos = true;
      canchasReservadas.push(cancha);
      horariosDeInicio.push(horaInicio);
      horariosDeFin.push(horaFinal);
      nombresReservas.push(nombre);
      let confirmarReserva = confirm(
        "confirmas la reserva en la cancha " +
          cancha +
          " desde las " +
          horaInicio +
          ":00 a " +
          horaFinal +
          ":00 ?",
      );
      if (!confirmarReserva) {
        canchasReservadas.pop();
        horariosDeInicio.pop();
        horariosDeFin.pop();
        nombresReservas.pop();

        alert("Reserva cancelada.");
        datosValidos = false;
      }
    }
  }

  let total = calcularPrecio(horaInicio, cantidadHoras);
  if (cantidadHoras >= 2) {
    total = aplicarDescuento(total, 10);
    alert("¡Tenés 10% de descuento por reservar 2 horas o más!");
  }

  turnosReservados++;
  recaudacion = recaudacion + total;
  let horaFin = horaInicio + cantidadHoras;

  alert(
    "Turno confirmado\n" +
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
      total,
  );
  let modificar = confirm("Queres modificar alguna reserva?");

  while (modificar) {
    const nombreBusqueda = prompt("¿A nombre de quién está la reserva?");
    if (nombreBusqueda !== null) {
      modificarReserva(nombreBusqueda.trim());
    }
    modificar = confirm("¿Querés cambiar otra reserva?");
  }
  seguir = confirm("¿Querés reservar otro turno?");
}
console.log("===== CIERRE =====");
console.log("Turnos reservados: " + turnosReservados);
console.log("Recaudación total: $" + recaudacion);
console.log("===== Reservas =====");
let indice = 0;
for (const canchaReservada of canchasReservadas) {
  console.log(
    "Cancha " +
      canchaReservada +
      " reservada desde las " +
      horariosDeInicio[indice] +
      ":00 a " +
      horariosDeFin[indice] +
      ":00",
  );

  indice++;
}
alert("Gracias por usar el simulador. Turnos reservados: " + turnosReservados);
