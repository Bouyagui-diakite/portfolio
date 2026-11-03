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

// formulaire de contact : envoi via Web3Forms sans quitter la page
const messages = {
    fr: {
        sending: 'Envoi en cours…',
        success: 'Merci, votre message a bien été envoyé. Je vous réponds au plus vite.',
        error: "L'envoi a échoué. Écrivez-moi directement à bouyaguidiakite2@gmail.com."
    },
    en: {
        sending: 'Sending…',
        success: "Thank you, your message has been sent. I'll get back to you shortly.",
        error: 'Sending failed. Please email me directly at bouyaguidiakite2@gmail.com.'
    }
};
const text = messages[document.documentElement.lang] || messages.fr;
const contact_form = document.getElementById('contact-form');
const form_status = contact_form.querySelector('.form-status');
const form_button = contact_form.querySelector('button[type=submit]');

contact_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    form_status.className = 'form-status';
    form_status.textContent = text.sending;
    form_button.disabled = true;

    try {
        const response = await fetch(contact_form.action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(contact_form)))
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message);

        form_status.classList.add('success');
        form_status.textContent = text.success;
        contact_form.reset();
    } catch (error) {
        form_status.classList.add('error');
        form_status.textContent = text.error;
    } finally {
        form_button.disabled = false;
    }
})
