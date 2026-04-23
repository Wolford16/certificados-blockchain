const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
const PDFDocument = require('pdfkit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Almacenamiento en memoria (Simula Base de Datos)
const requests = []; // Array de objetos: { wallet, nombre, estado, fecha, hash }

app.get('/status', (req, res) => {
    res.json({ status: 'Servidor de Certificados Activo', port: PORT });
});

// Estudiante: Solicitar certificado
app.post('/api/request', (req, res) => {
    const { nombre, wallet } = req.body;
    if (!nombre || !wallet) {
        return res.status(400).json({ error: 'Nombre y wallet son requeridos.' });
    }

    const existing = requests.find(r => r.wallet.toLowerCase() === wallet.toLowerCase());
    if (existing) {
        return res.status(400).json({ error: 'Ya existe una solicitud para esta wallet.' });
    }

    const newRequest = {
        wallet: wallet.toLowerCase(),
        nombre: nombre.trim(),
        estado: 'pendiente',
        fecha: new Date().toISOString().split('T')[0],
        hash: null
    };

    requests.push(newRequest);
    res.json({ success: true, request: newRequest });
});

// Estudiante: Consultar estado
app.get('/api/status/:wallet', (req, res) => {
    const wallet = req.params.wallet.toLowerCase();
    const reqData = requests.find(r => r.wallet === wallet);
    if (!reqData) {
        return res.status(404).json({ error: 'No se encontró solicitud.' });
    }
    res.json(reqData);
});

// Owner: Obtener todas las solicitudes
app.get('/api/requests', (req, res) => {
    res.json(requests);
});

// Owner: Aprobar solicitud (Genera Hash)
app.post('/api/approve', (req, res) => {
    const { wallet } = req.body;
    const reqData = requests.find(r => r.wallet === wallet.toLowerCase());

    if (!reqData) {
        return res.status(404).json({ error: 'Solicitud no encontrada.' });
    }

    if (reqData.estado === 'aprobado') {
        return res.status(400).json({ error: 'La solicitud ya está aprobada.' });
    }

    const certificado = {
        nombre: reqData.nombre,
        curso: "Fundamentos de Teologia",
        fecha: reqData.fecha,
        institucion: "Seminario Teologico Blockchain",
        tipo: "Certificado de Finalizacion"
    };

    const raw = JSON.stringify(certificado);
    const hash = crypto.createHash('sha256').update(raw).digest('hex');

    reqData.hash = hash;
    reqData.estado = 'aprobado';

    res.json({ success: true, request: reqData });
});

// Estudiante/Owner: Descargar PDF
app.get('/api/download-pdf/:wallet', (req, res) => {
    const wallet = req.params.wallet.toLowerCase();
    const reqData = requests.find(r => r.wallet === wallet);

    if (!reqData || reqData.estado !== 'aprobado') {
        return res.status(404).json({ error: 'Certificado no disponible o no aprobado.' });
    }

    const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margin: 50
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificado_${reqData.nombre.replace(/\s+/g, '_')}.pdf`);

    doc.pipe(res);

    // Diseño del PDF
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke('#4a90e2');
    doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke('#4a90e2');

    doc.fontSize(30).fillColor('#2c3e50').text('CERTIFICADO DE FINALIZACIÓN', { align: 'center' });
    doc.moveDown(1);
    
    doc.fontSize(16).fillColor('#7f8c8d').text('Otorgado a:', { align: 'center' });
    doc.moveDown(0.5);
    
    doc.fontSize(36).fillColor('#2c3e50').text(reqData.nombre, { align: 'center' });
    doc.moveDown(1);
    
    doc.fontSize(16).fillColor('#7f8c8d').text('Por haber completado satisfactoriamente el curso de:', { align: 'center' });
    doc.moveDown(0.5);
    
    doc.fontSize(24).fillColor('#e67e22').text('Fundamentos de Teología', { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(14).fillColor('#34495e')
       .text(`Institución: Seminario Teológico Blockchain`, { align: 'center' })
       .text(`Fecha de Emisión: ${reqData.fecha}`, { align: 'center' });
       
    doc.moveDown(2);
    doc.fontSize(10).fillColor('#95a5a6')
       .text(`Hash: ${reqData.hash}`, { align: 'center' })
       .text(`Wallet: ${reqData.wallet}`, { align: 'center' });

    doc.end();
});

app.listen(PORT, () => {
    console.log(`Backend de Certificados ejecutándose en http://localhost:${PORT}`);
});
