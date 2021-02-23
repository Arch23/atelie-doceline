import BusinessResponse from "@/entities/BusinessResponse";
import store from "@/store";
import axios from "axios";
import Vue from "vue";
import interceptorsSetup from "@/helpers/interceptor";


export default class Http {
    private path: string;
    private http: any;

    options: any;

    constructor(path: string, options: any = {}) {
        this.options = options;
        this.path = path;
        this.http = axios.create({
            baseURL: "https://localhost:44368",
            timeout: 1000,
            transformResponse: [
                function(data) {
                    return data;
                },
            ],
        });

        interceptorsSetup();
    }

    static build(path: string, options: any): any {
        return new this(path, options);
    }

    get(url: string): Promise<BusinessResponse> {
        return this.http.get(Http.normalize(this.path, url)).then(Http.then).catch(Http.catch);
    }

    post(url: string, data: any): Promise<BusinessResponse> {
        return this.http
            .post(Http.normalize(this.path, url), data)
            .then(Http.then).catch(Http.catch);
    }

    put(url: string, data: any): Promise<BusinessResponse> {
        return this.http
            .put(Http.normalize(this.path, url), data)
            .then(Http.then).catch(Http.catch);
    }

    delete(url: string): Promise<BusinessResponse> {
        store.dispatch("beginLoading");
        return this.http.delete(Http.normalize(this.path, url)).then(Http.then).catch(Http.catch);
    }

    static then(response: any): any {
        if (!response.data) {
            return {};
        }
        return typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;
    }

    static catch(response: any) : void {
        Vue.$toast.open({
            message: response.message,
            type: 'error',
            duration: 0
        });
    }

    static normalize(start: string, end: string): string {
        return [start, end]
            .join("/")
            .replace("//", "/")
            .replace(/\/\s*$/gm, "");
    }
}
