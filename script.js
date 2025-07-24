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

    // Carregar avaliações do Google (Opção 2)
document.addEventListener('DOMContentLoaded', function() {
    // Substitua pelo seu Place ID do Google Meu Negócio
    const placeId = 'ChIJV0k2YcdCzpQRBw8_cMEDbK8';
    const apiKey = 'SUA_API_KEY_AQUI'; // Necessário criar no Google Cloud Console
    
    if (placeId && apiKey) {
        loadGoogleReviews(placeId, apiKey);
    } else {
        console.warn('Place ID ou API Key não configurados');
        document.getElementById('google-reviews').innerHTML = 
            '<p class="text-center">As avaliações não puderam ser carregadas no momento.</p>';
    }
    
    // Controles do carrossel
    const prevBtn = document.querySelector('.reviews-prev');
    const nextBtn = document.querySelector('.reviews-next');
    const reviewsContainer = document.querySelector('.reviews-container');
    let currentReview = 0;
    
    nextBtn.addEventListener('click', () => {
        currentReview = (currentReview + 1) % document.querySelectorAll('.review-item').length;
        scrollToReview(currentReview);
    });
    
    prevBtn.addEventListener('click', () => {
        currentReview = (currentReview - 1 + document.querySelectorAll('.review-item').length) % 
                        document.querySelectorAll('.review-item').length;
        scrollToReview(currentReview);
    });
    
    function scrollToReview(index) {
        const reviewWidth = document.querySelector('.review-item').clientWidth;
        reviewsContainer.scrollTo({
            left: reviewWidth * index,
            behavior: 'smooth'
        });
    }
});

async function loadGoogleReviews(placeId, apiKey) {
    try {
        // Primeiro obtemos os detalhes do lugar para pegar o nome exato
        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,reviews&key=${apiKey}`;
        
        const detailsResponse = await fetch(placeDetailsUrl);
        const detailsData = await detailsResponse.json();
        
        if (detailsData.result && detailsData.result.reviews) {
            const reviews = detailsData.result.reviews;
            const reviewsContainer = document.getElementById('google-reviews');
            
            if (reviews.length > 0) {
                let reviewsHTML = '';
                
                reviews.forEach(review => {
                    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                    const date = new Date(review.time * 1000).toLocaleDateString();
                    
                    reviewsHTML += `
                        <div class="review-item">
                            <div class="review-header">
                                <img src="${review.profile_photo_url || 'https://via.placeholder.com/40'}" 
                                     alt="${review.author_name}" 
                                     width="40" 
                                     height="40" 
                                     class="review-avatar">
                                <span class="review-author">${review.author_name}</span>
                                <span class="review-stars">${stars}</span>
                            </div>
                            <div class="review-date">${date}</div>
                            <div class="review-text">${review.text}</div>
                        </div>
                    `;
                });
                
                reviewsContainer.innerHTML = reviewsHTML;
            } else {
                reviewsContainer.innerHTML = '<p class="text-center">Nenhuma avaliação encontrada.</p>';
            }
        } else {
            throw new Error('Nenhuma avaliação disponível ou erro na API');
        }
    } catch (error) {
        console.error('Erro ao carregar avaliações:', error);
        document.getElementById('google-reviews').innerHTML = 
            '<p class="text-center">As avaliações não puderam ser carregadas no momento.</p>';
    }
}
    
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