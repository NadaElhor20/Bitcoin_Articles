import React, { useState, useEffect } from "react";
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
import { UserSchemaLogin } from "../Helpers/UserValidateSchema";
const _ = require("lodash");

const LoginForm = () => {
  const navigate = useNavigate();
  const [backerror, setbackerror] = useState("");
  useEffect(() => {
    localStorage.removeItem("auth");
  }, []);
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={UserSchemaLogin}
        onSubmit={async (values, { setSubmitting }) => {
          const user = { ...values };
          await axios
            .post("/users/signin", user, {
              headers: { "content-type": "application/json" },
            })
            .then((res) => {
              const token = res?.data?.token;
              let user = res?.data?.user;
              user = _.omit(user, ["list"]);
              if (res.data) {
                localStorage.setItem("auth", JSON.stringify({ token, user }));
              }
              navigate("/", { replace: true });
              window.location.reload(true);
            })
            .catch((err) => {
              setbackerror(err.response.data.message);
              navigate("/users/signin", { replace: true });
              window.location.reload(true);
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
            <Form
              className="child"
              onSubmit={handleSubmit}
              onChange={() => setbackerror("")}
            >
              <h4 margin="normal">Sign In</h4>
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
                  {errors.email && touched.email && errors.email}
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
              <FormHelperText error>
                {errors.email || errors.password ? <></> : <>{backerror}</>}
              </FormHelperText>
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

export default LoginForm;
