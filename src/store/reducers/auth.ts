import {
    LOGIN_SUCCESS,
    USER_DATA,
    LOGOUT,
    USER_LOADING,
    USER_LOAD_FAILED,
    USER_LOADED,
    CHANGE_LANGUAGE,
  } from "../actions/auth";
  
  const initialState = {
    token: "",
    isLogged: false,
    isLoading: true,
    lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : "tkm",
    user: {},
    extended: localStorage.getItem("extended")
      ? localStorage.getItem("extended") === "true"
      : true,
  };
  
  const reducer = (state = initialState, action:any) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          token: action.payload,
          user: {},
          isLoading: false,
          isLogged: true,
        };
      case USER_DATA:
        return {
          ...state,
          user: action.payload,
        };
      case USER_LOADED:
        return {
          ...state,
          token: action.payload.token,
          user: action.payload.user,
          isLogged: true,
          isLoading: false,
        };
      case LOGOUT:
        return {
          ...state,
          token: "",
          isLogged: false,
          isLoading: false,
          user: {},
        };
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case USER_LOAD_FAILED:
        return {
          ...state,
          token: "",
          isLogged: false,
          isLoading: false,
          user: {},
        };
      case CHANGE_LANGUAGE:
        localStorage.setItem("lang", action.payload);
        return {
          ...state,
          lang: action.payload,
        };
      case "SET_EXTENDED": {
        localStorage.setItem("extended", action.payload);
        return {
          ...state,
          extended: action.payload,
        };
      }
      default:
        return state;
    }
  };
  
  export default reducer;
  