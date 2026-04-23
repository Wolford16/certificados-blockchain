# Guía de Uso Detallada: Blockchain Certificate System 📜

Bienvenido al sistema de certificación académica inmutable. Esta guía le llevará paso a paso por todo el flujo, desde la instalación inicial hasta el registro final en la blockchain de Ethereum.

---

## 🏗️ Paso 1: Preparación del Entorno

### 1. Iniciar el Sistema
Puede iniciar el sistema desde la raíz del proyecto o desde la carpeta backend:

**Desde la raíz (Recomendado):**
```bash
node index.js
```

**Desde la carpeta /backend:**
1. Entre a la carpeta: `cd backend`
2. Instale dependencias: `npm install`
3. Inicie: `node index.js`
   *Este comando iniciará automáticamente el backend por usted.*

> [!TIP]
> Si es la primera vez que lo usa, asegúrese de haber ejecutado `npm install` dentro de la carpeta `backend`.

---

## 🎨 Paso 2: Generación del Certificado

Con el backend funcionando, ahora usaremos la interfaz visual.

1. **Abra su navegador** y vaya a: [http://localhost:3000](http://localhost:3000)
   - *Opcional: También puede abrir el archivo `frontend/index.html` directamente.*
2. **Ingrese el nombre**: Escriba el nombre completo del estudiante.
3. **Genere el certificado**: Haga clic en el botón dorado **"Generar Certificado"**.
   - El sistema enviará el nombre al backend.
   - Se generará un certificado digital con estructura fija.
   - Aparecerá una vista previa elegante del diploma.
4. **Copie el Identificador (Hash)**: 
   - Debajo del certificado verá un código largo (SHA-256).
   - Haga clic en el icono de la tablilla (📋) para copiarlo al portapapeles.

---

## 🔗 Paso 3: Registro en Blockchain (Remix IDE)

Este es el paso crucial donde hacemos que el certificado sea oficial e inmutable.

1. **Vaya a Remix IDE**: [https://remix.ethereum.org](https://remix.ethereum.org).
2. **Cree un nuevo archivo**: Llámelo `CertificateRegistry.sol`.
3. **Pegue el código del contrato**: Copie el contenido de `contracts/CertificateRegistry.sol` de su proyecto y péguelo en Remix.
4. **Compile**: Presione `Ctrl + S` o vaya al icono de "Solidity Compiler" y haga clic en **"Compile CertificateRegistry.sol"**.
5. **Despliegue (Deploy)**:
   - Vaya a la pestaña "Deploy & Run Transactions".
   - Asegúrese de que el contrato seleccionado sea `CertificateRegistry`.
   - Haga clic en el botón naranja **"Deploy"**.
6. **Registre el Hash**:
   - En la sección "Deployed Contracts", expanda `CertificateRegistry`.
   - Busque la función naranja `issueCertificate`.
   - Pegue el Hash que copió en el Paso 2 dentro del campo de texto.
   - Haga clic en el botón `issueCertificate`.
   - *¡Listo! El hash ahora vive en la blockchain.*

---

## ✅ Paso 4: Verificación

¿Cómo sabemos que realmente se registró?

1. En Remix, busque la función azul `verifyCertificate`.
2. Pegue el mismo Hash y haga clic en el botón.
3. El resultado debe ser `true`. 
   - *Si intenta con cualquier otra palabra o un hash modificado, el resultado será `false`.*

---

## 🖼️ Resumen del Flujo Visual

![Flujo del Sistema](file:///C:/Users/cesar/.gemini/antigravity/brain/33116cdd-2c43-4300-9858-f26d94f46ce2/blockchain_certificate_flow_1776832420457.png)

---

> [!IMPORTANT]
> Recuerde que el backend debe estar siempre activo mientras use la interfaz web, de lo contrario no se podrán generar nuevos certificados ni hashes.
