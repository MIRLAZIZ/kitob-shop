
let translator = null
export const tranlateFunction = (tranlate) => {
    translator = tranlate
}



// email validation
export const validateEmail = (emailValue) => {

    const email = emailValue ? emailValue.trim() : emailValue;
    if (email && !isValidEmail(email)) {
        return {
            item: false,
            message: translator('validation.invalid_email')
        }
    }
    else {
        return {
            item: true,
            message: null
        }



    };
}




const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};



// 👉 item Validator
export const isEmpty = (value, key) => {
    if (value === null || value === undefined || value === '') {
        return {
            item: false,
            message: translator('validation.required',{field: key} )
        }

    }
    else {
        return {
            item: true,
        }
    }
}


// max and min length
export const validateLength = (value, key, minLength, maxLength) => {
    const length = String(value).trim().length;


    if (length < minLength) {

        return {
            item: false,
            message: translator('validation.min_length',{field: key, min: minLength})
        };
    } else if (length > maxLength) {
        return {
            item: false,
            message: translator('validation.max_length',{field: key, max: maxLength})
        };
    }

    return {
        item: true,
        message: null
    };

    // else {
    //     return {
    //         item: true,
    //         message: null
    //     };

    // }

}



// pasword validation
export const passwordValidator = password => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    // const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
    const validPassword = regex.test(password)
    if (!validPassword) {
        return {
            item: false,
            message: translator('validation.weak_password')
        }
    }
    else {
        return {
            item: true,
            message: null
        }
    }
}

// confirm password 
export const confirmedValidator = (value, target) => {
    if (value != target) {
        return {
            item: false,
            message: translator('validation.password_mismatch')
        }

    }
    else {
        return {
            item: true
        }
    }
}

export const validation = (massiv) => {
    return massiv.every(element => element.item === true);
}   







