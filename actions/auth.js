'use server';

export default async function register(prevState, formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const errors = {};

    if (!email || !email.includes('@')) {
        errors.email = 'Please enter a valid email address.'
    }

    if(!password || password.length < 6){
        errors.password = 'Password must be at least 6 characters long.'
    }

    if(Object.keys(errors).length > 0){
        return {
            errors
        }
    }
    
// storing in the DB

    return {
        ... prevStore,  
        message: 'Registration successful!'
    };
}