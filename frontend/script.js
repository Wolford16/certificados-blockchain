document.addEventListener('DOMContentLoaded', () => {
    const studentNameInput = document.getElementById('studentName');
    const generateBtn = document.getElementById('generateBtn');
    const resultSection = document.getElementById('resultSection');
    
    // Wallet elements
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletAddressDisplay = document.getElementById('walletAddressDisplay');
    const certificateWallet = document.getElementById('certificateWallet');
    const copyWalletBtn = document.getElementById('copyWalletBtn');
    const modalWallet = document.getElementById('modalWallet');
    
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
    let studentAddress = '';

    /**
     * Conecta con MetaMask
     */
    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                studentAddress = accounts[0];
                walletAddressDisplay.textContent = `Conectado: ${studentAddress}`;
                walletAddressDisplay.classList.remove('hidden');
                connectWalletBtn.style.display = 'none';
            } catch (error) {
                console.error('Error al conectar:', error);
                alert('Debe permitir el acceso a su wallet para continuar.');
            }
        } else {
            alert('MetaMask no está instalado. Por favor, instale la extensión de MetaMask.');
        }
    }

    /**
     * Llama al backend para generar el certificado y el hash.
     */
    async function handleGenerate() {
        const nombre = studentNameInput.value.trim();
        
        if (!studentAddress) {
            alert('Por favor, conecte su wallet de MetaMask primero.');
            return;
        }

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
            
            // Asignar wallet
            certificateWallet.textContent = studentAddress;
            modalWallet.textContent = studentAddress;
            
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

    /**
     * Copia la wallet al portapapeles.
     */
    function handleCopyWallet() {
        if (!studentAddress) return;

        navigator.clipboard.writeText(studentAddress).then(() => {
            const originalText = copyWalletBtn.textContent;
            copyWalletBtn.textContent = '✅';
            setTimeout(() => {
                copyWalletBtn.textContent = '📋';
            }, 2000);
        }).catch(err => {
            console.error('Error al copiar:', err);
            alert('Error al copiar la wallet.');
        });
    }

    // Event Listeners
    connectWalletBtn.addEventListener('click', connectWallet);
    generateBtn.addEventListener('click', handleGenerate);

    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleGenerate();
    });

    copyHashBtn.addEventListener('click', handleCopyHash);
    copyWalletBtn.addEventListener('click', handleCopyWallet);

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
