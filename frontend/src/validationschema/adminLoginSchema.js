import * as yup from 'yup'


export const schema = yup.object().shape({
    Email:yup.string().required(),
    Password:yup.string()
    .required('No password provided.') 
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
})