import cookie from 'js-cookie';
 
export const SetCookie = (key:string, value:any) => cookie.set(key, value, { expires: 5 });
 
export const GetCookie = (name:string) => cookie.get(name);
 
export const RemoveCookie = (name:string)=> cookie.remove(name);