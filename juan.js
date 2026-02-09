let inventario = [];
let totalMedicamentos = 0;
let totalVentas = 0;

function agregarMedicamento(nombre, cantidad, precio) {
    inventario[totalMedicamentos] = {
        nombre: nombre,
        cantidad: parseInt(cantidad),
        precio: parseFloat(precio),
        vendido: 0
    };
    totalMedicamentos++;

    console.log("Medicamento regístrado correctamente");
    mostrarMenu();
}

function consultarInventario() {
    console.log("\n INVENTARIO");
    console.log("================================");

    if (totalMedicamentos === 0) {
        console.log("No hay productos registrados.");
    }

    for (let i = 0; i < totalMedicamentos; i++) {
        console.log(
            `• ${inventario[i].nombre} | Stock: ${inventario[i].cantidad} | Precio: $${inventario[i].precio}`
        );
    }

    mostrarMenu();
}

function venderMedicamento(nombre, cantidadVendida) {
    let encontrado = false;
    let cant = parseInt(cantidadVendida);

    for (let i = 0; i < totalMedicamentos; i++) {
        if (inventario[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            encontrado = true;

            if (inventario[i].cantidad >= cant) {
                inventario[i].cantidad -= cant;
                inventario[i].vendido += cant;
                totalVentas += cant * inventario[i].precio;

                console.log(
                    `Venta realizada | Total: $${(cant * inventario[i].precio).toFixed(2)}`
                );
            } else {
                console.log("Venta cancelada: cantidad de producto insuficiente.");
            }
        }
    }

    if (!encontrado) {
        console.log("Medicamento no encontrado en el inventario.");
    }

    mostrarMenu();
}

function mostrarTotalVentas() {
    console.log("\nTOTAL DE VENTA EN EL DÍA");
    console.log("--------------------------------");
    console.log(`Ingresos acumulados: $${totalVentas.toFixed(2)}`);

    for (let i = 0; i < totalMedicamentos; i++) {
        if (inventario[i].vendido > 0) {
            console.log(
                `→ ${inventario[i].nombre}: ${inventario[i].vendido} salidas registradas`
            );
        }
    }

    mostrarMenu();
}

function mostrarMenu() {
    console.log("\n---- PANEL PRINCIPAL ----");
    console.log("1) Registrar medicamento");
    console.log("2) Ver inventario");
    console.log("3) Vender medicamento");
    console.log("4) Total de ventas del día");
    console.log("5) Cerrar sistema");
    process.stdout.write("Ingrese opción: ");
}

process.stdin.on("data", (data) => {
    let opcion = data.toString().trim();

    if (opcion === "1") {
        process.stdout.write("Nombre: ");
        process.stdin.once("data", (n) => {
            process.stdout.write("Cantidad: ");
            process.stdin.once("data", (c) => {
                process.stdout.write("Precio: ");
                process.stdin.once("data", (p) => {
                    agregarMedicamento(
                        n.toString().trim(),
                        c.toString().trim(),
                        p.toString().trim()
                    );
                });
            });
        });
    } else if (opcion === "2") {
        consultarInventario();
    } else if (opcion === "3") {
        process.stdout.write("Medicamento a vender: ");
        process.stdin.once("data", (n) => {
            process.stdout.write("Cantidad a vender: ");
            process.stdin.once("data", (c) => {
                venderMedicamento(
                    n.toString().trim(),
                    c.toString().trim()
                );
            });
        });
    } else if (opcion === "4") {
        mostrarTotalVentas();
    } else if (opcion === "5") {
        console.log("Sesión finalizada. Sistema desconectado correctamente.");
        process.exit();
    } else {
        console.log("ERROR, la opcion que selecciono no existe.");
        mostrarMenu();
    }
});

mostrarMenu();
