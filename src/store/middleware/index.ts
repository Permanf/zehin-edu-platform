import { api } from "../api/index";
import { IDeleteApi, IGetApi, IPostApi, IUpdateApi, IUploadApi } from "./middleware.interface";

export const get = async ({ url, token, action }: IGetApi) => {
    try {
      const response = await api.get({ url, token });
      return action({ success: true, data: response });
    } catch (error) {
      console.log(error);
      return action({ success: false, message: error });
    }
  };

// export const post = async ({ url, token, data, action } : IPostApi) => {
//     try {
//       const response = await api.post({ url, token, params: data  });
//       return action({ success: true, data: await response.json() });
//     } catch (error) {
//       return action({
//         success: false,
//         message: error,
//         error: error,
//       });
//     }
//   };

// export const put =
//   ({ url, token, data, action }: IUpdateApi) =>
//   async () => {
//     try {
//       const response = await api.update({ url, token, params: data });
//       return action({ success: true, data: response });
//     } catch (error) {
//       return action({ success: false, message: error });
//     }
//   };

// export const del = async ({ url, token, action }: IDeleteApi) => {
//     try {
//       const response = await api.delete({ url, token });
//       return action({ success: true, data: await response.json() });
//     } catch (error) {
//       console.log(error);
//       return action({ success: false, message: error });
//     }
//   };

// export const upload = async ({ url, token, data, action } : IUploadApi) => {
//     try {
//       console.log(data,"--mid")
//       const response = await api.upload({ url, token, formData: data  });
//       return action({ success: true, data: await response.json() });
//     } catch (error) {
//       return action({
//         success: false,
//         message: error,
//         error: error
//       });
//     }
//   };
