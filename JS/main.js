const precioXHora = 12000;
const precioXHoraPico = 16000;

const reservas = [];
class Reserva {
  constructor(nombre, cancha, horaInicio, horaFin, precio) {
    this.nombre = nombre;
    this.cancha = cancha;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.precio = precio;
  }
  aplicarDescuento = () =>
    (this.precio = this.precio - (this.precio * 10) / 100);
}

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

const validarReserva = (cancha, horaInicio, horaFin) => {
  let reservada = false;
  for (let i = 0; i < reservas.length; i++) {
    if (reservas[i].cancha === cancha) {
      if (
        horaInicio < reservas[i].horaFin &&
        horaFin > reservas[i].horaInicio
      ) {
        reservada = true;
        break;
      }
    }
  }
  return reservada;
};
const modificarReserva = (nombre) => {
  for (let j = 0; j < reservas.length; j++) {
    if (reservas[j].nombre === nombre) {
      i = j;
      break;
    }
  }
  if (i === -1) {
    alert("no se encontro ninguna reserva a nombre de " + nombre);
    return;
  }
  const canchaActual = reservas[i].cancha;
  const inicio = reservas[i].horaInicio;
  const fin = reservas[i].horaFin;

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
    reservas[i].cancha = nuevaCancha;
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

alert("¡Bienvenido al simulador de turnos de pádel! ");

let seguir = true;
let turnosReservados = 0;
let recaudacion = 0;
let cancha;
let horaInicio;
let cantidadHoras;
let nombre;

while (seguir) {
  nombre = prompt("Ingresa tu nombre para reservar");
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
    let total = calcularPrecio(horaInicio, cantidadHoras);
    turnosReservados++;

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
      const reserva = new Reserva(nombre, cancha, horaInicio, horaFinal, total);
      if (cantidadHoras >= 2) {
        total = reserva.aplicarDescuento();

        alert("¡Tenés 10% de descuento por reservar 2 horas o más!");
        reservas.push(reserva);
      }
      datosValidos = true;
      let confirmarReserva = confirm(
        "confirmas la reserva en la cancha " +
          cancha +
          " desde las " +
          horaInicio +
          ":00 a " +
          horaFinal +
          ":00 ?",
      );
      recaudacion = recaudacion + total;
      if (!confirmarReserva) {
        turnosReservados--;
        recaudacion = recaudacion - total;
        reservas.pop();
        alert("Reserva cancelada.");
      } else {
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
            horaFinal +
            ":00 hs\n" +
            "Total a pagar: $" +
            total,
        );
      }
    }
  }
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
for (const reserva of reservas) {
  console.log(
    `cancha N°${reserva.cancha} reservada desde ${reserva.horaInicio}:00 hasta ${reserva.horaFin}:00 a nombre de: ${reserva.nombre}\nprecio a abonar: $${
      reserva.precio
    }`,
  );
}
alert("Gracias por usar el simulador. Turnos reservados: " + turnosReservados);
