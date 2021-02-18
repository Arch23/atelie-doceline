import Http from "./Http";

export default class Api extends Http {
    static base = "api";

    static build(path = "", options: any = {}): any {
        return new this(Api.normalize(Api.base, path), options);
    }
}
