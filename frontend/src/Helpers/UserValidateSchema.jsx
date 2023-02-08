import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Please Enter Username"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter Valid Email"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});
const UserSchemaLogin = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please Enter Valid Email"),
  password: Yup.string()
    .required("Please Enter Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

export { UserSchema, UserSchemaLogin };
