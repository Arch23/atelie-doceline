import Brand from "@/entities/Brand";
import BusinessResponse from "@/entities/BusinessResponse";
import Http from "./base/Http";

export default class BrandService extends Http<Brand> {
    resource = "Brand";

    constructor() {
        super();
    }

    getAll(): Promise<BusinessResponse<Brand[]>> {
        return this.baseGetAll(this.resource);
    }

    get(id: number): Promise<BusinessResponse<Brand>> {
        return this.baseGet(this.resource, id);
    }

    post(model: Brand): Promise<BusinessResponse<number>> {
        return this.basePost(this.resource, model);
    }

    update(model: Brand): Promise<BusinessResponse<boolean>> {
        return this.baseUpdate(this.resource, model);
    }

    delete(id: number): Promise<BusinessResponse<boolean>> {
        return this.baseDelete(this.resource, id);
    }
}
