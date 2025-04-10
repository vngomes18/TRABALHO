// Inicialização do AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 100,
            once: true
        });
    }

    // Header Scroll Effect
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
            // Scroll Down
            header.classList.add('scrolled');
        } else if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
            // Scroll Up
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Navigation
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.primary-navigation');
    
    if (navToggle && primaryNav) {
        // Função para fechar o menu
        const closeMenu = () => {
            primaryNav.setAttribute('data-visible', 'false');
            navToggle.setAttribute('aria-expanded', 'false');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        };

        // Toggle menu ao clicar no botão
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isVisible = primaryNav.getAttribute('data-visible') === 'true';
            primaryNav.setAttribute('data-visible', !isVisible);
            navToggle.setAttribute('aria-expanded', !isVisible);
            
            const icon = this.querySelector('i');
            if (isVisible) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!primaryNav.contains(e.target) && !navToggle.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = primaryNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Fechar menu ao redimensionar a janela
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    if (testimonialSlider && testimonials.length > 0) {
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'none';
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            testimonials[index].style.display = 'block';
            dots[index].classList.add('active');
        }

        // Adicionar eventos aos dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });

        // Auto-play do slider
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        // Inicializar o primeiro testimonial
        showTestimonial(0);
    }

    // Adicionar classe active ao link da navegação atual
    const currentLocation = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Animação de fade-in para elementos quando aparecem na tela
    const fadeElements = document.querySelectorAll('.fade-in');

    const fadeInOnScroll = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll(); // Chamar uma vez para verificar elementos visíveis inicialmente

    // Adicionar efeito hover nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Login Page Functionality
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Form validation
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const remember = document.querySelector('input[name="remember"]').checked;
            
            // Basic validation
            if (!email || !password) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um endereço de email válido.');
                return;
            }
            
            // Here you would typically make an API call to your backend
            // For now, we'll just simulate a successful login
            console.log('Login attempt:', { email, password, remember });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Entrando...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Redirect to dashboard (replace with your actual dashboard URL)
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`${provider} login clicked`);
            // Implement social login logic here
        });
    });

    // Controle dos formulários de login
    const roleBtns = document.querySelectorAll('.role-btn');
    const loginForms = document.querySelectorAll('.login-form');
    const registerLinks = document.querySelector('.register-links');

    // Função para mostrar/esconder formulários
    function toggleForms(role) {
        loginForms.forEach(form => {
            form.classList.remove('active');
        });

        const formId = `login-${role}`;
        document.getElementById(formId).classList.add('active');
        registerLinks.style.display = 'block';
    }

    // Event listeners para os botões de papel (cliente/profissional)
    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const role = btn.dataset.role;
            toggleForms(role);
        });
    });

    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    });

    // Função para filtrar especialidades
    function setupEspecialidadesFilter() {
        const searchInput = document.getElementById('searchEspecialidade');
        const especialidadesContainer = document.querySelector('.especialidades-grid');
        
        if (searchInput && especialidadesContainer) {
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const especialidades = especialidadesContainer.querySelectorAll('.especialidade-item');
                
                especialidades.forEach(especialidade => {
                    const text = especialidade.querySelector('span').textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        especialidade.classList.remove('hidden');
                    } else {
                        especialidade.classList.add('hidden');
                    }
                });
            });
        }
    }

    // Inicializar o filtro de especialidades quando o DOM estiver carregado
    setupEspecialidadesFilter();

    // Função para filtrar objetivos e preferências
    function setupCadastroClienteFilters() {
        // Filtro de Objetivos
        const searchObjetivo = document.getElementById('searchObjetivo');
        const objetivosContainer = document.querySelector('#objetivos + .especialidades-container .especialidades-grid');
        
        if (searchObjetivo && objetivosContainer) {
            searchObjetivo.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const objetivos = objetivosContainer.querySelectorAll('.especialidade-item');
                
                objetivos.forEach(objetivo => {
                    const text = objetivo.querySelector('span').textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        objetivo.classList.remove('hidden');
                    } else {
                        objetivo.classList.add('hidden');
                    }
                });
            });
        }

        // Filtro de Preferências
        const searchPreferencia = document.getElementById('searchPreferencia');
        const preferenciasContainer = document.querySelector('#preferencias + .especialidades-container .especialidades-grid');
        
        if (searchPreferencia && preferenciasContainer) {
            searchPreferencia.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const preferencias = preferenciasContainer.querySelectorAll('.especialidade-item');
                
                preferencias.forEach(preferencia => {
                    const text = preferencia.querySelector('span').textContent.toLowerCase();
                    if (text.includes(searchTerm)) {
                        preferencia.classList.remove('hidden');
                    } else {
                        preferencia.classList.add('hidden');
                    }
                });
            });
        }
    }

    // Inicializar os filtros quando o DOM estiver carregado
    setupCadastroClienteFilters();

    // Controle das abas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    console.log('Número de botões de aba encontrados:', tabButtons.length);
    console.log('Número de painéis de aba encontrados:', tabPanes.length);

    function showTab(tabId) {
        console.log('Mostrando aba:', tabId);
        
        // Esconder todos os painéis
        tabPanes.forEach(pane => {
            console.log('Escondendo painel:', pane.id);
            pane.classList.remove('active');
        });
        
        // Mostrar o painel selecionado
        const selectedPane = document.getElementById(tabId);
        if (selectedPane) {
            console.log('Mostrando painel selecionado:', tabId);
            selectedPane.classList.add('active');
        } else {
            console.error('Painel não encontrado:', tabId);
        }
        
        // Atualizar botões ativos
        tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                console.log('Ativando botão:', tabId);
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Adicionar eventos aos botões
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            console.log('Botão clicado:', tabId);
            showTab(tabId);
        });
    });

    // Mostrar a primeira aba por padrão
    if (tabButtons.length > 0) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        console.log('Mostrando primeira aba por padrão:', firstTabId);
        showTab(firstTabId);
    }

    // Controle do Chat
    const chatModal = document.getElementById('chatModal');
    const openChatBtn = document.getElementById('openChat');
    const closeChatBtn = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendMessageBtn = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');

    // Abrir chat
    openChatBtn.addEventListener('click', function() {
        chatModal.classList.add('active');
    });

    // Fechar chat
    closeChatBtn.addEventListener('click', function() {
        chatModal.classList.remove('active');
    });

    // Enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Adicionar mensagem do usuário
            const userMessage = document.createElement('div');
            userMessage.className = 'message user';
            userMessage.innerHTML = `<p>${message}</p>`;
            chatMessages.appendChild(userMessage);

            // Limpar input
            chatInput.value = '';

            // Simular resposta do suporte
            setTimeout(() => {
                const supportMessage = document.createElement('div');
                supportMessage.className = 'message support';
                supportMessage.innerHTML = '<p>Obrigado por sua mensagem! Nossa equipe entrará em contato em breve.</p>';
                chatMessages.appendChild(supportMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    }

    // Enviar mensagem ao clicar no botão
    sendMessageBtn.addEventListener('click', sendMessage);

    // Enviar mensagem ao pressionar Enter
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Rolagem suave para a seção de suporte
    document.querySelector('.support-float-button').addEventListener('click', function(e) {
        e.preventDefault();
        const supportSection = document.getElementById('support-section');
        supportSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Função para carregar os dados do profissional
function loadProfessionalData() {
    const urlParams = new URLSearchParams(window.location.search);
    const professionalId = urlParams.get('id');
    
    if (!professionalId) return;
    
    // Aqui você pode fazer uma requisição para a API para buscar os dados do profissional
    // Por enquanto, vamos usar dados estáticos como exemplo
    const professionals = {
        'guilherme-maxwell': {
            name: 'Guilherme Maxwell',
            title: 'Especialista em Treinamento Funcional',
            rating: 4.9,
            reviews: 128,
            location: 'Rio de Janeiro, RJ',
            about: 'Personal Trainer certificado com mais de 10 anos de experiência. Especializado em treinamento funcional e preparação física para atletas. Meu objetivo é ajudar meus clientes a alcançarem seus objetivos de forma segura e eficiente.',
            qualifications: [
                'Bacharel em Educação Física - UFRJ',
                'Certificação Internacional em Treinamento Funcional',
                'Especialização em Reabilitação Física'
            ],
            specialties: [
                'Treinamento Funcional',
                'Musculação',
                'Reabilitação',
                'Preparação Física'
            ],
            services: [
                {
                    name: 'Personal Training',
                    description: 'Treinamento personalizado de acordo com seus objetivos e necessidades.',
                    price: 120,
                    period: 'hora'
                },
                {
                    name: 'Treino em Grupo',
                    description: 'Treinamento em grupo com foco em resultados coletivos.',
                    price: 80,
                    period: 'pessoa'
                },
                {
                    name: 'Consultoria Online',
                    description: 'Planejamento de treinos e acompanhamento remoto.',
                    price: 200,
                    period: 'mês'
                }
            ],
            reviews: [
                {
                    name: 'Maria Oliveira',
                    rating: 5,
                    date: '2 semanas atrás',
                    text: 'Excelente profissional! Me ajudou a alcançar meus objetivos de forma segura e eficiente. Super recomendo!'
                },
                {
                    name: 'Carlos Santos',
                    rating: 4,
                    date: '1 mês atrás',
                    text: 'Ótimo treinador, muito atencioso e profissional. Os resultados apareceram rapidamente!'
                }
            ]
        },
        // Adicione os dados dos outros profissionais aqui
    };
    
    const professional = professionals[professionalId];
    if (!professional) return;
    
    // Atualizar os dados na página
    document.querySelector('.profile-info h1').textContent = professional.name;
    document.querySelector('.profile-title').textContent = professional.title;
    document.querySelector('.rating-value').textContent = professional.rating;
    document.querySelector('.reviews-count').textContent = `(${professional.reviews} avaliações)`;
    document.querySelector('.profile-location span').textContent = professional.location;
    document.querySelector('.about-section p').textContent = professional.about;
    
    // Atualizar qualificações
    const qualificationsList = document.querySelector('.qualifications ul');
    qualificationsList.innerHTML = professional.qualifications.map(q => 
        `<li><i class="fas fa-graduation-cap"></i> ${q}</li>`
    ).join('');
    
    // Atualizar especialidades
    const specialtiesGrid = document.querySelector('.specialties-grid');
    specialtiesGrid.innerHTML = professional.specialties.map(s => 
        `<span class="specialty-tag">${s}</span>`
    ).join('');
    
    // Atualizar serviços
    const servicesGrid = document.querySelector('.services-grid');
    servicesGrid.innerHTML = professional.services.map(s => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas fa-dumbbell"></i>
            </div>
            <h3>${s.name}</h3>
            <p>${s.description}</p>
            <div class="service-price">
                <span>R$ ${s.price},00</span>
                <span>/${s.period}</span>
            </div>
            <button class="btn btn-primary">Agendar</button>
        </div>
    `).join('');
    
    // Atualizar avaliações
    const reviewsList = document.querySelector('.reviews-list');
    reviewsList.innerHTML = professional.reviews.map(r => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <img src="https://via.placeholder.com/50" alt="${r.name}">
                    <div>
                        <h4>${r.name}</h4>
                        <div class="stars">
                            ${Array(r.rating).fill('<i class="fas fa-star"></i>').join('')}
                            ${Array(5 - r.rating).fill('<i class="far fa-star"></i>').join('')}
                        </div>
                    </div>
                </div>
                <span class="review-date">${r.date}</span>
            </div>
            <p class="review-text">${r.text}</p>
        </div>
    `).join('');
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    loadProfessionalData();
    
    // ... existing code ...
});

