import {
    logout,
    userLoading,
    userLoadFailed,
    loginSuccess,
  } from "../actions/auth";
  // import toast from 'react-hot-toast';
  import { GetCookie, RemoveCookie } from "../../utils/cookie";
  import { Action, Dispatch } from 'redux';
  
  export const Logout1 = () => async (dispatch: Dispatch<Action>) => {
    try {
      RemoveCookie("token-admin");
      dispatch(logout());
    } catch (error) {
      dispatch(logout());
      RemoveCookie("token-admin");
      // toast.error('Неизвестная ошибка');
    }
  };

  export const LoadUser = () => async (dispatch: Dispatch<Action>) => {
    dispatch(userLoading());
    let language = localStorage.getItem("language");
    if (!language) {
      language = "tkm";
      localStorage.setItem("language", "tkm");
    }
    let token = GetCookie("token-zehin");
    if (!token) {
      dispatch(userLoadFailed());
    } else {
      dispatch(loginSuccess(token));
    }
  };
  // try {
    //   if (token) {
    //     // console.log(token);
    //     const response = await api.get({ url: "/api/admin/me", token });
    //     // dispatch(userLoaded(response.data));
    //     if (response.data.success) {
    //       // console.log(response.data.data);
    //       dispatch(userdata(response.data.data));
    //     }
    //   }
    // } catch (error) {
    //   console.log("error");
    //   // dispatch(userLoadFailed());
    //   // toast.error("Неизвестная ошибка");
    // }