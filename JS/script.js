document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('input[type="submit"]');
    const submittingDiv = form.querySelector('.submitting');

    // Fonction de validation du formulaire
    function validateForm() {
        const name = form.querySelector('#nom').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#sujet').value.trim();
        const message = form.querySelector('#message').value.trim();
        
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Tous les champs doivent être remplis.');
            return false;
        }
        
        // Validation de l'email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Veuillez entrer une adresse e-mail valide.');
            return false;
        }

        return true;
    }

    // Fonction pour envoyer les données du formulaire via Fetch
    async function submitForm(event) {
        event.preventDefault(); // Empêche le rechargement de la page
        
        if (!validateForm()) {
            return;
        }

        const formData = new FormData(form);

        // Afficher le message "envoi en cours"
        submittingDiv.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        try {
            const response = await fetch('URL_DE_TRAITEMENT_DU_FORMULAIRE', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Afficher un message de confirmation
                alert('Votre message a été envoyé avec succès !');
                form.reset();
            } else {
                alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
            }
        } catch (error) {
            alert('Une erreur est survenue. Veuillez réessayer.');
        } finally {
            submittingDiv.textContent = '';
            submitButton.disabled = false;
        }
    }

    form.addEventListener('submit', submitForm);
});
