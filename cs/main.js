        // Language data
        const translations = {
            cs: {
                'spagetak-logo': 'Spagetak.com',
                'nav-home': 'Domů',
                'nav-skills': 'Dovednosti',
                'nav-contact': 'Kontakt',
                'hero-learning': 'Učím se',
                'hero-description': 'Ahoj! Jsem Spagy a rád se učím programovat. Momentálně se zaměřuji hlavně na C#, Unity a Python, ale také mě fascinují weby. Rád experimentuji s novými věcmi a snažím se neustále zlepšovat.',
                'btn-skills': 'Moje dovednosti',
                'btn-contact': 'Kontakt',
                'skills-title': 'Moje dovednosti',
                'skill-unity-title': 'C# & Unity',
                'skill-unity-desc': 'Učím se módování a vývoj her v Unity. Baví mě objevovat herní mechaniky a experimentovat s 3D grafikou.',
                'skill-python-title': 'Python',
                'skill-python-desc': 'Také se učím Python, ale spíš proto, že ho máme ve škole. Upřímně ho moc nemusím, ale učím se aspoň základy.',
                'skill-web-title': 'Webové technologie',
                'skill-web-desc': 'Zajímám se o moderní web development - HTML, CSS, JavaScript a různé frameworky. Rád zkoumám nové věci.',
                'contact-title': 'Kontakt',
                'contact-description': 'Máte zájem o spolupráci nebo si chcete jen popovídat o programování? Neváhejte mě kontaktovat!',
                'typewriter': ['programovat v Pythonu.', 'programovat.', 'pracovat s weby.', 'pracovat s C#.', 'módování her v Unity.']
            },
            en: {
                'spagetak-logo': 'Spagetak.com',
                'nav-home': 'Home',
                'nav-skills': 'Skills',
                'nav-contact': 'Contact',
                'hero-learning': 'I\'m learning',
                'hero-description': 'Hi! I\'m Spagy and I love learning programming. Currently, I mainly focus on C#, Unity, and Python, but I\'m also fascinated by web development. I enjoy experimenting with new things and constantly improving myself.',
                'btn-skills': 'My Skills',
                'btn-contact': 'Contact',
                'skills-title': 'My Skills',
                'skill-unity-title': 'C# & Unity',
                'skill-unity-desc': 'I\'m learning modding and game development in Unity. I enjoy discovering game mechanics and experimenting with 3D graphics.',
                'skill-python-title': 'Python',
                'skill-python-desc': 'I\'m also learning Python, mainly because we have it at school. Honestly, I don\'t really like it that much, but I\'m learning at least the basics.',
                'skill-web-title': 'Web Technologies',
                'skill-web-desc': 'I\'m interested in modern web development - HTML, CSS, JavaScript and various frameworks. I like exploring new things.',
                'contact-title': 'Contact',
                'contact-description': 'Interested in collaboration or just want to chat about programming? Don\'t hesitate to contact me!',
                'typewriter': ['programming in Python.', 'programming.', 'working with websites.', 'working with C#.', 'game modding in Unity.']
            }
        };

        let currentLanguage = 'cs'; // Změň na 'en' pro anglickou verzi

        // Initialize language on page load
        function initializeLanguage() {
            // Automaticky aplikuj jazyk při načtení stránky
            switchLanguage(currentLanguage);
        }

        // Language switching functionality
        function switchLanguage(lang) {
            currentLanguage = lang;
            document.documentElement.lang = lang;
            
            // Update active language button
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
            
            // Update all text elements
            document.querySelectorAll('[data-text]').forEach(element => {
                const key = element.getAttribute('data-text');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });

            // Update typewriter text array
            typewriterText = translations[lang]['typewriter'];
            
            if (typewriterRunning) {
                clearTimeout(typeTimeoutId); // Stop the old loop

                // Set new initial state
                currentIndex = 0;
                const firstText = typewriterText[currentIndex];
                document.getElementById('typewriter').textContent = firstText;
                charIndex = firstText.length;
                isDeleting = true;
                
                // Start the new loop after a pause (matching your 'finished typing' speed)
                typeTimeoutId = setTimeout(typeWriter, 2000);
            }
        }

        // Language button event listeners
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                switchLanguage(lang);
            });
        });

        // Initialize everything when page loads
        window.addEventListener('load', () => {
            // Initialize language first
            initializeLanguage();
            
            // --- NEW TYPEWRITER START LOGIC ---
            // 1. Manually set the initial text
            const firstText = typewriterText[currentIndex];
            document.getElementById('typewriter').textContent = firstText;
            
            // 2. Set the state to "finished typing" (ready to delete)
            charIndex = firstText.length;
            isDeleting = true;
            
            // 3. Start the typeWriter loop *after* the initial pause
            typeTimeoutId = setTimeout(typeWriter, 2500); // This 2000 matches your 'finished' speed
            // --- END NEW LOGIC ---

            // Then hide loading screen
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 1000);
        });

        // Section navigation with animations
        function showSection(sectionName) {
            const sections = document.querySelectorAll('.section');
            
            // Remove active class from all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Add a small delay for smooth transition
            setTimeout(() => {
                // Hide all sections
                sections.forEach(section => {
                    if (section.id === 'home') {
                        section.style.display = section.id === sectionName ? 'flex' : 'none';
                    } else {
                        section.style.display = section.id === sectionName ? 'block' : 'none';
                    }
                });
                
                // Show target section with animation
                const targetSection = document.getElementById(sectionName);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.classList.add('active');
                        
                        // Animate cards when showing skills or contact section
                        if (sectionName === 'skills') {
                            setTimeout(() => {
                                const skillCards = document.querySelectorAll('.skill-card');
                                skillCards.forEach(card => {
                                    card.classList.add('animate');
                                });
                            }, 200);
                        } else if (sectionName === 'contact') {
                            setTimeout(() => {
                                const contactCards = document.querySelectorAll('.contact-card');
                                contactCards.forEach(card => {
                                    card.classList.add('animate');
                                });
                            }, 200);
                        }
                    }, 50);
                }
            }, 150);

            // Close mobile menu
            document.getElementById('mobileMenuBtn').classList.remove('active');
            document.getElementById('navContent').classList.remove('active');
        }

        // Copy to clipboard function
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback - you can add more sophisticated feedback here
                const event = new Event('copied');
                document.dispatchEvent(event);
            });
        }

        // Three.js Background
        let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;

        function initThreeJS() {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);
            document.getElementById('threejs-background').appendChild(renderer.domElement);

            // Create particles
            const geometry = new THREE.BufferGeometry();
            const particleCount = 1500;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);

            for (let i = 0; i < particleCount * 3; i += 3) {
                positions[i] = (Math.random() - 0.5) * 2000;
                positions[i + 1] = (Math.random() - 0.5) * 2000;
                positions[i + 2] = (Math.random() - 0.5) * 2000;

                const intensity = Math.random();
                colors[i] = 0.8 + intensity * 0.2;     // Red
                colors[i + 1] = 0.1 + intensity * 0.1; // Green
                colors[i + 2] = 0.1 + intensity * 0.1; // Blue
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 2,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);

            camera.position.z = 1000;
        }

        function animateThreeJS() {
            requestAnimationFrame(animateThreeJS);

            const time = Date.now() * 0.00005;
            
            if (particles) {
                particles.rotation.x = time * 0.5;
                particles.rotation.y = time * 0.75;
                
                // Mouse interaction
                particles.rotation.x += mouseY * 0.00001;
                particles.rotation.y += mouseX * 0.00001;
            }

            renderer.render(scene, camera);
        }

        // Mouse movement tracking
        document.addEventListener('mousemove', (event) => {
            mouseX = event.clientX - window.innerWidth / 2;
            mouseY = event.clientY - window.innerHeight / 2;
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Initialize Three.js
        initThreeJS();
        animateThreeJS();

        // Typewriter effect
        let typewriterText = translations[currentLanguage]['typewriter'];
        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typewriterRunning = false;
        let typeTimeoutId;

        function typeWriter() {
            typewriterRunning = true;
            const current = typewriterText[currentIndex];
            const typewriterElement = document.getElementById('typewriter');

            if (isDeleting) {
                typewriterElement.textContent = current.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = current.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === current.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % typewriterText.length;
                typeSpeed = 500;
            }

            typeTimeoutId = setTimeout(typeWriter, typeSpeed);
        }


        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navContent = document.getElementById('navContent');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navContent.classList.toggle('active');
        });

        // Add parallax effect to floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            document.querySelectorAll('.floating-element').forEach((element, index) => {
                const speed = (index + 1) * 0.5;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });