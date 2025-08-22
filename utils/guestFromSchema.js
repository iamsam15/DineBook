import * as Yup from "yup";
const authSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  phoneNumber: Yup.string()
    .required("Phone number is Required")
    .matches(/^[0-9]+$/, "Phone number must be numeric")
    .min(10, "Phone number must be at least 10 digits long"),
});

export default authSchema;
