import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { registrationService } from "../../services/registration";

class RegisterPage extends React.Component {
  render() {
    return (
      <div>
        <h2>Register</h2>
        <Formik
          initialValues={{
            username: "",
            first_name: "",
            last_name: "",
            password: "",
            confirm: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username is required"),
            first_name: Yup.string().required("First Name is required"),
            last_name: Yup.string().required("Last Name is required"),
            password: Yup.string().required("Password is required"),
            confirm: Yup.string().required("Password Confirmation is required")
          })}
          onSubmit={(
            { username, first_name, last_name, password, confirm },
            { setStatus, setSubmitting }
          ) => {
            setStatus();
            registrationService
              .register(username, first_name, last_name, password, confirm)
              .then(res => {
                console.log("Returned from registration: ", res);
                this.props.registrationCallback();
                console.log("Returned from registration: called callback");
              })
              .catch(error => {
                console.log("Returned error registration", error);
                this.props.registrationCallback();
                setSubmitting(false);
                setStatus(error);
              });
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username / Email Address</label>
                <Field
                  name="username"
                  type="text"
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="first_name">First name</label>
                <Field
                  name="first_name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.first_name && touched.first_name
                      ? " is-invalid"
                      : "")
                  }
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last name</label>
                <Field
                  name="last_name"
                  type="text"
                  className={
                    "form-control" +
                    (errors.last_name && touched.last_name ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm">Confirm Password</label>
                <Field
                  name="confirm"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirm && touched.confirm ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="confirm"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Login
                </button>
                {isSubmitting && (
                  <img
                    src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                    alt=""
                  />
                )}
              </div>
              {status && <div className={"alert alert-danger"}>{status}</div>}
            </Form>
          )}
        />
      </div>
    );
  }
}

export { RegisterPage };
