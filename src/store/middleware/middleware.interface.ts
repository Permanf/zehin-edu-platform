export interface IGetApi {
    url: string;
    token: string | null;
    action: (response: any) => void;
}

export interface IPostApi {
    url: string;
    token: string | null;
    action: (response: any) => void;
    data: any
}

export interface IUpdateApi {
    url: string;
    token: string | null;
    action: (response: any) => void;
    data: any
}

export interface IDeleteApi {
    url: string;
    token: string | null;
    action: (response: any) => void;
    // id: number
}

export interface IUploadApi {
    url: string;
    token: string | null;
    action: (response: any) => void;
    data: any
}