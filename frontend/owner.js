document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const adminPasswordInput = document.getElementById('adminPassword');
    const loginBtn = document.getElementById('loginBtn');
    
    const refreshDataBtn = document.getElementById('refreshDataBtn');
    const requestsBody = document.getElementById('requestsBody');
    
    const ownerModal = document.getElementById('ownerModal');
    const closeOwnerModal = document.getElementById('closeOwnerModal');
    const modalHashToRegister = document.getElementById('modalHashToRegister');
    const modalWalletToRegister = document.getElementById('modalWalletToRegister');
    const confirmApproveBtn = document.getElementById('confirmApproveBtn');

    let currentSelectedWallet = null;

    // LOGIN SIMULADO
    loginBtn.addEventListener('click', () => {
        if (adminPasswordInput.value === 'admin123') {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            loadRequests();
        } else {
            alert('Contraseña incorrecta');
        }
    });

    adminPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loginBtn.click();
    });

    refreshDataBtn.addEventListener('click', loadRequests);

    async function loadRequests() {
        try {
            const res = await fetch('/api/requests');
            const requests = await res.json();
            renderTable(requests);
        } catch (error) {
            console.error(error);
            alert('Error al cargar solicitudes.');
        }
    }

    function renderTable(requests) {
        requestsBody.innerHTML = '';
        
        if (requests.length === 0) {
            requestsBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay solicitudes registradas</td></tr>';
            return;
        }

        requests.forEach(req => {
            const tr = document.createElement('tr');
            
            const isApproved = req.estado === 'aprobado';
            const badgeClass = isApproved ? 'status-aprobado' : 'status-pendiente';
            const badgeText = isApproved ? 'Aprobado' : 'Pendiente';
            
            let actionHtml = '';
            if (!isApproved) {
                actionHtml = `<button class="btn-secondary btn-small" onclick="approveRequest('${req.wallet}')">Aprobar y Registrar</button>`;
            } else {
                actionHtml = `<a href="/api/download-pdf/${req.wallet}" target="_blank" class="btn-secondary btn-small" style="text-decoration: none;">Ver PDF</a>`;
            }

            tr.innerHTML = `
                <td>${req.fecha}</td>
                <td><strong>${req.nombre}</strong></td>
                <td><code style="font-size: 0.8rem;">${req.wallet}</code></td>
                <td><span class="status-badge ${badgeClass}">${badgeText}</span></td>
                <td>${actionHtml}</td>
            `;
            
            requestsBody.appendChild(tr);
        });
    }

    // Exponer la función globalmente para el onClick en el HTML generado
    window.approveRequest = async function(wallet) {
        if (!confirm('¿Seguro que deseas procesar la emisión de este certificado?')) return;

        try {
            const res = await fetch('/api/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ wallet })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Error al aprobar');
                return;
            }

            // Exito: abrir modal para que el Owner lo pase a Blockchain
            modalHashToRegister.textContent = data.request.hash;
            modalWalletToRegister.textContent = data.request.wallet;
            ownerModal.classList.remove('hidden');

            loadRequests(); // Recargar tabla

        } catch (error) {
            console.error(error);
            alert('Error al conectar con el servidor.');
        }
    };

    function closeModal() {
        ownerModal.classList.add('hidden');
    }

    closeOwnerModal.addEventListener('click', closeModal);
    confirmApproveBtn.addEventListener('click', closeModal);

});
