function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}


function setActive(section) {
    const navItems = document.querySelectorAll('.custom-nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.custom-nav-item a[onclick*="${section}"]`).parentElement.classList.add('active');
}