import BusinessResponse from "@/entities/BusinessResponse";
import Api from "./Api";

export default class Rest extends Api {
    static resource = "";

    constructor(resource: string, options: any = {}) {
        super(Rest.normalize(Rest.base, resource), options);
    }

    static build() {
        return new this(this.resource);
    }

    create(model: any): Promise<BusinessResponse> {
        return this.post("", model);
    }

    readAll(): Promise<BusinessResponse> {
        return this.get("");
    }

    read(id: number): Promise<BusinessResponse> {
        return this.get(`/${id}`);
    }

    update(model: any): Promise<BusinessResponse> {
        return this.put("", model);
    }

    destroy(id: number): Promise<BusinessResponse> {
        return this.delete(`/${id}`);
    }
}
