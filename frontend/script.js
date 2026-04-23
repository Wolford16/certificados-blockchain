document.addEventListener('DOMContentLoaded', () => {
    const studentNameInput = document.getElementById('studentName');
    const generateBtn = document.getElementById('generateBtn');
    const resultSection = document.getElementById('resultSection');
    
    // Display elements
    const displayNombre = document.getElementById('displayNombre');
    const displayFecha = document.getElementById('displayFecha');
    const certificateHash = document.getElementById('certificateHash');
    const modalHash = document.getElementById('modalHash');
    
    // Buttons
    const copyHashBtn = document.getElementById('copyHashBtn');
    const registerBlockchainBtn = document.getElementById('registerBlockchainBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeX = document.querySelector('.close-modal');
    
    // Modal
    const blockchainModal = document.getElementById('blockchainModal');

    let currentHash = '';

    /**
     * Llama al backend para generar el certificado y el hash.
     */
    async function handleGenerate() {
        const nombre = studentNameInput.value.trim();
        
        if (!nombre) {
            alert('Por favor, ingrese un nombre.');
            return;
        }

        generateBtn.disabled = true;
        generateBtn.textContent = 'Generando...';

        try {
            const response = await fetch('http://localhost:3000/generate-certificate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre })
            });

            if (!response.ok) {
                throw new Error('Error en el servidor al generar el certificado.');
            }

            const data = await response.json();

            // Actualizar UI
            displayNombre.textContent = data.certificado.nombre;
            displayFecha.textContent = data.certificado.fecha;
            certificateHash.textContent = data.hash;
            modalHash.textContent = data.hash;
            currentHash = data.hash;

            // Mostrar sección de resultados con animación
            resultSection.classList.remove('hidden');
            resultSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            console.error('Error:', error);
            alert('No se pudo conectar con el servidor. Asegúrese de que el backend esté ejecutándose en el puerto 3000.');
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = 'Generar Certificado';
        }
    }

    /**
     * Copia el hash al portapapeles.
     */
    function handleCopyHash() {
        if (!currentHash) return;

        navigator.clipboard.writeText(currentHash).then(() => {
            const originalText = copyHashBtn.textContent;
            copyHashBtn.textContent = '✅';
            setTimeout(() => {
                copyHashBtn.textContent = '📋';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
            alert('Error al copiar el hash.');
        });
    }

    // Event Listeners
    generateBtn.addEventListener('click', handleGenerate);

    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGenerate();
    });

    copyHashBtn.addEventListener('click', handleCopyHash);

    registerBlockchainBtn.addEventListener('click', () => {
        blockchainModal.classList.remove('hidden');
    });

    const closeModal = () => blockchainModal.classList.add('hidden');
    closeModalBtn.addEventListener('click', closeModal);
    closeX.addEventListener('click', closeModal);

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', (e) => {
        if (e.target === blockchainModal) closeModal();
    });
});
