const TARIFA = 5;
const DESCUENTO = 10;

let registros = [];

// Función para calcular la tarifa
function calcularTarifa(horas) {
    let subtotal = horas * TARIFA;
    let descuento = 0;

    if (horas >= 5) {
        descuento = subtotal * DESCUENTO / 100;
    }

    let total = subtotal - descuento;

    return {
        subtotal,
        descuento,
        total
    };
}

// Función para mostrar los registros
function mostrarResumen() {
    let resumen = document.getElementById("resumen");
    let totalGeneral = 0;

    resumen.innerHTML = "";

    if (registros.length === 0) {
        resumen.innerHTML = "Aún no hay vehículos registrados.";
    }

    registros.forEach(function(vehiculo, i) {
        totalGeneral += vehiculo.total;

        resumen.innerHTML += `
            <div class="registro">
                <strong>Vehículo ${i + 1}: ${vehiculo.placa}</strong><br>
                Horas: ${vehiculo.horas}<br>
                Subtotal: S/ ${vehiculo.subtotal.toFixed(2)}<br>
                Descuento: S/ ${vehiculo.descuento.toFixed(2)}<br>
                Total: S/ ${vehiculo.total.toFixed(2)}
            </div>
        `;
    });

    document.getElementById("totalGeneral").innerHTML =
        "Total recaudado: S/ " + totalGeneral.toFixed(2);
}

// Función para registrar vehículos
function registrarVehiculo() {
    let placa = document.getElementById("placa").value.trim().toUpperCase();
    let horas = Number(document.getElementById("horas").value);

    if (placa === "" || !Number.isInteger(horas) || horas <= 0) {
        alert("Ingrese una placa y horas válidas.");
        return;
    }

    let resultado = calcularTarifa(horas);

    registros.push({
        placa: placa,
        horas: horas,
        subtotal: resultado.subtotal,
        descuento: resultado.descuento,
        total: resultado.total
    });

    mostrarResumen();

    document.getElementById("placa").value = "";
    document.getElementById("horas").value = "";
}

// Función para limpiar registros
function limpiarRegistros() {
    registros = [];
    mostrarResumen();
}

// Eventos de los botones
document.getElementById("btnRegistrar")
    .addEventListener("click", registrarVehiculo);

document.getElementById("btnLimpiar")
    .addEventListener("click", limpiarRegistros);

// Mostrar resumen inicial
mostrarResumen();
