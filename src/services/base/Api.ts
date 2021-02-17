import Http from "./Http";

export default class Api extends Http {
    static base: string = "";

    static build(path : string = "", options : any = {} ) : any {
        return new this(Api.normalize(Api.base, path), options);
    }
}