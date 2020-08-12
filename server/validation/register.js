const Validator = require("validator"); 
const isEmpty = require("is-empty"); 

//Function takes in 'data' as a parameter which will be sent from front-end

module.exports = function validateRegisterInput(data) {
    let error = {};

    //Converting empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name: ""; 
    data.email = !isEmpty(data.email) ? data.email: ""; 
    data.password = !isEmpty(data.password) ? data.password: "";
    data.passwordconf = !isEmpty(data.passwordconf) ? data.passwordconf: "";  

    //Check user name
    if(Validator.isEmpty(data.name)) {
        error.name = "Veuillez remplir le champ"; 
    }

    //Check user email
    if(Validator.isEmpty(data.email)) {
        error.email = "Veuillez remplir le champ"; 
    }
    
    else if (!Validator.isEmail(data.email)) {
        error.email = "Format email incorrect";
    }

    //Check password
    if(Validator.isEmpty(data.password)) {
        error.password = "Mot de passe obligatoire";
    }

    if(Validator.isEmpty(data.passwordconf)) {
        error.passwordconf = "Veuillez confirmer votre mot de passe";
    }

    //Password lenght conditions
    if(!Validator.isLenght(data.password, { min: 8, max: 30} )) {
        error.password = "Mot de passe doit contenir 8 et 30 caractère";
    }

    if(!Validator.equals(data.password, data.passwordconf)) {
        errors.passwordconf = "Confirmation de mot de passe incorrect";
    }

    return {
        error, 
        isValid: isEmpty(error)
    };


};