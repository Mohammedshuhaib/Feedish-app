import * as yup from 'yup'

export const schema = yup.object().shape({
    Name: yup.string().required(),
    Email: yup.string().email().required(),
    MobileNumber:yup.number().required().min(10).max(10),
})

