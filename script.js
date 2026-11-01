const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('active');
    mobile_menu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', mobile_menu.classList.contains('active'));
})

// ferme le menu mobile quand on clique sur un lien
mobile_menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', ()=>{
        hamburger.classList.remove('active');
        mobile_menu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    })
})

document.addEventListener('scroll', () => {
    var scroll_position = window.scrollY;
    if(scroll_position >250){
        header.style.backgroundColor = "#29323c";

    }
    else{
        header.style.backgroundColor = "transparent";

    }
})

document.getElementById('year').textContent = new Date().getFullYear();
