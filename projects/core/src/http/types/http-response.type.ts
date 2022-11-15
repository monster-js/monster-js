import { CustomResponse } from "../interfaces/custom-response.interface";

export type HttpResponse<T> = Promise<CustomResponse<T>>;