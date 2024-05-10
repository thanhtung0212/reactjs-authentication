import { useEffect } from "react";
import {
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  useForm
} from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import imgSignUp from "../../assets/signup.png";
import Divider from "../../components/Divider";
import LoginSocials from "../../components/LoginSocials";
import SideLeftAuthen from "../../components/SideLeftAuthen";
import TagRequired from "../../components/TagRequired";
import { RoutesNavigation } from "../../navigations";
import { SignUpRequest } from "../../services/types";
import { postLogin, postSignUp } from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Storage, { StorageKeys } from "../../utils/localStorage";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.app);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && Storage.getItem(StorageKeys.AccessToken)) {
      navigate(RoutesNavigation.Home);
    }
  }, [navigate, user]);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpRequest>();

  const registerRs = (
    fieldName: "email" | "password" | "firstName" | "lastName",
    options: RegisterOptions<FieldValues, string> | undefined = {}
  ) => {
    const registeredField: Partial<UseFormRegisterReturn> = register(
      fieldName,
      options
    );
    const ref = registeredField.ref;
    delete registeredField.ref;
    return { ...registeredField, innerRef: ref };
  };

  const handleSignUp = async (data: SignUpRequest) => {
    try {
      unwrapResult(await dispatch(postSignUp(data)));
      unwrapResult(
        await dispatch(
          postLogin({ email: data.email, password: data.password })
        )
      );
      toast(`Sign up ${data.email} successfully`, { type: "success" });
      navigate(RoutesNavigation.Home);
    } catch (error) {
      toast("Sign up failed", { type: "error" });
      console.log(error);
    }
  };

  const isDisabledBtn =
    watch("email") &&
    watch("password") &&
    watch("firstName") &&
    watch("lastName")
      ? false
      : true;

  /* Render */
  return (
    <div className='row'>
      <SideLeftAuthen backgroundImg={imgSignUp} />
      <div className='col-12 col-lg-5 d-flex align-items-center justify-content-center bg-white'>
        <div className='px-5 w-100 text-start'>
          <h5>Adventure starts here</h5>
          <p>Make your app management easy and fun!</p>
          <Form className='w-100' onSubmit={handleSubmit(handleSignUp)}>
            <FormGroup>
              <Label for='firstName'>
                Firstname <TagRequired />
              </Label>
              <Input
                id='firstName'
                name='email'
                placeholder='first name'
                type='text'
                {...registerRs("firstName", { required: true })}
              />
              <FormFeedback className={errors.firstName && "d-block"}>
                Firstname is required
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for='Lastname'>
                Lastname <TagRequired />
              </Label>
              <Input
                id='Lastname'
                name='email'
                placeholder='last name'
                type='text'
                {...registerRs("lastName", { required: true })}
              />

              <FormFeedback className={errors.lastName && "d-block"}>
                Lastname is required
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for='email'>
                Email <TagRequired />
              </Label>
              <Input
                id='email'
                name='email'
                placeholder='johndoe@gmail.com'
                type='email'
                {...registerRs("email", { required: true })}
              />
              <FormFeedback className={errors.email && "d-block"}>
                Email is required
              </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for='password'>
                Password <TagRequired />
              </Label>
              <Input
                id='password'
                name='password'
                placeholder='⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉'
                type='password'
                {...registerRs("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  },
                  maxLength: {
                    value: 18,
                    message: "Password must be at most 18 characters long"
                  },
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/,
                    message:
                      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
                  }
                })}
              />
              <FormFeedback className={errors.password?.message && "d-block"}>
                {errors.password?.message}
              </FormFeedback>
            </FormGroup>
            <FormGroup row>
              <Col
                sm={{
                  size: 10
                }}
              >
                <FormGroup check>
                  <Input id='checkbox2' type='checkbox' />{" "}
                  <Label check>
                    <p className='mb-0'>
                      i agree to
                      <Link to='/' className='tx-primary ml-2'>
                        {" "}
                        privacy policy & terms
                      </Link>
                    </p>
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <Button
              color='primary'
              className='w-100 fw-500'
              type='submit'
              disabled={isDisabledBtn}
            >
              Sign Up
            </Button>
          </Form>
          <div className='py-3 text-center'>
            Already have an account?{" "}
            <Link to={RoutesNavigation.Login} className='tx-primary'>
              Sign in instead
            </Link>
          </div>
          <Divider />
          <LoginSocials />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
