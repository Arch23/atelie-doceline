export default interface BusinessResponse<T = any> {
    isValid: boolean;
    errors: string[];
    result: T;
}
