import * as yup from 'yup'

export const schema = yup.object().shape({
    Name: yup.string().required('Name cannot be empty'),
    Email: yup.string().email('Invalid email formate').required('Email connot be empty'),
    MobileNumber:yup.number().required('Mobile number cannot be empty').typeError('Mobile number cannot be empty'),
})

