import BusinessResponse from "@/entities/BusinessResponse";
import { AxiosInstance, AxiosResponse } from "axios";
import Api from "./Api";

export default class Http<T = any> {
    http: AxiosInstance;

    constructor() {
        this.http = Api;
    }

    baseGetAll(resource: string): Promise<BusinessResponse<T[]>> {
        return this.http.get(resource).then(this.then);
    }

    baseGet(resource: string, id: number): Promise<BusinessResponse<T>> {
        return this.http.get(`${resource}/${id}`).then(this.then);
    }

    basePost(resource: string, model: T): Promise<BusinessResponse<number>> {
        return this.http.post(resource, model).then(this.then);
    }

    baseUpdate(resource: string, model: T): Promise<BusinessResponse<boolean>> {
        return this.http.put(resource, model).then(this.then);
    }

    baseDelete(
        resource: string,
        id: number
    ): Promise<BusinessResponse<boolean>> {
        return this.http.delete(`${resource}/${id}`).then(this.then);
    }

    private then(response: AxiosResponse) {
        if (!response.data) {
            return {};
        }
        if (typeof response.data === "string") {
            return JSON.parse(response.data);
        }
        return response.data;
    }
}
