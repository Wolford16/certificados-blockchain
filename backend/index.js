const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta informativa para evitar el "Cannot GET /"
app.get('/status', (req, res) => {
    res.json({ status: 'Servidor de Certificados Activo', port: PORT });
});

/**
 * Genera un certificado determinístico y su hash SHA-256.
 */
app.post('/generate-certificate', (req, res) => {
    const { nombre } = req.body;

    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: 'El nombre es obligatorio y debe ser una cadena.' });
    }

    // Fecha en formato ISO (YYYY-MM-DD)
    const fecha = new Date().toISOString().split('T')[0];

    // Estructura fija y orden determinístico
    const certificado = {
        nombre: nombre.trim(),
        curso: "Fundamentos de Teologia",
        fecha: fecha,
        institucion: "Seminario Teologico Blockchain",
        tipo: "Certificado de Finalizacion"
    };

    // Serialización exacta sin espacios adicionales
    const raw = JSON.stringify(certificado);

    // Generación del hash SHA-256
    const hash = crypto.createHash('sha256').update(raw).digest('hex');

    res.json({
        certificado,
        raw,
        hash
    });
});

app.listen(PORT, () => {
    console.log(`Backend de Certificados ejecutándose en http://localhost:${PORT}`);
});
