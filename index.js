const { spawn } = require('child_process');
const path = require('path');

/**
 * Script de inicio desde la raíz del proyecto.
 * Redirige la ejecución a la carpeta /backend.
 */

console.log("------------------------------------------");
console.log("📜 Blockchain Certificate System");
console.log("Iniciando servidor desde /backend...");
console.log("------------------------------------------");

const backendPath = path.join(__dirname, 'backend');

// Ejecuta 'node index.js' dentro de la carpeta backend
const child = spawn('node', ['index.js'], {
    cwd: backendPath,
    stdio: 'inherit',
    shell: true
});

child.on('error', (err) => {
    console.error('Error al intentar iniciar el servidor:', err.message);
    console.log("\nTIP: Asegúrate de haber ejecutado 'npm install' dentro de la carpeta /backend primero.");
});

child.on('exit', (code) => {
    if (code !== 0 && code !== null) {
        console.log(`\nEl proceso terminó con el código de error: ${code}`);
    }
});
