import validator from 'validator';

export const validate = (values) =>{
    const errors = {}
   if(!values.name){
       errors.name = 'Must add a name'
   }
   if(values.name){
       if(!validator.isAlpha(values.name)){
        errors.name = 'Name can only contain characters'
       }
   }
   if(!values.surName){
    errors.surName = 'Must add a SurName'
    }
    if(values.surName){
        if(!validator.isAlpha(values.surName)){
        errors.surName = 'SurName can only contain characters'
        }
    }
    if(!values.city){
        errors.city = 'Must add a city'
    }
    if(values.city){
        if(!validator.isAlpha(values.city)){
         errors.city = 'city can only contain characters'
        }
    }
    if(!values.address){
        errors.address = 'Must add an address'
    }
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