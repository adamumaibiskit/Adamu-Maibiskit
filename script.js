// Global toggle flag to prevent scrollspy and manual button clicks from fighting each other
let isProgrammaticScrolling = false;

function scrollToPage(elementId) {
    isProgrammaticScrolling = true;
    
    // De-activate all elements immediately on click to prioritize action responsiveness
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const clickedButton = document.querySelector(`[data-target="${elementId}"]`);
    if (clickedButton) clickedButton.classList.add('active');

    if (elementId === 'doc-page-1') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => { isProgrammaticScrolling = false; }, 800);
        return;
    }

    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Allow time for smooth scroll animation to finish before turning scrollspy back on
        setTimeout(() => { isProgrammaticScrolling = false; }, 800);
    } else {
        isProgrammaticScrolling = false;
    }
}

// Scroll Spy Mechanism
window.addEventListener('scroll', () => {
    // If a tab button was explicitly clicked, ignore scroll tracking calculations temporarily
    if (isProgrammaticScrolling) return;

    const sections = document.querySelectorAll('.page-view');
    const navButtons = document.querySelectorAll('.nav-btn');
    const navBar = document.getElementById('navigation-bar');
    
    let currentActiveSectionId = 'doc-page-1'; 

    sections.forEach(section => {
        const sectionTopPosition = section.offsetTop;
        if (window.scrollY >= sectionTopPosition - 185) {
            currentActiveSectionId = section.getAttribute('id');
            
            const titleMeta = section.getAttribute('data-title') || "Portfolio";
            document.title = `Adamu Maibiskit | ${titleMeta}`;
        }
    });

    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-target') === currentActiveSectionId) {
            button.classList.add('active');
            
            // Auto-centers navigation links inside sliding bars smoothly as you scroll down
            if (navBar) {
                const buttonLeft = button.offsetLeft;
                const buttonWidth = button.offsetWidth;
                const navBarWidth = navBar.offsetWidth;
                
                navBar.scrollTo({
                    left: buttonLeft - (navBarWidth / 2) + (buttonWidth / 2),
                    behavior: 'smooth'
                });
            }
        }
    });
});