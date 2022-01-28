function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalbg2 = document.querySelector(".bground2");
const modalBtn = document.querySelectorAll(".modal-btn");
const btnClose = document.getElementById("btnClose");
const btnClose2 = document.getElementById("btnClose2");
const modalConfirmation = document.querySelector(".contentConfirmation");
const btnConfirmation = document.querySelector(".btConfirm");
/*const formData = document.querySelectorAll(".formData");*/


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
btnClose.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}

function closeModal() {
    modalbg.style.display = "none";
}

// Close modal 2

btnClose2.addEventListener("click", function (closeModalConf) {
    modalbg2.style.display = "none";
    modalConfirmation.style.display = "none";
});
btnConfirmation.addEventListener("click", function (closeModalConf2) {
    modalbg2.style.display = "none";
    modalConfirmation.style.display = "none";
});

// DOM Elements
const form = document.getElementById("form");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const cities = form.elements["location"];
const termsOfUse = document.getElementById("checkbox1");
let email_V = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let regExp = new RegExp("[0-9]");

//gestion de la date au format YYYY-MM-DD
let today = new Date(new Date().getTime());
let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let dateLimit = year + "-" + month + "-" + day;


form.addEventListener('submit', validate);

//contrôle de la saisie
function validate(a) {
    a.preventDefault();

    const inputValidate = [];

    //check prénom
    if (firstName.value.length < 2 || firstName.value === "" || regExp.test(firstName.value)) {
        document.getElementById("errorFirst").innerHTML =
            "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        firstName.style.borderColor = "red";
        inputValidate.push(false);
    } else {
        document.getElementById("errorFirst").innerHTML = "";
        inputValidate.push(true);
        firstName.style.borderColor = "transparent";
    }

    //check nom
    if (lastName.value.length < 2 || lastName.value === "" || regExp.test(lastName.value)) {
        document.getElementById("errorLast").innerHTML =
            "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
        lastName.style.borderColor = "red";
        inputValidate.push(false);
    } else {
        document.getElementById("errorLast").innerHTML = "";
        inputValidate.push(true);
        lastName.style.borderColor = "transparent";
    }

    //check email
    if (email.value === "" || !email_V.test(email.value)) {
        document.getElementById("errorEmail").innerHTML =
            "Veuillez entrer un email valide";
        email.style.borderColor = "red";
        inputValidate.push(false);
    } else {
        document.getElementById("errorEmail").innerHTML = "";
        inputValidate.push(true);
        email.style.borderColor = "transparent";
    }

    //check date de naissance
    if (birthDate.value === "" || birthDate.value > dateLimit ) {
        document.getElementById("errorBirthDate").innerHTML =
            "Vous devez entrer votre date de naissance.";
        birthDate.style.borderColor = "red";
        inputValidate.push(false);
    } else {
        document.getElementById("errorBirthDate").innerHTML = "";
        inputValidate.push(true);
        birthDate.style.borderColor = "transparent";
    }

    //check participation
    if (quantity.value === "") {
        document.getElementById("errorQuantity").innerHTML =
            "Veuillez entrer un nombre";
        quantity.style.borderColor = "red";
        inputValidate.push(false);
    } else {
        document.getElementById("errorQuantity").innerHTML = "";
        inputValidate.push(true);
        quantity.style.borderColor = "transparent";
    }

    //check ville
    if (!getRadioButton(form.elements["location"])) {
        document.getElementById("errorCitie").innerHTML = "Veuillez choisir une ville";
        inputValidate.push(false);
    } else {
        document.getElementById("errorCitie").innerHTML = "";
        inputValidate.push(true);
    }
    /*if (cities.findIndex((element) => element.checked) === -1) {
        document.getElementById("errorCitie").innerHTML = "Veuillez choisir une ville";
        inputValidate.push(false);
    } else {
        document.getElementById("errorCitie").innerHTML = "";
        inputValidate.push(true);
    }*/

    //check conditions d'utilisation
    if (!termsOfUse.checked) {
        document.getElementById("errorTerms").innerHTML = "Vous devez vérifier que vous acceptez les termes et conditions.";
        inputValidate.push(false);
    } else {
        document.getElementById("errorTerms").innerHTML = "";
        inputValidate.push(true);
    }


    if (inputValidate.every((element) => element === true)) {
        closeModal();
        form.reset();
        modalbg2.style.display = "block";
        modalConfirmation.style.display = "block";
    }
}

function getRadioButton(radioBouton) {
    let choix;

    for (let radio of radioBouton) {
        if (radio.checked) {
            choix = radio.value;
        }
    }
    return choix;
}

