import store from "@/store";
import axios from "axios";

export default class Http {
    private path: string;
    private http: any;

    options: any;

    constructor (path: string, options: any = {}) {
        this.options = options;
        this.path = path;
        this.http = axios.create({
            baseURL: "https://localhost:44368",
            timeout: 10,
            transformResponse: [
                function (data) {
                    return data;
                }
            ] 
         });
    };

    static build (path: string, options: any): any {
        return new this(path, options);
    };

    get(url: string) : Promise<any> {
        store.dispatch('beginLoading');
        return this.http
            .get(Http.normalize(this.path, url))
            .then(Http.then);;
    };

    post(url: string, data: Object) : Promise<any> {
        return this.http
            .post(Http.normalize(this.path, url), data)
            .then(Http.then);
    }

    put (url: string, data: Object) : Promise<any> {
        return this.http
          .put(Http.normalize(this.path, url), data)
          .then(Http.then)
    }

    delete(url: string) : Promise<any> {
        return this.http
            .delete(Http.normalize(this.path, url))
            .then(Http.then)
    }

    static then(response: any) : any{
        store.dispatch('endLoading');
        if(!response.data) {
            return {};
        }
        return typeof(response.data === "string") ? JSON.parse(response.data) : response.data;
    };

    static normalize (start: string, end: string) : string {
        return `${start}/${end}`.replace(/([^:]\/)\/+/g, '$1');
    };
}