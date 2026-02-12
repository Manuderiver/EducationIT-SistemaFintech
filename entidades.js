// Clase para la gestión de clientes
class Cliente {
    constructor(id, nombre, apellido, dni, email, password) {
        this.id = id; // Identificador único
        this.nombre = nombre; 
        this.apellido = apellido; 
        this.dni = dni; 
        this.email = email; // Correo para ingreso
        this.password = password; // Password para ingreso
    }
}

// Clase para la gestión de cuentas
class Cuenta {
    constructor(codigoUnico, cliente, saldoInicial = 0) {
        this.codigoUnico = codigoUnico; // Código único de cuenta
        this.cliente = cliente; // Asociación con un cliente
        this.saldo = saldoInicial; // Saldo inicial
        this.movimientos = []; // Registro de movimientos
    }

    consultarSaldo() {
        return this.saldo; // Permite consultar el saldo actual
    }
}

// entidades.js

// ... (Clases Cliente y Cuenta quedan igual)

class Movimiento {
    constructor(tipo, monto, hashAnterior = "0") {
        this.tipo = tipo;
        this.monto = monto;
        this.fecha = new Date().toLocaleString();
        this.hashAnterior = hashAnterior; // El vínculo con el bloque previo
        this.hash = this.generarHash(); // Su propia huella digital
    }

    // Una función simple para crear una huella digital basada en los datos del bloque
    generarHash() {
        const cadena = this.tipo + this.monto + this.fecha + this.hashAnterior;
        let hash = 0;
        for (let i = 0; i < cadena.length; i++) {
            const char = cadena.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a 32bit integer
        }
        return Math.abs(hash).toString(16); // Retorna un código hexadecimal
    }
}