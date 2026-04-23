# Blockchain Certificate System 📜

Este proyecto es un sistema de certificación digital académico que utiliza blockchain para garantizar la inmutabilidad y autenticidad de los certificados emitidos.

## 🚀 Estructura del Proyecto

- `/backend`: Servidor Node.js + Express para la generación determinística de certificados y hashes SHA-256.
- `/frontend`: Interfaz web moderna (HTML/CSS/JS) con un diseño institucional premium.
- `/contracts`: Smart Contract en Solidity para el registro de hashes en la blockchain.

## 🛠️ Requisitos

- Node.js instalado.
- Navegador web moderno.
- Remix IDE (para el registro en blockchain).

## 🏃 Cómo Ejecutar

### 1. Iniciar el Sistema
Puede iniciar el sistema desde la raíz o desde la carpeta backend:

**Desde la raíz (Recomendado):**
```bash
node index.js
```

**Desde la carpeta /backend:**
1. Entre a la carpeta: `cd backend`
2. Instale dependencias: `npm install`
3. Inicie: `node index.js`

El sistema estará disponible en `http://localhost:3000`.

### 2. Abrir el Frontend
Simplemente abra el archivo `frontend/index.html` en su navegador preferido.

### 3. Flujo de Trabajo
1. Ingrese el nombre del estudiante en el frontend.
2. Haga clic en **"Generar Certificado"**.
3. Copie el hash SHA-256 generado.
4. Haga clic en **"Registrar en Blockchain"** para ver las instrucciones de registro manual en Remix IDE.

## 🔗 Registro en Blockchain (Manual)
Este sistema está diseñado para fines educativos. El registro se realiza manualmente siguiendo estos pasos:
1. Copie el código de `contracts/CertificateRegistry.sol`.
2. Péguelo en [Remix IDE](https://remix.ethereum.org).
3. Compile y despliegue el contrato.
4. Use la función `issueCertificate` pegando el hash generado por el sistema.
5. Verifique la existencia del certificado con `verifyCertificate`.

---
*Desarrollado para fines académicos y demostrativos.*
