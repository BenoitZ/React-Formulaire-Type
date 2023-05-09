import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const FormTemplate = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const formMess = document.querySelector(".form-message");

    emailjs
      .sendForm(
        'service_8eopacl', 
        'template_ic5v5rq', 
        form.current, 
        process.env.REACT_APP_ID
        )
      .then((result) => {
          console.log(result.text);
          form.current.reset();
          formMess.innerHTML = "<p class='success'>Message envoyé !</p>"; 
      
          setTimeout(() => {
            formMess.innerHTML = "";}, 4500);

        }, (error) => {
          console.log(error.text);
          formMess.innerHTML = "<p class='error'>Une erreur s'est produite, veuillez réessayer.</p>"; 
            
          setTimeout(() => {
            formMess.innerHTML = "";}, 4500);
        });
  };

  return (
    <div className= "form-container">
        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name="name" required autoComplete='off' />
          <label>Email</label>
          <input type="email" name="email" required autoComplete='off' />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Envoyer" required autoComplete='off'/>
        </form>
        <div className='form-message'></div>

    </div>
  );
};

export default FormTemplate;


//useref -> recupére les valeurs passées dans les input lors de l'événement onsubmit dans la balise form
//<form ref={form} onSubmit{sendEmail} -> le ref envoi toutes les valeurs au useref au submit
//form.current recupére les name/email/message

//useref equivalent de e.target.value  mais on peut l'utiliser pour récupérer la/les valeurs de un ou plusieurs input en méme temps

//sendform ->méthode de emailJs
// on parametre le .sendform en remplacant par les identifiants
// .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
//.sendForm('service_8eopacl', 'template_ic5v5rq', form.current, 'TvGXnx07Aiubo2WpG')

//form.current.reset();  remet le formulaire à zero une fois le result validé
//UN PARENT UNIQUE PAR COMPOSENT -> UNE DIV

//cacher une donnée sensible 
// on crée un fichier .env à la racine du projet 
// on crée une variable avec la donnée sensible dedans -> REACT_APP_ID= TvGXnx07Aiubo2WpG  !!! toujours REACT_APP_   puis NOM ou autre
// on remplace le 'TvGXnx07Aiubo2WpG'   par   process.env.REACT_APP_ID
