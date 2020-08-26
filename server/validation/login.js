const Validator = require("validator"); 
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {}; 

//Converting empty fields to an empty string so we can use validator

    data.email = !isEmpty(data.email) ? data.email: ""; 
    data.password = !isEmpty(data.password) ? data.password: ""; 

    //Email checks according validator 
    if(Validator.isEmpty(data.email)) {
        errors.email = "Champ email à remplir";

    }

    else if (!Validator.isEmail(data.email)) {
        errors.email = "Format email incorrect"

    }

    //Password checks 
    if(Validator.isEmpty(data.password)) {
        errors.password = "Mot de passe obligatoire"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};