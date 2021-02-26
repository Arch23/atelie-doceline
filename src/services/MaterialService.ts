import BusinessResponse from "@/entities/BusinessResponse";
import Material from "@/entities/Material";
import Http from "./base/Http";

export default class MaterialService extends Http<Material> {
    resource = "Material";

    constructor() {
        super();
    }

    getAll(): Promise<BusinessResponse<Material[]>> {
        return this.baseGetAll(this.resource);
    }

    get(id: number): Promise<BusinessResponse<Material>> {
        return this.baseGet(this.resource, id);
    }

    post(model: Material): Promise<BusinessResponse<number>> {
        return this.basePost(this.resource, model);
    }

    update(model: Material): Promise<BusinessResponse<boolean>> {
        return this.baseUpdate(this.resource, model);
    }

    delete(id: number): Promise<BusinessResponse<boolean>> {
        return this.baseDelete(this.resource, id);
    }
}
