# Blockchain Certificate System 📜

Este proyecto es un sistema de certificación digital académico que utiliza blockchain para garantizar la inmutabilidad y autenticidad de los certificados emitidos, asociándolos directamente a la identidad digital (Wallet) del estudiante.

## 🚀 Características Principales

- **Roles Separados:** Portal para Estudiantes y Panel Privado para Administradores.
- **Identidad Digital:** Integración con **MetaMask** para vincular certificados a billeteras criptográficas en lugar de correos electrónicos.
- **Flujo Institucional:** Solicitud de certificados, panel de aprobación y emisión controlada.
- **Generación Visual:** Creación dinámica de diplomas en **PDF** listos para descargar.
- **Blockchain Inmutable:** Registro de hashes SHA-256 mediante un Smart Contract en Solidity.

## 🛠️ Requisitos

- Node.js instalado.
- Navegador web moderno.
- Extensión **MetaMask** instalada en el navegador.
- Remix IDE (para el registro notarial en blockchain).

## 🏃 Cómo Ejecutar

### 1. Iniciar el Backend
El backend procesa las solicitudes, genera los hashes y dibuja los PDFs.

1. Entre a la carpeta: `cd backend`
2. Instale dependencias: `npm install`
3. Inicie el servidor: `node index.js`

El sistema estará disponible en `http://localhost:3000`.

### 2. Flujo de Trabajo
1. Abra `http://localhost:3000` en su navegador.
2. Seleccione su rol:
   - **Estudiante:** Conecta su MetaMask, ingresa su nombre y envía la solicitud.
   - **Administrador:** Ingresa con la contraseña `admin123`. Revisa solicitudes pendientes, aprueba la emisión y recibe el Hash para registrarlo en la blockchain.
3. El Administrador registra manualmente el Hash y la Wallet en Remix.
4. El Estudiante descarga su PDF final con la garantía blockchain incrustada.

---
*Desarrollado para fines académicos y demostrativos.*
