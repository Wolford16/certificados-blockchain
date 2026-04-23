document.addEventListener('DOMContentLoaded', () => {
    const connectWalletBtn = document.getElementById('connectWalletBtn');
    const walletAddressDisplay = document.getElementById('walletAddressDisplay');
    const studentNameInput = document.getElementById('studentName');
    const requestBtn = document.getElementById('requestBtn');
    
    const requestSection = document.getElementById('requestSection');
    const statusSection = document.getElementById('statusSection');
    const statusText = document.getElementById('statusText');
    const statusDesc = document.getElementById('statusDesc');
    const approvedDetails = document.getElementById('approvedDetails');
    const certificateHash = document.getElementById('certificateHash');
    const refreshStatusBtn = document.getElementById('refreshStatusBtn');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');

    let studentAddress = '';

    async function connectWallet() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                studentAddress = accounts[0];
                walletAddressDisplay.textContent = `Conectado: ${studentAddress}`;
                walletAddressDisplay.classList.remove('hidden');
                connectWalletBtn.style.display = 'none';
                
                // Al conectar, revisar si ya tiene una solicitud
                checkStatus();
            } catch (error) {
                console.error('Error al conectar:', error);
                alert('Debe permitir el acceso a su wallet para continuar.');
            }
        } else {
            alert('MetaMask no está instalado. Por favor, instale la extensión de MetaMask.');
        }
    }

    async function submitRequest() {
        if (!studentAddress) {
            alert('Por favor, conecte su wallet de MetaMask primero.');
            return;
        }

        const nombre = studentNameInput.value.trim();
        if (!nombre) {
            alert('Por favor, ingrese un nombre.');
            return;
        }

        requestBtn.disabled = true;
        requestBtn.textContent = 'Enviando...';

        try {
            const res = await fetch('/api/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, wallet: studentAddress })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Error al enviar la solicitud.');
                return;
            }

            // Exito
            showStatusUI(data.request);

        } catch (error) {
            console.error(error);
            alert('Error de conexión con el servidor.');
        } finally {
            requestBtn.disabled = false;
            requestBtn.textContent = 'Enviar Solicitud';
        }
    }

    async function checkStatus() {
        if (!studentAddress) return;
        
        try {
            const res = await fetch(`/api/status/${studentAddress}`);
            if (res.ok) {
                const data = await res.json();
                showStatusUI(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function showStatusUI(requestData) {
        requestSection.classList.add('hidden');
        statusSection.classList.remove('hidden');

        if (requestData.estado === 'aprobado') {
            statusText.textContent = '¡Aprobado!';
            statusText.style.color = '#4ade80';
            statusDesc.classList.add('hidden');
            approvedDetails.classList.remove('hidden');
            certificateHash.textContent = requestData.hash;
        } else {
            statusText.textContent = 'Pendiente';
            statusText.style.color = 'var(--accent-color)';
            statusDesc.classList.remove('hidden');
            approvedDetails.classList.add('hidden');
        }
    }

    function downloadPDF() {
        if (!studentAddress) return;
        // Navegar a la URL del PDF, lo que forzará la descarga en el navegador
        window.open(`/api/download-pdf/${studentAddress}`, '_blank');
    }

    // Events
    connectWalletBtn.addEventListener('click', connectWallet);
    requestBtn.addEventListener('click', submitRequest);
    studentNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitRequest();
    });
    refreshStatusBtn.addEventListener('click', checkStatus);
    downloadPdfBtn.addEventListener('click', downloadPDF);

});
