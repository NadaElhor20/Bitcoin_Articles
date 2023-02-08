import React, { useState } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "../Apis/axios";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@mui/material";
import { UserSchema } from "../Helpers/UserValidateSchema";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [backerror, setbackerror] = useState("");

  return (
    <>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={UserSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const newUser = { ...values };
          await axios
            .post("/users", newUser)
            .then((res) => {
              navigate("/users/signin");
            })
            .catch((err) => {
              setbackerror(err.response.data.message);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="container">
            <Form className="child" onSubmit={handleSubmit}>
              <h4 margin="normal">Sign Up</h4>
              <FormControl margin="normal">
                <InputLabel>Username</InputLabel>
                <Input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />
                <FormHelperText error>
                  {errors.username && touched.username && errors.username}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel>Email</InputLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <FormHelperText error>
                  {errors.email && touched.email ? (
                    <>{errors.email}</>
                  ) : (
                    <>{backerror}</>
                  )}
                </FormHelperText>
              </FormControl>
              <FormControl margin="normal">
                <InputLabel>Password</InputLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                <FormHelperText error>
                  {errors.password && touched.password && errors.password}
                </FormHelperText>
              </FormControl>
              <Button
                variant="contained"
                margin={20}
                className="mt-4"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SignUpForm;
