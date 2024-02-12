export interface IGetApi {
    url: string;
    token: string | null;
}

export interface IPostApi {
    url: string;
    token: string | null;
    params: string;
    method: string;
}

export interface IUpdateApi {
    url: string;
    token: string | null;
    params: string;
}

export interface IDeleteApi {
    url: string;
    token: string | null;
    id: number;
}

export interface IUploadApi {
    url: string;
    token: string | null;
    formData: any;
}