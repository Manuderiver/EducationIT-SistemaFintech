// script.js

// 1. FUNCIÓN DE CARGA E INICIALIZACIÓN (REHIDRATACIÓN)
function cargarDatos() {
    const rawData = localStorage.getItem('cuentaFintech');
    
    if (rawData) {
        const datos = JSON.parse(rawData);
        
        // Convertimos el JSON de nuevo en objetos reales de nuestras clases
        const cliente = new Cliente(
            datos.cliente.id, 
            datos.cliente.nombre, 
            datos.cliente.apellido, 
            datos.cliente.dni, 
            datos.cliente.email, 
            datos.cliente.password
        );
        
        const cuenta = new Cuenta(datos.codigoUnico, cliente, datos.saldo);
        // Recuperamos los movimientos (importante para el blockchain)
        cuenta.movimientos = datos.movimientos; 
        return cuenta;
    } else {
        // Datos iniciales si es la primera vez que se abre la app
        const clienteMoe = new Cliente(1, "Moe", "Szyslak", "11223344", "moe@fintech.com", "duff123");
        return new Cuenta("CTA-001", clienteMoe, 5000);
    }
}

// Inicializamos la cuenta globalmente
let cuentaActivaGlobal = cargarDatos();

// 2. OBJETO PRINCIPAL DE LA APLICACIÓN
const app = {
    cuentaActiva: null,

    login: function() {
        const email = document.getElementById('login-email').value;
        const pass = document.getElementById('login-pass').value;

        if (email === cuentaActivaGlobal.cliente.email && pass === cuentaActivaGlobal.cliente.password) {
            this.cuentaActiva = cuentaActivaGlobal;
            this.mostrarDashboard();
        } else {
            alert("Credenciales incorrectas (moe@fintech.com / duff123)");
        }
    },

    mostrarDashboard: function() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard-screen').classList.remove('hidden');
        document.getElementById('user-welcome').innerText = `Hola, ${this.cuentaActiva.cliente.nombre}!`;
        this.actualizarInterfaz();
    },

    actualizarInterfaz: function() {
        // Mostramos saldo y guardamos estado
        document.getElementById('display-saldo').innerText = `$${this.cuentaActiva.consultarSaldo()}`;
        localStorage.setItem('cuentaFintech', JSON.stringify(this.cuentaActiva));
    },

    operar: function(tipo) {
        const monto = parseFloat(prompt(`Ingrese el monto a ${tipo}:`));
        if (isNaN(monto) || monto <= 0) return alert("Monto no válido");

        if (tipo === 'retirar') {
            if (monto > this.cuentaActiva.saldo) return alert("Saldo insuficiente");
            this.cuentaActiva.saldo -= monto;
        } else {
            this.cuentaActiva.saldo += monto;
        }

        // --- LÓGICA DE BLOCKCHAIN ---
        // Buscamos el hash del último bloque para encadenar el nuevo
        let ultimoHash = "0";
        if (this.cuentaActiva.movimientos.length > 0) {
            ultimoHash = this.cuentaActiva.movimientos[this.cuentaActiva.movimientos.length - 1].hash;
        }

        // Creamos el movimiento vinculado al anterior
        const nuevoMov = new Movimiento(tipo.toUpperCase(), monto, ultimoHash);
        
        // Guardamos en el historial de la cuenta
        this.cuentaActiva.movimientos.push(nuevoMov);

        this.actualizarInterfaz();
        alert(`Operación segura registrada.\nHash: ${nuevoMov.hash}`);
    },

    verMovimientos: function() {
        if (this.cuentaActiva.movimientos.length === 0) return alert("No hay movimientos registrados.");

        let historial = "--- Historial (Blockchain) ---\n";
        this.cuentaActiva.movimientos.forEach((m, index) => {
            historial += `Bloque #${index} | ${m.tipo}\n`;
            historial += `Monto: $${m.monto} | Fecha: ${m.fecha}\n`;
            historial += `Hash Anterior: ${m.hashAnterior.substring(0, 10)}...\n`;
            historial += `Hash Actual: ${m.hash.substring(0, 10)}...\n`;
            historial += `----------------------------\n`;
        });
        alert(historial);
    },

    // FUNCIÓN PARA VALIDAR LA INTEGRIDAD DE LA CADENA
    validarSeguridad: function() {
        if (this.cuentaActiva.movimientos.length < 2) {
            return alert("No hay suficientes movimientos para validar la cadena.");
        }

        let esValida = true;
        for (let i = 1; i < this.cuentaActiva.movimientos.length; i++) {
            const actual = this.cuentaActiva.movimientos[i];
            const anterior = this.cuentaActiva.movimientos[i-1];
            
            // Si el enlace se rompe, la cadena no es válida
            if (actual.hashAnterior !== anterior.hash) {
                esValida = false;
                break;
            }
        }
        
        if (esValida) {
            alert("🔒 ÉXITO: La integridad de los datos está garantizada. Ningún registro ha sido alterado.");
        } else {
            alert("🚨 PELIGRO: Se ha detectado una alteración en la base de datos.");
        }
    }
};