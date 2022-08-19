import * as yup from 'yup'


export const schema = yup.object().shape({
    Email:yup.string().email('Must be a valid email').max(255).required('Email is required'),
    Password:yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.')
})