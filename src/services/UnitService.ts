import BusinessResponse from "@/entities/BusinessResponse";
import Unit from "@/entities/Unit";
import Http from "./base/Http";

export default class UnitService extends Http<Unit> {
    resource = "Unit";

    constructor() {
        super();
    }

    getAll(): Promise<BusinessResponse<Unit[]>> {
        return this.baseGetAll(this.resource);
    }

    get(id: number): Promise<BusinessResponse<Unit>> {
        return this.baseGet(this.resource, id);
    }

    post(model: Unit): Promise<BusinessResponse<number>> {
        return this.basePost(this.resource, model);
    }

    update(model: Unit): Promise<BusinessResponse<boolean>> {
        return this.baseUpdate(this.resource, model);
    }

    delete(id: number): Promise<BusinessResponse<boolean>> {
        return this.baseDelete(this.resource, id);
    }
}
