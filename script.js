document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    // Esconder loader após 1.5 segundos
    setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        // Remover completamente após a transição
        loader.addEventListener('transitionend', () => {
            if (loader.classList.contains('loader-hidden')) {
                document.body.removeChild(loader);
            }
        });
    }, 1500);
    
    // Cursor personalizado
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Atraso para o cursor follower
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Efeito hover no cursor
    const hoverElements = document.querySelectorAll('a, button, .area-card, .carousel-prev, .carousel-next, input, textarea, select');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-follower-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-follower-hover');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Scroll suave para links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // Ativar link ativo na navegação
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
// Animação de contagem dos números - Versão melhorada
const statNumbers = document.querySelectorAll('.stat-number');

function animateNumbers() {
    statNumbers.forEach(number => {
        const target = +number.getAttribute('data-count');
        const duration = 3000; // 2 segundos para completar a animação
        const startTime = performance.now();
        const startValue = 0;
        const easeOutQuad = t => t * (2 - t); // Função de easing para suavizar

        function updateCount(currentTime) {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeOutQuad(progress);
            const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
            
            // Formatação com separadores de milhar (opcional)
            number.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                number.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCount);
    });
}

// Observador de interseção para disparar a animação quando o elemento estiver visível
const statsSection = document.querySelector('.stats-section');
const observerOptions = {
    threshold: 0.5 // Dispara quando 50% do elemento estiver visível
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target); // Para a observação após disparar
        }
    });
}, observerOptions);

if (statsSection) {
    observer.observe(statsSection);
}
    
    // Ativar animação quando a seção estiver visível
    function checkStatsVisibility() {
        const statsSection = document.querySelector('.stats-section');
        const statsPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (statsPosition < screenPosition) {
            animateNumbers();
            window.removeEventListener('scroll', checkStatsVisibility);
        }
    }
    
    window.addEventListener('scroll', checkStatsVisibility);
    
    
    
    // Animação de revelação ao scroll
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    function checkFadeElements() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('fade-in-up');
            }
        });
    }
    
    // Verificar elementos na carga inicial
    checkFadeElements();
    
    // Verificar elementos durante o scroll
    window.addEventListener('scroll', checkFadeElements);
    
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    
    // Efeito de digitação no título do hero
    const heroTitleLines = document.querySelectorAll('.title-line');
    
    heroTitleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < text.length) {
                    line.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 100);
        }, index * 1000);
    });
});