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
import ImgLogin from "../../assets/login.png";
import Divider from "../../components/Divider";
import LoginSocials from "../../components/LoginSocials";
import SideLeftAuthen from "../../components/SideLeftAuthen";
import TagRequired from "../../components/TagRequired";
import { RoutesNavigation } from "../../navigations";
import { postLogin } from "../../store/appReducer";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Storage, { StorageKeys } from "../../utils/localStorage";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface DataForm {
  email: string;
  password: string;
}
const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.app);

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
  } = useForm<DataForm>();

  const registerRs = (
    fieldName: "email" | "password",
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

  const handleLogin = async (data: DataForm) => {
    console.log("data", data);

    try {
      unwrapResult(await dispatch(postLogin(data)));
      toast("Login successfully", { type: "success" });
      navigate(RoutesNavigation.Home);
    } catch (error) {
      toast("Email or password is incorrect", { type: "error" });
      console.log("error", error);
    }
  };

  const isDisabledBtn = watch("email") && watch("password");

  /* Render */
  return (
    <div className='row'>
      <SideLeftAuthen backgroundImg={ImgLogin} />
      <div className='col-12 col-lg-5 d-flex align-items-center justify-content-center bg-white'>
        <div className='px-5 w-100 text-start'>
          <h5>Welcome to Entrance Test Interview! 👋🏻</h5>
          <p>Please sign-in to your account and start the adventure</p>
          <Form className='w-100' onSubmit={handleSubmit(handleLogin)}>
            <FormGroup>
              <Label for='email'>
                Email <TagRequired />
              </Label>
              <Input
                id='email'
                placeholder='johndoe@gmail.com'
                type='email'
                {...registerRs("email", {
                  required: true
                })}
              />
              {errors.email && <FormFeedback>Email is required</FormFeedback>}
            </FormGroup>
            <FormGroup>
              <Label for='password'>
                Password <TagRequired />
              </Label>
              {/* Validate strong password */}
              <Input
                {...registerRs("password", {
                  required: "Password is required"
                })}
                id='password'
                name='password'
                placeholder='⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉'
                type='password'
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
                    <p className='mb-0'>Remember me</p>
                  </Label>
                </FormGroup>
              </Col>
            </FormGroup>
            <Button
              color='primary'
              className='w-100 fw-500'
              type='submit'
              disabled={!isDisabledBtn}
            >
              Login
            </Button>
          </Form>
          <div className='py-3 text-center'>
            New on our platform?{" "}
            <Link to={RoutesNavigation.SignUp} className='tx-primary'>
              Create an account
            </Link>
          </div>
          <Divider />
          <LoginSocials />
        </div>
      </div>
    </div>
  );
};

export default Login;
