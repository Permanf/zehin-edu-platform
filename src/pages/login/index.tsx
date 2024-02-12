import { useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
// import { post } from "../../store/middlewares/index";
// import { post } from "src/application/middlewares/index";
// import { SetCookie } from "../../utils/cookie";
// import { Loader } from "@mantine/core";
// import { RiLockPasswordLine } from "@react-icons/all-files/ri/RiLockPasswordLine";
// import logo from "../../assets/logo.png";
// import { IconLock, IconMail, IconCalendar } from "@tabler/icons";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import styles from "./login.module.css"
import { useLoginUser } from "../../hooks/login/useLoginUser";

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
        setError,
        control,
      } = useForm({
        resolver: yupResolver(schema),
      });
      const addMutation = useLoginUser();
    //   const dispatch = useDispatch();
    //   const navigate = useNavigate();
    const onSubmit = (data:any) => {
      setState({ type: "SET_LOADING", payload: true });
      console.log(data);
      addMutation.mutate(data);
    };
    useEffect(() => {
      console.log(addMutation,"--mut");
      if (addMutation.isSuccess) {
        setState({ type: "SET_LOADING", payload: false });
        console.log("successfully");
        console.log(addMutation.data)
      }
      if (addMutation.isError){
        console.log("error")
        setState({ type: "SET_LOADING", payload: false });
      }
    },[addMutation.status]);

    return(
        <>
          <div className="w-full h-[52rem] flex flex-col justify-center">
            <h1 className="font-bold text-2xl mb-5">Тесты для Олимпиадных работ</h1>
            <div className="flex">
            <div className={`${styles.mainImg} bg-red-300 rounded-3xl`}>
            </div>
            <div className={`${styles.main} bg-white rounded-3xl p-8`}>
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
        </>
    )
}
const schema = Yup.object().shape({
    username: Yup.string().required("Username bolmaly"),
    password: Yup.string().required("Password bolmaly"),
  });
export default Login;

// dispatch(
    // post({
    //     url: `/auth/login`,
    //     data,
    //     method: "POST",
    //     action: (response) => {
    //     setState({ type: "SET_LOADING", payload: false });
    //     console.log(response);
    //     if (response?.success) {
    //         SetCookie("token-admin", response?.data);
    //         dispatch(loginSuccess(response?.data));
    //         // dispatch(userdata(response.data.data.admin));
    //     } else {
    //         console.log(response);
    //         if (response?.data?.message) {
    //         console.log("error message");
    //         // Object.keys(response.message)?.forEach((key) => {
    //         //   setError(key, {
    //         //     type: "manual",
    //         //     message: response.message[key],
    //         //   });
    //         // });
    //         } else {
    //         notifications.show({
    //             color: "red",
    //             title: "Üstünlikli bolmady!",
    //             // message: "",
    //         });
    //         }
    //     }
    //     },
    // })
    // );