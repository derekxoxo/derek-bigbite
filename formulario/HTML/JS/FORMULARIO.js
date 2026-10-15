const btn = document.getElementById('button');

document.getElementById('form')
.addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = "service_p8hcguj"; 
    const templateID = "template_8tgvl14";

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Send Email';
        alert('Enviado! ');
        this.reset(); 
    })
    .catch((err) => {
        btn.value = 'Send Email';
        alert('Error ');
        console.log(err);
    });
});