// ===== EFECTO DE SEGUIMIENTO DEL RATÓN EN TARJETAS =====
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar solo tarjetas de educación, experiencia y habilidades para efecto 3D
    const cards3D = document.querySelectorAll('.elemento-educacion, .elemento-experiencia, .tarjeta-habilidad');
    
    cards3D.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            card.style.transition = 'transform 0.05s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.transition = 'transform 0.3s ease';
        });
    });
    
    // ===== EFECTO DE BRILLO SIGUIENDO EL CURSOR (EDUCACIÓN, EXPERIENCIA Y HABILIDADES) =====
    const glowCards = document.querySelectorAll('.elemento-educacion, .elemento-experiencia, .tarjeta-habilidad');
    
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
    
    // ===== ANIMACIÓN DE APARICIÓN AL HACER SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const animatedElements = document.querySelectorAll('.elemento-educacion, .elemento-experiencia, .tarjeta-habilidad');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        observer.observe(el);
    });
    
    // ===== ANIMACIÓN DE ESCRITURA PARA EL NOMBRE =====
    const nombre = document.querySelector('.nombre');
    const subtitulo = document.querySelector('.subtitulo-seccion-inicio');
    
    if (nombre) {
        // Mantener el texto visible para la animación CSS
        nombre.style.display = 'inline-block';
    }
    
    // Animar los botones después del subtítulo
    const botones = document.querySelector('.botones-seccion-inicio');
    if (botones) {
        botones.style.opacity = '0';
        setTimeout(() => {
            botones.style.transition = 'opacity 1s ease';
            botones.style.opacity = '1';
        }, 4500);
    }
    
    // ===== EFECTO PARALLAX SUAVE EN LA NAVEGACIÓN =====
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 80) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // ===== SMOOTH SCROLL PARA LOS ENLACES DE NAVEGACIÓN =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});