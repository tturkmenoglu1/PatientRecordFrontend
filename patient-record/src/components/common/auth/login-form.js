import { Form, Button, InputGroup, Container, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { HiOutlineMail } from "react-icons/hi";
import * as Yup from "yup";
import PasswordInput from "../password-input/password-input";
import "./login-form.scss";
import { useState } from "react";
import { encryptedLocalStorage, encryptedSessionStorage,} from "../../../helpers/functions/encrypt-storage";
import { getUser, login } from "../../../api/user-service";
import { toast } from "../../../helpers/functions/swal";
import { useAppDispatch } from "../../../store/hooks";
import { loginFailed, loginSuccess } from "../../../store/slices/auth-slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await login(values);
      encryptedLocalStorage.setItem("token", resp.data.token);
      
      navigate("/home")
    } catch (err) {
      dispatch(loginFailed());
      toast(err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container className="loginDiv">
      <Form noValidate onSubmit={formik.handleSubmit} className="p-4">
        <h3>LOGIN</h3>

        <InputGroup className="mb-3 mt-4">
          <InputGroup.Text>
            <HiOutlineMail />
          </InputGroup.Text>
          <Form.Control
            className="email-input"
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            isInvalid={formik.touched.email && formik.errors.email}
            isValid={formik.touched.email && !formik.errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </InputGroup>

        <PasswordInput
          placeholder="Password"
          {...formik.getFieldProps("password")}
          isInvalid={formik.touched.password && formik.errors.password}
          isValid={formik.touched.password && !formik.errors.password}
          error={formik.errors.password}
        />

        <Button
          variant="secondary"
          type="submit"
          disabled={!(formik.dirty && formik.isValid) || loading}
        >
          {loading && <Spinner animation="border" size="sm" />} Login
        </Button>

        <hr className="mt-5" />

      </Form>
    </Container>
  );
};

export default LoginForm;
