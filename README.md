# 🏦 EducacionIT Wallet - Sistema Fintech con Blockchain

Este proyecto es una aplicación web de gestión financiera desarrollada para el curso de **EducacionIT**. La plataforma permite a los usuarios gestionar sus cuentas bancarias, realizar transacciones y garantiza la integridad de los datos mediante una estructura de **Blockchain**.

##  Características Principales

* **Gestión de Cuentas (POO):** Implementación de clases en JavaScript para Clientes, Cuentas y Movimientos.
* **Persistencia de Datos:** Uso de `localStorage` para mantener el saldo y el historial de transacciones incluso después de cerrar el navegador.
* **Seguridad Blockchain:** Cada transacción genera un hash único basado en el contenido del bloque y el hash del bloque anterior.
* **Validación de Integridad:** Herramienta integrada para auditar la cadena de bloques y detectar alteraciones fraudulentas.
* **Interfaz Amigable:** Diseño responsivo y moderno realizado con HTML5 y CSS3.

##  Tecnologías Utilizadas

* **HTML5 / CSS3**: Estructura y diseño visual.
* **JavaScript (ES6+)**: Lógica de programación, manipulación del DOM y algoritmos de hashing.
* **LocalStorage**: Almacenamiento local en el navegador.

##  Credenciales de Prueba (Demo)

Para probar la aplicación, puede utilizar los siguientes datos de acceso:
* **Email:** `moe@fintech.com`
* **Contraseña:** `duff123`

##  Estructura del Proyecto (POO)

El sistema se basa en tres clases principales:
1.  **Cliente**: Almacena ID, nombre, apellido, DNI, email y password.
2.  **Cuenta**: Gestiona el código único, la asociación con el cliente y el saldo.
3.  **Movimiento**: Cada bloque de la cadena que almacena tipo, monto, fecha, hash actual y hash anterior.

##  Desafío Blockchain
Se ha implementado una función de hashing personalizada que vincula cada movimiento con el anterior. Puede verificar la seguridad presionando el botón **"Validar Seguridad"** en el panel principal; el sistema recorrerá la cadena confirmando que ningún dato haya sido manipulado.
