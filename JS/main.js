//simulador: CAJERO AUTOMATICO
alert("Bienvenido a cajeros BancoHouse") 
let EfectivoDisponible = 25000

while(EfectivoDisponible > 0){ 
    const confirmacion = prompt("Desea realizar un retiro? (si/no)")
    
    if (confirmacion == "si"){
        let Retiro =Number(prompt("Ingrese el monto a retirar "))
        
        if(EfectivoDisponible >= Retiro){
            alert("Su retiro es de: $" + Retiro + ", ahora su saldo actual es de: $" + (EfectivoDisponible - Retiro))
            console.log("Su retiro es de: $" + Retiro + ", ahora su saldo actual es de: $" + (EfectivoDisponible - Retiro));
            EfectivoDisponible = EfectivoDisponible - Retiro
            
        }else if(EfectivoDisponible < Retiro){
            alert("fondos insuficientes, pruebe otro monto menor")
            console.log("fondos insuficientes, pruebe otro monto menor")
        }if (EfectivoDisponible <= 0){
            alert("Su saldo es de: $" + EfectivoDisponible + " No puede realizar mas retiros")
            console.log("Su saldo es de: $" + EfectivoDisponible + " No puede realizar mas retiros")
            alert("Gracias por usar nuestro cajero, vuelva pronto")
    console.log("Gracias por usar nuestro cajero, vuelva pronto")}
        
    }else if (confirmacion == "no"){
        alert("Gracias por usar nuestro cajero, vuelva pronto");
    console.log("Gracias por usar nuestro cajero, vuelva pronto");
    break;
}
}


