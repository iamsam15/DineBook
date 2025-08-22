import * as Yup from "yup";
const authSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is Required")
    .min(6, "Password must be at least 6 characters long"),
});

export default authSchema;
