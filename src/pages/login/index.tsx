import { useEffect, useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import logo from "../../assets/logo.png"
import loginImage from "../../assets/loginImage.png"
import { useForm, Controller } from "react-hook-form";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import styles from "./login.module.css"
import { useLoginUser } from "../../hooks/login/useLoginUser";
import { SetCookie } from "../../utils/cookie";
import { loginSuccess, userData } from "../../store/actions/auth";

function reducer(state:any, action:any) {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: action.payload,
        };
      default:
        return state;
    }
}

const Login = () => {
  const [state, setState] = useReducer(reducer, {
      loading: false,
    });
    const {
      handleSubmit,
      formState: { errors },
      // setError,
      control,
    } = useForm({
      resolver: yupResolver(schema),
    });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state:any) => state.auth);
  const location = useLocation();
  useEffect(() => {
    if (isLogged === true) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    }
    return () => {
      setState({ type: "RESET_DATA" });
    };
    // eslint-disable-next-line
  }, [isLogged]);
  const addMutation = useLoginUser();
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const onSubmit = (data:any) => {
    setState({ type: "SET_LOADING", payload: true });
    // console.log(data);
    addMutation.mutate(data);
  };
  useEffect(() => {
    // console.log(addMutation,"--mut");
    if (addMutation.isSuccess) {
      setState({ type: "SET_LOADING", payload: false });
      // console.log("successfully");
      // console.log(addMutation.data.data.token)
      SetCookie("token-zehin", addMutation.data?.data?.token);
      dispatch(loginSuccess(addMutation.data?.data?.token));
      dispatch(userData(addMutation.data?.data?.profile));
    }
    if (addMutation.isError){
      console.log("error")
      setState({ type: "SET_LOADING", payload: false });
    }
  },[addMutation.status]);

    return(
        <>
        <div className={`${styles.layoutBody} h-full flex flex-col items-center`}>
            <div className={`w-full h-[65px] flex flex-col justify-center items-center bg-white`}>
            <div className={`${styles.layout} flex flex-col`}>
            <div className="flex justify-between items-center w-full h-full">
              <Link to="/" className="flex h-full items-center">
                  <img src={logo} alt="logo" className="w-12" />
                  <span className="font-semibold leading-5 ml-3">Türkmenistanyň Bilim <br/> Ministrligi</span>
              </Link>
            </div>
            </div>
            </div>
        <div className={`${styles.layout} flex flex-col `}>
        <div className="w-full h-[52rem] flex flex-col justify-center md:mt-0 mt-10">
          <h1 className="font-bold text-2xl my-5">Тесты для Олимпиадных работ</h1>
          <div className="flex flex-col md:flex-row">
          <div  
          style={{
            backgroundImage: `url(${loginImage})`,
            backgroundPosition:"top",
            backgroundRepeat:"no-repeat",
            backgroundSize:"cover"
        }}
          className={`${styles.mainImg} bg-red-300 rounded-3xl`}>
          </div>
          <div className={`${styles.mainForm} w-full bg-white rounded-3xl p-8`}>
            <h1 className="font-bold text-2xl text-center mb-10">Начать тест</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value, ref } }) => {
                    return (
                    <TextInput
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        placeholder="Username"
                        // icon={<IconUser size={16} color={"black"} />}
                        error={errors?.username?.message}
                        size="md"
                        className="mb-7"
                    />
                    );
                }}
                />
                <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <PasswordInput
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoComplete="false"
                    placeholder="Password"
                    mt="md"
                    size="md"
                    // icon={<IconLock size={16} color={"black"} />}
                    error={errors?.password?.message}
                    />
                )}
                />

                <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    loading={state.loading}
                    size="md"
                >
                    Girmek
                </Button>
              </form>
          </div>
          </div>

        </div>
        </div>
        </div>
          
        </>
    )
}
const schema = Yup.object().shape({
    username: Yup.string().required("Username bolmaly"),
    password: Yup.string().required("Password bolmaly"),
  });
export default Login;
