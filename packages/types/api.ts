export type BaseResponse<T = null> = {
    data?: T;
    message: string;
    meta?: {
        pagination: Pagination
    }
    error?: any
};

export type RequestQueryParams = {
    [key: string]: string
} & Pagination;

export type Pagination = {
    page?: number;
    totalPage?: number;
    totalItem?: number;
    limit?: number;
}

export type AuthRequest = {
    email: string;
    password: string;
}