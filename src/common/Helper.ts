import BusinessResponse from "@/entities/BusinessResponse";

export default class Helper {
    static formatErrors(businessResponse : BusinessResponse): string{
        return businessResponse.errors.join("<br/>");
    }
}