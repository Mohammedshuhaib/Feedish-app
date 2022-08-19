import * as yup from "yup";

export const schema = yup.object().shape({
  Name: yup.string().required("Name cannot be empty"),
  Email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  MobileNumber: yup
    .number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
});
