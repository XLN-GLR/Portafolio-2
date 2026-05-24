/* ==========================================================================
   COMPORTAMIENTO DEL PORTAFOLIO - LOGICA Y ANIMACIONES INTERACTIVAS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. CONTROL DE LA ANIMACIÓN DE ENTRADA (SPLASH SCREEN / LOADER VERDE)
    const loaderOverlay = document.getElementById('loader-overlay');
    const mainContent = document.getElementById('main-content');
    
    // Retardo para que la animación de carga se visualice completamente
    const loaderDisplayTime = 2000; // 2 segundos

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loaderOverlay) {
                loaderOverlay.classList.add('fade-out');
                
                if (mainContent) {
                    mainContent.classList.add('reveal-content');
                }
                
                loaderOverlay.addEventListener('transitionend', (e) => {
                    if (e.propertyName === 'opacity') {
                        loaderOverlay.remove();
                    }
                });
            }
            
            // Iniciar animaciones de scroll al completarse el loader
            triggerScrollReveal();
        }, loaderDisplayTime);
    });

    // 2. EFECTO NAV SCROLL (ENCARJAR NAVBAR AL HACER SCROLL)
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. MENÚ DE NAVEGACIÓN MÓVIL (TOGGLE)
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 4. ANIMACIÓN AL HACER SCROLL (REVEAL ON SCROLL)
    const revealElements = document.querySelectorAll('.reveal');
    
    function triggerScrollReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', triggerScrollReveal);

    // 5. SEGUIMIENTO DE SECCIONES ACTIVAS (TRACK ACTIVE NAV LINKS)
    const sections = document.querySelectorAll('section');
    
    function updateActiveNavLink() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // Compensación de altura del Header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // 6. ENVIAR FORMULARIO CON ESTILO TERMINAL SCRIPT
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            
            submitBtn.style.pointerEvents = 'none';
            submitBtn.querySelector('.btn-text').textContent = 'TRANSMITIENDO PAYLOAD...';
            submitBtn.querySelector('.btn-icon i').className = 'fa-solid fa-circle-notch fa-spin';
            
            setTimeout(() => {
                alert('¡Carga útil transmitida con éxito! Maximiliano Giler responderá en tu nodo lo antes posible.');
                contactForm.reset();
                submitBtn.style.pointerEvents = '';
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.querySelector('.btn-icon i').className = 'fa-solid fa-paper-plane';
            }, 1800);
        });
    }

    // Actualizar año dinámico del footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 7. TERMINAL DE COMANDOS HACKER INTERACTIVA (BASH ENGINE EN EL HERO)
    // ==========================================================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalOutput) {
        // Enfoque automático al hacer clic en cualquier parte de la ventana de la terminal
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                
                // Eco del comando ejecutado en la terminal (usando nodo_hacker)
                const inputLine = document.createElement('div');
                inputLine.className = 'terminal-line';
                inputLine.innerHTML = `<span class="terminal-prompt">max_giler@nodo_hacker:~$</span> ${terminalInput.value}`;
                terminalOutput.appendChild(inputLine);
                
                // Procesamiento y salida del comando
                const outputLine = document.createElement('div');
                outputLine.className = 'terminal-line text-muted';
                
                switch(command) {
                    case 'help':
                    case 'ayuda':
                        outputLine.innerHTML = `Comandos disponibles en el sistema:
  <span class="term-accent">ayuda</span>       - Mostrar esta lista de comandos.
  <span class="term-accent">sobremi</span>     - Información del perfil de Maximiliano Giler.
  <span class="term-accent">habilidades</span> - Inspeccionar arsenal técnico y certificaciones.
  <span class="term-accent">proyectos</span>   - Listar repositorios y desarrollos destacados.
  <span class="term-accent">limpiar</span>     - Limpiar la pantalla de la terminal.`;
                        break;
                    case 'about':
                    case 'sobremi':
                        outputLine.innerHTML = `<span class="code-keyword">Usuario:</span> Maximiliano Giler
<span class="code-keyword">Rol:</span> Desarrollador Backend & Especialista en Infraestructura Tecnológica.
Estudiante de Informática en Montepiedra. Mi enfoque es "Tecnología con estrategia: soluciones que generan valor". Optimizo plataformas de bases de datos y nubes para que sean altamente escalables, resilientes y eficientes.`;
                        break;
                    case 'skills':
                    case 'habilidades':
                        outputLine.innerHTML = `Cargando arsenal_tecnico.yaml...
  <span class="code-class">[Automatización]</span> Cursor, Antigravity AI, Agentes de Ventas.
  <span class="code-class">[Desarrollo]</span> Python, Java, PHP, HTML5, CSS3, JS, React (Android APK).
  <span class="code-class">[Infraestructura]</span> Cisco Packet Tracer, Redes IP, CCTV, Cloud AWS.
  <span class="code-class">[Ingeniería]</span> Mantenimiento de Hardware, SQL (MySQL/PostgreSQL), Figma.
  <span class="code-class">[Educación]</span> Bachiller Técnico Informático (MTP), Redes IP Cert.`;
                        break;
                    case 'projects':
                    case 'proyectos':
                        outputLine.innerHTML = `Consultando base_proyectos.json...
  1. <span class="term-accent">Organizador Gamificado</span> (Habit Tracker Web App - React)
  2. <span class="term-accent">App Learning English</span> (Didáctica infantil - React Native)
  3. <span class="term-accent">Gestión de Riesgos MTP</span> (Mitigación estructural de desastres - Python/MySQL)`;
                        break;
                    case 'clear':
                    case 'limpiar':
                        terminalOutput.innerHTML = '';
                        terminalInput.value = '';
                        return;
                    case '':
                        // Comando vacío
                        terminalInput.value = '';
                        return;
                    default:
                        outputLine.innerHTML = `bash: comando no encontrado: <span class="text-danger" style="color: #ef4444;">${command}</span>. Escribe <span class="term-accent">ayuda</span> para ver los comandos válidos.`;
                }

                terminalOutput.appendChild(outputLine);
                terminalInput.value = '';
                
                // Desplazamiento automático hacia la parte inferior de la terminal
                setTimeout(() => {
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }, 30);
            }
        });
    }

    // ==========================================================================
    // 8. ESFERA 3D INTERACTIVA DE TECNOLOGÍAS (HTML + CSS + JS 3D ENGINE)
    // ==========================================================================
    function initTechSphere() {
        const sphereContainer = document.getElementById('tech-sphere-container');
        const sphere = document.getElementById('tech-sphere');
        
        if (!sphereContainer || !sphere) return;

        // Listado de tecnologías mapeadas a iconos de Devicon (CDN) en tonalidades verdes
        const technologies = [
            { name: 'Python', icon: 'devicon-python-plain' },
            { name: 'HTML5', icon: 'devicon-html5-plain' },
            { name: 'CSS3', icon: 'devicon-css3-plain' },
            { name: 'JavaScript', icon: 'devicon-javascript-plain' },
            { name: 'React', icon: 'devicon-react-original' },
            { name: 'Node.js', icon: 'devicon-nodejs-plain' },
            { name: 'TypeScript', icon: 'devicon-typescript-plain' },
            { name: 'Next.js', icon: 'devicon-nextjs-plain' },
            { name: 'Figma', icon: 'devicon-figma-plain' },
            { name: 'Git', icon: 'devicon-git-plain' },
            { name: 'SQL', icon: 'devicon-mysql-plain' },
            { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
            { name: 'TailwindCSS', icon: 'devicon-tailwindcss-original' },
            { name: 'C++', icon: 'devicon-cplusplus-plain' },
            { name: 'Java', icon: 'devicon-java-plain' },
            { name: 'Docker', icon: 'devicon-docker-plain' },
            { name: 'GraphQL', icon: 'devicon-graphql-plain' },
            { name: 'Django', icon: 'devicon-django-plain' },
            { name: 'Sass', icon: 'devicon-sass-original' },
            { name: 'C#', icon: 'devicon-csharp-plain' }
        ];

        const tagObjects = [];
        const numTags = technologies.length;
        
        // Radio físico de la esfera en píxeles
        const radius = 145; 
        
        // Ángulo de distribución áureo
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        // 1. GENERAR Y DISTRIBUIR LAS ETIQUETAS DE FORMA HOMOGÉNEA
        for (let i = 0; i < numTags; i++) {
            const y = 1 - (i / (numTags - 1)) * 2; // Eje vertical
            const r = Math.sqrt(1 - y * y); // Radio horizontal
            
            const theta = i * goldenAngle; // Rotación espiral
            
            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            const posX = x * radius;
            const posY = y * radius;
            const posZ = z * radius;

            const tagEl = document.createElement('span');
            tagEl.className = 'tech-tag';
            
            tagEl.innerHTML = `<i class="${technologies[i].icon}"></i>`;
            tagEl.setAttribute('title', technologies[i].name);
            tagEl.setAttribute('aria-label', technologies[i].name);
            
            // Alternar colores neón cromáticos verdes y blancos hacker
            if (i % 3 === 0) {
                tagEl.style.color = 'var(--neon-green-light)';
            } else if (i % 3 === 1) {
                tagEl.style.color = 'var(--neon-green)';
            } else {
                tagEl.style.color = '#ffffff';
            }

            sphere.appendChild(tagEl);

            // Almacenar el objeto
            tagObjects.push({
                element: tagEl,
                x: posX,
                y: posY,
                z: posZ
            });
        }

        // 2. PARÁMETROS DE ROTACIÓN Y DETENCIÓN DINÁMICA
        let speedX = 0.001; 
        let speedY = 0.002;
        
        let targetSpeedX = 0.001; 
        let targetSpeedY = 0.002;

        let isHovering = false; 

        // Controlar velocidades basadas en el cursor
        sphereContainer.addEventListener('mousemove', (event) => {
            const rect = sphereContainer.getBoundingClientRect();
            const mouseX = event.clientX - rect.left - (rect.width / 2);
            const mouseY = event.clientY - rect.top - (rect.height / 2);

            targetSpeedY = mouseX * 0.00008; 
            targetSpeedX = -mouseY * 0.00008;
        });

        sphereContainer.addEventListener('mouseleave', () => {
            targetSpeedX = 0.001;
            targetSpeedY = 0.002;
        });

        tagObjects.forEach(tagObj => {
            tagObj.element.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            tagObj.element.addEventListener('mouseleave', () => {
                isHovering = false;
            });
        });

        // 3. BUCLE DEL MOTOR 3D EN TIEMPO REAL (60FPS)
        function renderLoop() {
            speedX += (targetSpeedX - speedX) * 0.08;
            speedY += (targetSpeedY - speedY) * 0.08;

            // Queda estático por completo en hover
            const currentSpeedX = isHovering ? 0 : speedX;
            const currentSpeedY = isHovering ? 0 : speedY;

            const cosX = Math.cos(currentSpeedX);
            const sinX = Math.sin(currentSpeedX);
            const cosY = Math.cos(currentSpeedY);
            const sinY = Math.sin(currentSpeedY);

            tagObjects.forEach(tagObj => {
                // A. Rotar sobre eje Y
                const x1 = tagObj.x * cosY - tagObj.z * sinY;
                const z1 = tagObj.x * sinY + tagObj.z * cosY;

                // B. Rotar sobre eje X
                const y2 = tagObj.y * cosX + z1 * sinX;
                const z2 = -tagObj.y * sinX + z1 * cosX;

                tagObj.x = x1;
                tagObj.y = y2;
                tagObj.z = z2;

                // C. Proyección de Profundidad 3D
                const depthScale = (z2 + radius) / (radius * 2);
                
                const scale = 0.82 + depthScale * 0.43; 
                const opacity = 0.25 + depthScale * 0.75; 

                // EVITAR COLISIONES TRASERAS
                tagObj.element.style.pointerEvents = z2 < 0 ? 'none' : 'auto';

                // Variables CSS de transform
                tagObj.element.style.setProperty('--tx', `${x1}px`);
                tagObj.element.style.setProperty('--ty', `${y2}px`);
                tagObj.element.style.setProperty('--depth-scale', scale);
                
                tagObj.element.style.opacity = opacity;
                tagObj.element.style.zIndex = Math.round(z2 + radius);
            });

            requestAnimationFrame(renderLoop);
        }

        requestAnimationFrame(renderLoop);
    }

    initTechSphere();
});
