import BusinessResponse from "@/entities/BusinessResponse";
import UnitGroup from "@/entities/UnitGroup";
import Http from "./base/Http";

export default class UnitGroupService extends Http<UnitGroup> {
    resource = "UnitGroup";

    constructor() {
        super();
    }

    getAll(): Promise<BusinessResponse<UnitGroup[]>> {
        return this.baseGetAll(this.resource);
    }

    get(id: number): Promise<BusinessResponse<UnitGroup>> {
        return this.baseGet(this.resource, id);
    }

    post(model: UnitGroup): Promise<BusinessResponse<number>> {
        return this.basePost(this.resource, model);
    }

    update(model: UnitGroup): Promise<BusinessResponse<boolean>> {
        return this.baseUpdate(this.resource, model);
    }

    delete(id: number): Promise<BusinessResponse<boolean>> {
        return this.baseDelete(this.resource, id);
    }
}
