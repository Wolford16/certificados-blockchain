# Guía de Uso Detallada: Blockchain Certificate System 📜

Bienvenido al sistema de certificación académica inmutable. Esta guía le llevará paso a paso por todo el flujo del sistema, que ahora incluye roles de Estudiante y Administrador, uso de MetaMask y generación de PDF.

---

## 🏗️ Paso 1: Preparación del Entorno

1. Entre a la carpeta del servidor: `cd backend`
2. Instale dependencias (incluye librerías nuevas como `pdfkit`): `npm install`
3. Inicie el servidor: `node index.js`

> [!IMPORTANT]
> Recuerde que el backend debe estar siempre activo mientras use la interfaz web, de lo contrario no se podrán procesar solicitudes ni generar PDFs.

---

## 🎓 Paso 2: Flujo del Estudiante (Solicitud)

Asegúrese de tener instalada la extensión **MetaMask** en su navegador.

1. **Abra su navegador** y vaya a: [http://localhost:3000](http://localhost:3000)
2. Seleccione la opción **"Soy Estudiante"**.
3. Haga clic en **"Conectar MetaMask"** y apruebe la conexión en la ventana emergente. Su dirección aparecerá en pantalla.
4. Ingrese su **Nombre Completo** y haga clic en **"Enviar Solicitud"**.
5. Verá que su estado cambia a **Pendiente**. Aquí termina la fase del estudiante por ahora.

---

## 🏛️ Paso 3: Flujo del Administrador (Aprobación)

1. En el navegador, vuelva al inicio o vaya directamente a `http://localhost:3000/owner.html`.
2. Seleccione **"Soy Administrador"**.
3. Ingrese la contraseña de seguridad: `admin123`
4. En el Panel de Administración, verá una tabla con las solicitudes de los estudiantes.
5. Busque la solicitud en estado *Pendiente* y haga clic en **"Aprobar y Registrar"**.
6. Aparecerá un cuadro de diálogo confirmando la acción. Al aceptar, el sistema generará automáticamente el Hash SHA-256.
7. Se abrirá una ventana con instrucciones precisas mostrando el **Hash** y la **Wallet** del estudiante. NO cierre esta ventana todavía.

---

## 🔗 Paso 4: Registro en Blockchain (Remix IDE)

Como administrador, debe "notariar" esta información en la Blockchain.

1. Abra [Remix IDE](https://remix.ethereum.org) en otra pestaña.
2. Cree un archivo llamado `CertificateRegistry.sol` y pegue el código que está en su carpeta `contracts/`.
3. Compile el contrato en la pestaña "Solidity Compiler".
4. Despliegue (Deploy) el contrato en la pestaña "Deploy & Run Transactions".
5. Expanda su contrato desplegado y busque la función naranja `issueCertificate`.
6. En el primer campo (`_hash`), pegue el **Hash** que le dio el sistema en el Paso 3.
7. En el segundo campo (`student`), pegue la **Wallet** del estudiante que también le dio el sistema.
8. Haga clic en `transact`.
9. ¡Listo! Vuelva al panel de administrador en el sistema y haga clic en **"Marcar como Aprobado"** para cerrar la ventana.

---

## ✅ Paso 5: Descarga del PDF (Estudiante)

1. Vuelva a la pestaña del Estudiante (o haga que el estudiante ingrese nuevamente y conecte su MetaMask).
2. Haga clic en **"Actualizar Estado"**.
3. El estado cambiará a color verde (**¡Aprobado!**) y mostrará el Hash definitivo.
4. Aparecerá un botón para **Descargar Certificado en PDF**.
5. Al hacer clic, se descargará su diploma oficial, el cual contiene el Hash impreso que cualquier tercero puede validar en la Blockchain.

---

## 🔍 Verificación Pública (Opcional)

Si un tercero quiere validar el PDF de un alumno:
1. Va a Remix IDE con el contrato público de la universidad.
2. Busca la función azul `verifyCertificate`.
3. Pega el Hash que aparece impreso en el PDF del alumno.
4. El contrato devolverá la dirección pública de la Wallet. Si coincide con la del alumno, el certificado es 100% auténtico y no ha sido alterado.
