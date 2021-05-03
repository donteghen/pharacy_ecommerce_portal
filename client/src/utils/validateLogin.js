import validator from 'validator';

export const validateLogin = (values) =>{
    const errors = {}
   
    if(!values.email){
        errors.email = 'Must add an email'
        }
    if(values.email){
        if(!validator.isEmail(values.email)){
            errors.email = 'wrong email format'
        }
    }
    if(!values.password){
        errors.password= 'must add a password'
    }
    if(values.password){
        if(!validator.isLength(values.password, {min:6, max:20})){
            errors.password= 'password isn\'t strong enough, please enter a stronger combination'
        }
    }
    return errors
}