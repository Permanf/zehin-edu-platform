export const LOGOUT = "LOGOUT";
export const logout = () => ({
  type: LOGOUT,
});

export const USER_LOADING = "USER_LOADING";
export const userLoading = () => ({
  type: USER_LOADING,
});

export const USER_LOAD_FAILED = "USER_LOAD_FAILED";
export const userLoadFailed = () => ({
  type: USER_LOAD_FAILED,
});

export const USER_LOADED = "USER_LOADED";
export const userLoaded = (data:any) => ({
  type: USER_LOADED,
  payload: data,
});

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (data:any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const USER_DATA = "USER_DATA";
export const userData = (data:any) => ({
  type: USER_DATA,
  payload: data,
});

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const changeLanguage = (data:any) => ({
  type: CHANGE_LANGUAGE,
  payload: data,
});