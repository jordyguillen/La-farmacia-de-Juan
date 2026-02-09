let inventario = [];
let totalMedicamentos = 0;
let totalVentas = 0;

function registrarMedicamento(nombre, cantidad, precio) {
    inventario[totalMedicamentos] = {
        nombre: nombre,
        cantidad: cantidad,
        precio: precio,
        vendido: 0
    };
    totalMedicamentos++;
}

function consultarInventario() {
    console.log("--------------------")
    console.log("Inventario:");
    for (let i = 0; i < totalMedicamentos; i++) {
        console.log(
            inventario[i].nombre +
            " | Stock: " + inventario[i].cantidad +
            " | Vendido: " + inventario[i].vendido +
            " | Precio: $" + inventario[i].precio
        );
    }
    console.log("--------------------");
}

function venderMedicamento(nombre, cantidadVendida) {
    let encontrado = false;

    for (let i = 0; i < totalMedicamentos; i++) {
        if (inventario[i].nombre === nombre) {
            encontrado = true;

            if (inventario[i].cantidad >= cantidadVendida) {
                inventario[i].cantidad = inventario[i].cantidad - cantidadVendida;
                inventario[i].vendido = inventario[i].vendido + cantidadVendida;

                let venta = cantidadVendida * inventario[i].precio;
                totalVentas = totalVentas + venta;

                console.log(
                    "Venta realizada: " +
                    cantidadVendida +
                    " unidades de " +
                    inventario[i].nombre
                );
            } else {
                console.log("No hay unidades de " + inventario[i].nombre);
            }
        }
    }

    if (encontrado === false) {
        console.log("Medicamento no encontrado");
    }
}

function mostrarTotalVentas() {
    console.log("RESUMEN DE VENTAS:");
    console.log("--------------------");

    for (let i = 0; i < totalMedicamentos; i++) {
        let totalProducto = inventario[i].vendido * inventario[i].precio;

        console.log(
            inventario[i].nombre +
            " | Unidades vendidas: " + inventario[i].vendido +
            " | Total: $" + totalProducto
        );
    }

    console.log("--------------------");
    console.log("TOTAL GENERAL DEL DÍA: $" + totalVentas);
}


// ===============================
// Simulación del programa
// ===============================

registrarMedicamento("Paracetamol", 20, 50);
registrarMedicamento("Ibuprofeno", 15, 80);
registrarMedicamento("Amoxicilina", 10, 120);

consultarInventario();

venderMedicamento("Paracetamol", 5);
venderMedicamento("Ibuprofeno", 3);
venderMedicamento("Paracetamol", 2);

consultarInventario();

mostrarTotalVentas();
