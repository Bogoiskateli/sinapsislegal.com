// Dashboard JavaScript

// Global functions that need to be accessible from HTML
window.navigateToSection = function(sectionName) {
    console.log('navigateToSection called with:', sectionName);
    
    // Show specific sections within the dashboard
    switch(sectionName) {
        case 'overview':
            showSection('overview');
            break;
        case 'tramites':
            showSection('tramites');
            if (typeof loadTramites === 'function') {
                loadTramites();
            }
            break;
        case 'documentos':
            showSection('documentos');
            break;
        case 'facturacion':
            showSection('facturacion');
            if (typeof loadFacturas === 'function') {
                loadFacturas();
            }
            break;
        case 'efirma':
            showSection('efirma');
            break;
        case 'timeline':
            showSection('timeline');
            break;
        case 'conversaciones':
            showSection('conversaciones');
            break;
        case 'formularios':
            showSection('formularios');
            break;
        default:
            showSection(sectionName);
    }
};

window.showSection = function(sectionName) {
    console.log('showSection called with:', sectionName);
    
    // Hide all sections
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section activated:', sectionName);
    } else {
        console.error('Section not found:', sectionName);
    }
};

window.showTramiteSection = function(tramiteType) {
    console.log('showTramiteSection called with:', tramiteType);
    
    // Hide all sections first
    const sections = document.querySelectorAll('.dashboard-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show tramites section
    const tramitesSection = document.getElementById('tramites');
    if (tramitesSection) {
        tramitesSection.classList.add('active');
        console.log('Tramites section activated');
            } else {
        console.error('Tramites section not found');
    }
    
    // Load specific tramite content
    if (typeof loadTramites === 'function') {
        loadTramites();
    }
    
    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => nav.classList.remove('active'));
    const tramitesNav = document.querySelector('[data-section="tramites"]');
    if (tramitesNav) {
        tramitesNav.classList.add('active');
    }
    
    // Update sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => link.classList.remove('active'));
    const tramitesSidebarLink = document.querySelector('.sidebar-link[data-section="tramites"]');
    if (tramitesSidebarLink) {
        tramitesSidebarLink.classList.add('active');
    }
    
    // Show specific tramite details if needed
    if (typeof showTramiteDetails === 'function') {
        showTramiteDetails(tramiteType);
    }
};

window.showContactSection = function() {
    console.log('showContactSection called');
    // Show conversaciones section
    if (typeof navigateToSection === 'function') {
        navigateToSection('conversaciones');
    }
};

window.showConversaciones = function() {
    console.log('showConversaciones called');
    if (typeof navigateToSection === 'function') {
        navigateToSection('conversaciones');
    }
};

window.showTramiteDetails = function(tramiteType) {
    console.log('Showing tramite details for:', tramiteType);
    // You can add specific logic here to show different content based on tramiteType
};

// Global function to load tramites
window.loadTramites = function() {
    console.log('=== DEBUG: Loading Tramites ===');
    
    const tramitesContainer = document.getElementById('tramites-grid');
    if (!tramitesContainer) {
        console.log('❌ Tramites container not found');
        return;
    }
    
    console.log('✅ Tramites container found');
    
    // Obtener trámites del localStorage - usar user_tramites en lugar de tramites
    const userTramites = JSON.parse(localStorage.getItem('user_tramites') || '[]');
    console.log('📋 User Tramites from localStorage:', userTramites);
    console.log('📊 Number of user tramites:', userTramites.length);
    
    if (userTramites.length === 0) {
        console.log('📭 No tramites found, showing empty message');
        // Mostrar mensaje de no hay trámites
        tramitesContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                <i class="fas fa-file-alt" style="font-size: 3rem; color: #cbd5e1; margin-bottom: 1rem;"></i>
                <h3 style="color: #64748b; margin-bottom: 0.5rem;">No tienes trámites</h3>
                <p style="color: #94a3b8; margin-bottom: 2rem;">Aún no has iniciado ningún trámite.</p>
                <p style="color: #94a3b8; margin-bottom: 2rem;">Los trámites aparecerán aquí cuando solicites un servicio.</p>
                <button class="btn-primary" onclick="window.location.href='index.html'">
                    <i class="fas fa-plus"></i>
                    Solicitar Servicio
                </button>
            </div>
        `;
        return;
    }
    
    console.log('🔄 Generating HTML for tramites...');
    
    // Generar HTML para cada trámite real del usuario
    const tramitesHTML = userTramites.map((tramite, index) => {
        console.log(`📝 Processing tramite ${index + 1}:`, tramite);
        
        // Determinar el tipo de trámite y nombre basado en los datos reales
        let tramiteType = 'Servicio';
        if (tramite.tramiteType) {
            // Usar la función de mapeo si está disponible
            if (typeof window.mapServiceTypeToTramiteType === 'function') {
                tramiteType = window.mapServiceTypeToTramiteType(tramite.tramiteType);
            } else {
                // Fallback: convertir el serviceType a un nombre legible
                tramiteType = tramite.tramiteType
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
            }
        }
        
        let tramiteName = 'N/A';
        if (tramite.formData) {
            tramiteName = tramite.formData.marca || tramite.formData.empresa || tramite.formData.companyName || 'N/A';
        }
        let status = tramite.status || 'pending';
        let progress = tramite.progress || 0;
        let fecha = new Date(tramite.createdAt).toLocaleDateString('es-ES');
        
        console.log(`🏷️ Tramite type: ${tramiteType}, name: ${tramiteName}`);
        
        const statusText = getStatusText(status);
        const statusClass = getStatusClass(status);
        const progressClass = progress >= 75 ? 'completed' : '';
        const icon = getTramiteIcon(tramiteType);
        
        return `
            <div class="tramite-card" onclick="showTramiteDetails('${tramite.id}')">
                <div class="tramite-header">
                    <div class="tramite-icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="tramite-info">
                        <h3>${tramiteType} "${tramiteName}"</h3>
                        <p>Estado: ${statusText}</p>
                        <p>Fecha: ${fecha}</p>
                    </div>
                    <div class="tramite-status">
                        <span class="status-badge ${statusClass}">${getStatusBadgeText(status)}</span>
                    </div>
                </div>
                <div class="tramite-progress">
                    <div class="progress-bar">
                        <div class="progress-fill ${progressClass}" style="width: ${progress}%;"></div>
                    </div>
                    <span class="progress-text">${progress}% Completado</span>
                </div>
                <div class="tramite-actions">
                    <button class="btn-secondary" onclick="event.stopPropagation(); showTramiteDetails('${tramite.id}')">
                        <i class="fas fa-eye"></i>
                        Ver Detalles
                    </button>
                    ${tramite.poder && tramite.poder.requerido && !tramite.poder.firmado ? 
                        `<button class="btn-primary" onclick="event.stopPropagation(); showPoderModal('${tramite.id}')">
                            <i class="fas fa-signature"></i>
                            Firmar Poder
                        </button>` : ''
                    }
                </div>
            </div>
        `;
    }).join('');
    
    console.log('✅ Generated HTML for tramites');
    console.log('📄 HTML length:', tramitesHTML.length);
    
    tramitesContainer.innerHTML = tramitesHTML;
    console.log('✅ Tramites loaded successfully');
    
    // Actualizar estadísticas del dashboard
    if (typeof updateDashboardStats === 'function') {
        updateDashboardStats();
    }
    
    // Actualizar timeline
    if (typeof updateTimeline === 'function') {
        updateTimeline();
    }
    
};

// Global helper functions
window.getStatusText = function(status) {
    switch(status) {
        case 'pending': return 'Pendiente';
        case 'in_progress': return 'En Progreso';
        case 'completed': return 'Completado';
        case 'waiting': return 'En Espera';
        default: return 'Desconocido';
    }
};

window.getStatusClass = function(status) {
    switch(status) {
        case 'pending': return 'pending';
        case 'in_progress': return 'in_progress';
        case 'completed': return 'completed';
        case 'waiting': return 'waiting';
        default: return 'pending';
    }
};

window.getStatusBadgeText = function(status) {
    switch(status) {
        case 'pending': return 'Pendiente';
        case 'in_progress': return 'En Progreso';
        case 'completed': return 'Completado';
        case 'waiting': return 'En Espera';
        default: return 'Pendiente';
    }
};

window.getTramiteIcon = function(tipo) {
    // Convertir el tipo a minúsculas para hacer la comparación más flexible
    const tipoLower = tipo.toLowerCase();
    
    if (tipoLower.includes('marca') || tipoLower.includes('trademark')) {
        return 'fas fa-trademark';
    } else if (tipoLower.includes('renovación') || tipoLower.includes('renovacion') || tipoLower.includes('renovar')) {
        return 'fas fa-sync-alt';
    } else if (tipoLower.includes('búsqueda') || tipoLower.includes('busqueda') || tipoLower.includes('search')) {
        return 'fas fa-search';
    } else if (tipoLower.includes('constitución') || tipoLower.includes('constitucion') || tipoLower.includes('empresa') || tipoLower.includes('sas')) {
        return 'fas fa-building';
    } else if (tipoLower.includes('legal') || tipoLower.includes('asesoría') || tipoLower.includes('asesoria')) {
        return 'fas fa-gavel';
    } else {
        return 'fas fa-file-alt';
    }
};

// Global function to update dashboard stats
window.updateDashboardStats = function() {
    console.log('=== DEBUG: Updating Dashboard Stats ===');
    
    // Obtener trámites del usuario
    const userTramites = JSON.parse(localStorage.getItem('user_tramites') || '[]');
    
    // Calcular estadísticas
    const totalTramites = userTramites.length;
    const pendingTramites = userTramites.filter(t => t.status === 'pending').length;
    const completedTramites = userTramites.filter(t => t.status === 'completed').length;
    const inProgressTramites = userTramites.filter(t => t.status === 'in_progress').length;
    
    // Calcular total facturado
    const totalFacturado = userTramites.reduce((total, tramite) => {
        return total + (tramite.amount || 0);
    }, 0);
    
    console.log('📊 Dashboard stats calculated:', {
        totalTramites,
        pendingTramites,
        completedTramites,
        inProgressTramites,
        totalFacturado
    });
    
    // Actualizar estadísticas en el DOM
    const totalTramitesElement = document.querySelector('.stat-card:nth-child(1) .stat-content h3');
    const pendingElement = document.querySelector('.stat-card:nth-child(2) .stat-content h3');
    const completedElement = document.querySelector('.stat-card:nth-child(3) .stat-content h3');
    const facturadoElement = document.querySelector('.stat-card:nth-child(4) .stat-content h3');
    
    if (totalTramitesElement) totalTramitesElement.textContent = totalTramites;
    if (pendingElement) pendingElement.textContent = pendingTramites;
    if (completedElement) completedElement.textContent = completedTramites;
    if (facturadoElement) facturadoElement.textContent = `$${totalFacturado.toLocaleString('es-MX')}`;
    
    console.log('✅ Dashboard stats updated successfully');
};



// Global function to update timeline
window.updateTimeline = function() {
    console.log('=== DEBUG: Updating Timeline ===');
    
    const userTramites = JSON.parse(localStorage.getItem('user_tramites') || '[]');
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineFilter = document.querySelector('.timeline-filter select');
    
    if (!timelineContainer) {
        console.log('❌ Timeline container not found');
        return;
    }
    
    // Actualizar opciones del filtro
    if (timelineFilter) {
        timelineFilter.innerHTML = '<option value="">Selecciona un trámite</option>';
        userTramites.forEach(tramite => {
            const option = document.createElement('option');
            option.value = tramite.id;
            const tramiteType = window.mapServiceTypeToTramiteType ? 
                window.mapServiceTypeToTramiteType(tramite.tramiteType) : 
                tramite.tramiteType;
            const tramiteName = tramite.formData?.marca || tramite.formData?.empresa || tramite.formData?.companyName || 'N/A';
            option.textContent = `${tramiteType} - "${tramiteName}"`;
            timelineFilter.appendChild(option);
        });
    }
    
    // Mostrar mensaje inicial
    if (userTramites.length === 0) {
        timelineContainer.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-marker">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div class="timeline-content">
                    <h4>No hay trámites activos</h4>
                    <p>El timeline se mostrará cuando selecciones un trámite</p>
                    <span class="timeline-date">Sin actividad</span>
                </div>
            </div>
        `;
        return;
    }
    
    // Mostrar mensaje de selección
    timelineContainer.innerHTML = `
        <div class="timeline-item">
            <div class="timeline-marker">
                <i class="fas fa-hand-pointer"></i>
            </div>
            <div class="timeline-content">
                <h4>Selecciona un trámite</h4>
                <p>Usa el menú de la derecha para seleccionar el trámite del cual quieres ver el timeline</p>
                <span class="timeline-date">Esperando selección</span>
            </div>
        </div>
    `;
    
    // Agregar event listener al filtro
    if (timelineFilter) {
        timelineFilter.addEventListener('change', function() {
            const selectedTramiteId = this.value;
            if (selectedTramiteId) {
                window.showTramiteTimeline(selectedTramiteId);
            } else {
                // Mostrar mensaje de selección
                timelineContainer.innerHTML = `
                    <div class="timeline-item">
                        <div class="timeline-marker">
                            <i class="fas fa-hand-pointer"></i>
                        </div>
                        <div class="timeline-content">
                            <h4>Selecciona un trámite</h4>
                            <p>Usa el menú de la derecha para seleccionar el trámite del cual quieres ver el timeline</p>
                            <span class="timeline-date">Esperando selección</span>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    console.log('✅ Timeline filter updated successfully');
};

// Función para mostrar el timeline de un trámite específico
window.showTramiteTimeline = function(tramiteId) {
    console.log('=== DEBUG: Showing Timeline for Tramite ===', tramiteId);
    
    const userTramites = JSON.parse(localStorage.getItem('user_tramites') || '[]');
    const tramite = userTramites.find(t => t.id == tramiteId);
    const timelineContainer = document.querySelector('.timeline-container');
    
    if (!tramite) {
        console.log('❌ Tramite not found');
        return;
    }
    
    if (!timelineContainer) {
        console.log('❌ Timeline container not found');
        return;
    }
    
    const tramiteType = window.mapServiceTypeToTramiteType ? 
        window.mapServiceTypeToTramiteType(tramite.tramiteType) : 
        tramite.tramiteType;
    
    const tramiteName = tramite.formData?.marca || tramite.formData?.empresa || tramite.formData?.companyName || 'N/A';
    const status = tramite.status || 'pending';
    const progress = tramite.progress || 0;
    
    // Definir los pasos del timeline según el tipo de trámite
    let timelineSteps = [];
    
    if (tramite.tramiteType === 'registro-marca') {
        timelineSteps = [
            { step: 1, title: 'Solicitud Recibida', description: 'Formulario de registro completado y pago procesado', status: 'completed', date: tramite.createdAt },
            { step: 2, title: 'Revisión de Documentos', description: 'Validación de información y documentos proporcionados', status: progress >= 25 ? 'completed' : 'pending', date: null },
            { step: 3, title: 'Firma de Poder', description: 'Carta poder firmada por el cliente', status: tramite.poder?.firmado ? 'completed' : 'pending', date: tramite.poder?.fechaFirma },
            { step: 4, title: 'Presentación ante IMPI', description: 'Solicitud enviada al Instituto Mexicano de la Propiedad Industrial', status: progress >= 50 ? 'completed' : 'pending', date: null },
            { step: 5, title: 'Publicación en Gaceta', description: 'Marca publicada en la Gaceta del IMPI', status: progress >= 75 ? 'completed' : 'pending', date: null },
            { step: 6, title: 'Resolución Final', description: 'Certificado de registro otorgado', status: progress >= 100 ? 'completed' : 'pending', date: null }
        ];
    } else if (tramite.tramiteType === 'constitucion-empresa' || tramite.tramiteType === 'constitucion-sas') {
        timelineSteps = [
            { step: 1, title: 'Solicitud Recibida', description: 'Formulario de constitución completado y pago procesado', status: 'completed', date: tramite.createdAt },
            { step: 2, title: 'Revisión de Documentos', description: 'Validación de información y documentos proporcionados', status: progress >= 25 ? 'completed' : 'pending', date: null },
            { step: 3, title: 'Firma de Poder', description: 'Carta poder firmada por el cliente', status: tramite.poder?.firmado ? 'completed' : 'pending', date: tramite.poder?.fechaFirma },
            { step: 4, title: 'Elaboración de Escritura', description: 'Documentos legales preparados por el notario', status: progress >= 50 ? 'completed' : 'pending', date: null },
            { step: 5, title: 'Firma ante Notario', description: 'Constitución formalizada ante notario público', status: progress >= 75 ? 'completed' : 'pending', date: null },
            { step: 6, title: 'Registro en RPPC', description: 'Empresa registrada en el Registro Público', status: progress >= 100 ? 'completed' : 'pending', date: null }
        ];
    } else {
        // Timeline genérico para otros tipos de trámites
        timelineSteps = [
            { step: 1, title: 'Solicitud Recibida', description: 'Formulario completado y pago procesado', status: 'completed', date: tramite.createdAt },
            { step: 2, title: 'En Proceso', description: 'Tramite en proceso de gestión', status: progress > 0 ? 'completed' : 'pending', date: null },
            { step: 3, title: 'Completado', description: 'Tramite finalizado exitosamente', status: progress >= 100 ? 'completed' : 'pending', date: null }
        ];
    }
    
    // Generar HTML del timeline
    let timelineHTML = '';
    timelineSteps.forEach((step, index) => {
        const stepStatus = step.status;
        const stepClass = stepStatus === 'completed' ? 'success' : 'pending';
        const stepIcon = stepStatus === 'completed' ? 'fas fa-check-circle' : 'fas fa-clock';
        
        let stepDate = '';
        if (step.date) {
            const date = new Date(step.date);
            stepDate = date.toLocaleDateString('es-MX');
        }
        
        timelineHTML += `
            <div class="timeline-item ${stepStatus === 'completed' ? 'completed' : ''}" data-step="${step.step}">
                <div class="timeline-marker ${stepClass}">
                    <i class="${stepIcon}"></i>
                </div>
                <div class="timeline-content">
                    <h4>${step.title}</h4>
                    <p>${step.description}</p>
                    ${stepDate ? `<span class="timeline-date">${stepDate}</span>` : ''}
                </div>
            </div>
        `;
    });
    
    timelineContainer.innerHTML = timelineHTML;
    console.log('✅ Timeline for specific tramite updated successfully');
};

document.addEventListener('DOMContentLoaded', function() {
    // Mobile sidebar toggle
    window.toggleDashboardSidebar = function() {
        const sidebar = document.querySelector('.dashboard-sidebar');
        const hamburger = document.querySelector('.dashboard-hamburger');
        
        if (sidebar && hamburger) {
            sidebar.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Add overlay when sidebar is open
            if (sidebar.classList.contains('active')) {
                addSidebarOverlay();
            } else {
                removeSidebarOverlay();
            }
        }
    };
    
    function addSidebarOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'dashboard-sidebar-overlay';
        overlay.style.cssText = `
        position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        overlay.addEventListener('click', function() {
            toggleDashboardSidebar();
        });
        
        document.body.appendChild(overlay);
        
        // Animate overlay
    setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    }
    
    function removeSidebarOverlay() {
        const overlay = document.querySelector('.dashboard-sidebar-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
    setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }
    }
    
    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.dashboard-sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                toggleDashboardSidebar();
            }
        }
    });
    
    // Handle navigation items
    const navItems = document.querySelectorAll('.nav-item');
    console.log('Found navItems:', navItems.length);
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav item clicked:', this.getAttribute('data-section'));
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target section
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                navigateToSection(targetSection);
            }
        });
    });

    // Handle sidebar navigation links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    console.log('Found sidebarLinks:', sidebarLinks.length);
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sidebar link clicked:', this.getAttribute('data-section'));
            
            // Remove active class from all sidebar links
            sidebarLinks.forEach(sideLink => sideLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetSection = this.getAttribute('data-section');
            if (targetSection) {
                navigateToSection(targetSection);
            }
        });
    });

    // Initialize first section as active
    const firstSection = document.querySelector('.dashboard-section');
    if (firstSection) {
        firstSection.classList.add('active');
    }
    
    // Load tramites when dashboard loads
    console.log('🚀 Dashboard loaded, loading tramites...');
    if (typeof loadTramites === 'function') {
        loadTramites();
    } else {
        console.log('❌ loadTramites function not found');
    }
    
    // Handle admin mode toggle
    const adminToggle = document.querySelector('.admin-toggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', function() {
            document.body.classList.toggle('admin-mode');
        });
    }
    
    // Handle admin modals
    window.showAdminModal = function(modalType) {
        const modal = document.querySelector('.admin-modal');
    if (modal) {
        modal.classList.add('active');
            
            // Set modal content based on type
            const modalTitle = modal.querySelector('.admin-modal-header h3');
            if (modalTitle) {
                switch(modalType) {
                    case 'createTramite':
                        modalTitle.textContent = 'Crear Nuevo Trámite';
            break;
                    case 'generateInvoice':
                        modalTitle.textContent = 'Generar Factura';
            break;
                    case 'updateProgress':
                        modalTitle.textContent = 'Actualizar Progreso';
            break;
                    case 'uploadDocuments':
                        modalTitle.textContent = 'Subir Documentos';
            break;
                }
            }
        }
    };
    
    // Close admin modal
    const closeModalBtn = document.querySelector('.admin-modal-close');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            const modal = document.querySelector('.admin-modal');
    if (modal) {
        modal.classList.remove('active');
            }
        });
    }
    
    // Close modal on overlay click
    const modal = document.querySelector('.admin-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
    
    // Handle forms overview
    window.loadFormsOverview = function() {
        // Show formularios section
        navigateToSection('formularios');
    };

    // Functions to show specific sections within dashboard
    // window.showTramiteSection = function(tramiteType) {
    //     console.log('showTramiteSection called with:', tramiteType);
        
    //     // Hide all sections first
    //     const sections = document.querySelectorAll('.dashboard-section');
    //     sections.forEach(section => {
    //         section.classList.remove('active');
    //     });
        
    //     // Show tramites section
    //     const tramitesSection = document.getElementById('tramites');
    //     if (tramitesSection) {
    //         tramitesSection.classList.add('active');
    //         console.log('Tramites section activated');
    //     } else {
    //         console.error('Tramites section not found');
    //     }
        
    //     // Load specific tramite content
    //     loadTramites();
        
    //     // Update navigation
    //     const navItems = document.querySelectorAll('.nav-item');
    //     navItems.forEach(nav => nav.classList.remove('active'));
    //     const tramitesNav = document.querySelector('[data-section="tramites"]');
    //     if (tramitesNav) {
    //         tramitesNav.classList.add('active');
    //     }
        
    //     // Update sidebar navigation
    //     const sidebarLinks = document.querySelectorAll('.sidebar-link');
    //     sidebarLinks.forEach(link => link.classList.remove('active'));
    //     const tramitesSidebarLink = document.querySelector('.sidebar-link[data-section="tramites"]');
    //     if (tramitesSidebarLink) {
    //         tramitesSidebarLink.classList.add('active');
    //     }
        
    //     // Show specific tramite details if needed
    //     showTramiteDetails(tramiteType);
    // };

    // window.showContactSection = function() {
    //     console.log('showContactSection called');
    //     // Show conversaciones section
    //     navigateToSection('conversaciones');
    // };

    // Load user invoices - using demo data for now
    window.loadFacturas = function() {
        console.log('Loading user invoices (demo mode)...');
        
        // Always show demo data for now
        // TODO: Replace with real API call when backend is ready
        showDemoFacturas();
    };

    // Display invoices in the UI
    function displayFacturas(invoices) {
        const facturacionGrid = document.querySelector('.facturacion-grid');
        if (!facturacionGrid) return;

        if (!invoices || invoices.length === 0) {
            facturacionGrid.innerHTML = `
                <div class="factura-card">
                    <div class="factura-header">
                        <h4>No hay facturas</h4>
                        <span class="status-badge">Sin facturas</span>
                    </div>
                    <div class="factura-details">
                        <p><strong>Estado:</strong> Sin facturas pendientes</p>
                        <p><strong>Fecha:</strong> -</p>
                        <p><strong>Monto:</strong> $0.00 MXN</p>
                    </div>
                    <div class="factura-actions">
                        <button class="btn-secondary" disabled>Ver Factura</button>
                        <button class="btn-primary" disabled>Descargar PDF</button>
                    </div>
                </div>
            `;
            return;
        }

        // Clear existing content
        facturacionGrid.innerHTML = '';

        // Display each invoice
        invoices.forEach(invoice => {
            const facturaCard = createFacturaCard(invoice);
            facturacionGrid.appendChild(facturaCard);
        });
    }

    // Create individual invoice card
    function createFacturaCard(invoice) {
        const card = document.createElement('div');
        card.className = 'factura-card';
        
        const statusClass = getStatusClass(invoice.status);
        const statusText = getStatusText(invoice.status);
        
        card.innerHTML = `
            <div class="factura-header">
                <h4>Factura #${invoice.invoice_number || invoice.id}</h4>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="factura-details">
                <p><strong>Estado:</strong> ${statusText}</p>
                <p><strong>Fecha:</strong> ${formatDate(invoice.created_at)}</p>
                <p><strong>Vencimiento:</strong> ${formatDate(invoice.due_date)}</p>
                <p><strong>Monto:</strong> $${formatCurrency(invoice.amount)} MXN</p>
                ${invoice.description ? `<p><strong>Descripción:</strong> ${invoice.description}</p>` : ''}
            </div>
            <div class="factura-actions">
                <button class="btn-secondary" onclick="viewInvoice(${invoice.id})">
                    <i class="fas fa-eye"></i> Ver Factura
                </button>
                <button class="btn-primary" onclick="downloadInvoice(${invoice.id})">
                    <i class="fas fa-download"></i> Descargar PDF
                </button>
                ${invoice.status === 'pending' ? `
                    <button class="btn-success" onclick="payInvoice(${invoice.id})">
                        <i class="fas fa-credit-card"></i> Pagar
                    </button>
                ` : ''}
            </div>
        `;
        
        return card;
    }

    // Update financial summary
    function updateFacturacionSummary(summary) {
        const summaryCard = document.querySelector('.facturacion-summary .summary-card');
        if (!summaryCard) return;

        const totalFacturado = summaryCard.querySelector('.summary-item:nth-child(3) .amount');
        const totalPagado = summaryCard.querySelector('.summary-item:nth-child(4) .amount');
        const pendientePago = summaryCard.querySelector('.summary-item:nth-child(5) .amount');

        if (totalFacturado) totalFacturado.textContent = `$${formatCurrency(summary.total_billed || 0)} MXN`;
        if (totalPagado) totalPagado.textContent = `$${formatCurrency(summary.total_paid || 0)} MXN`;
        if (pendientePago) pendientePago.textContent = `$${formatCurrency(summary.total_pending || 0)} MXN`;
        
        // Add total invoices count if available
        if (summary.total_invoices) {
            const totalInvoicesElement = summaryCard.querySelector('.summary-item:nth-child(2) .amount');
            if (totalInvoicesElement) {
                totalInvoicesElement.textContent = `${summary.total_invoices} facturas`;
            }
        }
    }

    // Show demo data when API is not available
    function showDemoFacturas() {
        console.log('Showing demo invoices data');
        
        // Demo data - realistic invoices for Sinapsis Legal services
        const demoInvoices = [
            {
                id: 1,
                invoice_number: 'INV-2025-001',
                status: 'pending',
                created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                due_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
                amount: 2500.00,
                description: 'Registro de marca comercial - "TechCorp Solutions"',
                client_name: 'Juan Pérez',
                client_email: 'juan.perez@techcorp.com'
            },
            {
                id: 2,
                invoice_number: 'INV-2025-002',
                status: 'paid',
                created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                due_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                amount: 1800.00,
                description: 'Constitución de empresa - "Innovación Digital S.A. de C.V."',
                client_name: 'María González',
                client_email: 'maria.gonzalez@innovacion.com'
            },
            {
                id: 3,
                invoice_number: 'INV-2025-003',
                status: 'overdue',
                created_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
                due_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                amount: 3200.00,
                description: 'Búsqueda profunda de marcas - Análisis de 50 marcas',
                client_name: 'Carlos Rodríguez',
                client_email: 'carlos.rodriguez@empresa.com'
            },
            {
                id: 4,
                invoice_number: 'INV-2025-004',
                status: 'pending',
                created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                due_date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
                amount: 1500.00,
                description: 'Renovación de marca - "GlobalTech Industries"',
                client_name: 'Ana Martínez',
                client_email: 'ana.martinez@globaltech.com'
            }
        ];

        displayFacturas(demoInvoices);
        
        const demoSummary = {
            total_billed: 9000.00,
            total_paid: 1800.00,
            total_pending: 7200.00,
            total_invoices: 4
        };
        
        updateFacturacionSummary(demoSummary);
    }

    // Helper functions
    function getStatusClass(status) {
        switch(status) {
            case 'paid': return 'status-paid';
            case 'pending': return 'status-pending';
            case 'overdue': return 'status-overdue';
            default: return 'status-pending';
        }
    }

    function getStatusText(status) {
        switch(status) {
            case 'paid': return 'Pagada';
            case 'pending': return 'Pendiente';
            case 'overdue': return 'Vencida';
            default: return 'Pendiente';
        }
    }

    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX');
    }

    function formatCurrency(amount) {
        if (!amount) return '0.00';
        return parseFloat(amount).toFixed(2);
    }

    // Invoice action functions
    window.viewInvoice = function(invoiceId) {
        console.log('Viewing invoice:', invoiceId);
        // TODO: Implement invoice viewer modal
        alert(`Viendo factura #${invoiceId}`);
    };

    window.downloadInvoice = function(invoiceId) {
        console.log('Downloading invoice:', invoiceId);
        // TODO: Implement PDF download
        alert(`Descargando factura #${invoiceId}`);
    };

    window.payInvoice = function(invoiceId) {
        console.log('Paying invoice:', invoiceId);
        // TODO: Implement payment integration
        alert(`Procesando pago para factura #${invoiceId}`);
    };

    // window.showTramiteDetails = function(tramiteType) {
    //     // This function can be used to show specific tramite details
    //     console.log('Showing tramite details for:', tramiteType);
    //     // You can add specific logic here to show different content based on tramiteType
    // };

    // window.showConversaciones = function() {
    //     console.log('showConversaciones called');
    //     navigateToSection('conversaciones');
    // };
    
    console.log('🚀 Dashboard JavaScript loaded successfully');
    
    // Cargar trámites dinámicamente
    // loadTramites(); // This line is now handled by the new_code
    
    // Initialize first section as active if no section is active
    const activeSection = document.querySelector('.dashboard-section.active');
    if (!activeSection) {
        const firstSection = document.querySelector('.dashboard-section');
        if (firstSection) {
            firstSection.classList.add('active');
            console.log('First section activated:', firstSection.id);
        }
    }
});

// Funciones para el Modal de Carta Poder Simple
window.showPoderModal = function(tramiteId) {
    const modal = document.getElementById('poderModal');
    if (modal) {
        modal.classList.add('active');
        
        // Guardar el ID del trámite en el modal
        modal.setAttribute('data-tramite-id', tramiteId);
        
        // Establecer fecha actual
        const currentDate = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const dateElements = document.querySelectorAll('#currentDate, #currentDate2');
        dateElements.forEach(element => {
            element.textContent = currentDate;
        });
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
    }
};

window.closePoderModal = function() {
    const modal = document.getElementById('poderModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

window.redirectToDocuSign = function() {
    // URL de ejemplo de DocuSign (reemplazar con la URL real)
    const docuSignUrl = 'https://app.docusign.com/signing/ceremony/start';
    
    // Mostrar mensaje de confirmación
    if (confirm('¿Estás seguro de que quieres proceder a DocuSign para firmar el documento?')) {
        // Obtener el ID del trámite del modal
        const modal = document.getElementById('poderModal');
        const tramiteId = modal ? modal.getAttribute('data-tramite-id') : null;
        
        if (tramiteId) {
            // Actualizar el estado del trámite
            const tramites = JSON.parse(localStorage.getItem('user_tramites') || '[]');
            const tramiteIndex = tramites.findIndex(t => t.id === tramiteId);
            
            if (tramiteIndex !== -1) {
                tramites[tramiteIndex].poder.firmado = true;
                tramites[tramiteIndex].poder.fechaFirma = new Date().toLocaleDateString('es-MX');
                tramites[tramiteIndex].status = 'in_progress';
                tramites[tramiteIndex].progress = 25;
                
                localStorage.setItem('user_tramites', JSON.stringify(tramites));
                
                // Recargar los trámites en el dashboard
        loadTramites();
            }
        }
        
        // Redirigir a DocuSign
        window.open(docuSignUrl, '_blank');
        
        // Cerrar el modal
        closePoderModal();
        
        // Mostrar notificación de éxito
        showNotification('Redirigiendo a DocuSign para completar la firma digital...', 'success');
    }
};

window.showNotification = function(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 300px;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
};

// Función de prueba para crear un trámite de ejemplo ELIMINADA