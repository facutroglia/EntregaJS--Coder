alert ("Bienvenido al sistema!");
alert("A continuacion te pediremos algunos datos para poder continuar con el proceso de registro");

let NameUser = prompt("¿Como te llamas?");
alert("Hola " + NameUser + " es un gusto conocerte!");
let Country = prompt("¿De que pais eres?");
let YearUser =Number(prompt("¿Cual es tu año de nacimiento?"));

let AgeUser = 2026 - YearUser;
alert("si naciste en el año " + YearUser + " significa que tu edad es de " + AgeUser + " años");


