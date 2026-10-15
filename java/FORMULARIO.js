const btn = document.getElementById('button');

document.getElementById('form')
.addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = "service_9y4ox3r"; 
    const templateID = "template_mjd2smh";

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