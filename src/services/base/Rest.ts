import Api from "./Api";

export default class Rest extends Api {
    static resource : string = "";

    constructor(resource : string, options : any = {}) {
        super(Rest.normalize(Rest.base, resource), options);
    };

    static build() {
        return new this(this.resource);
    };

    create(model : any) : Promise<any> {
        return this.post('', model);
    };

    readAll() : Promise<any> {
        return this.get('');
    };

    read(id : number) : Promise<any> {
        return this.get(`/${id}`);
    };

    update(model : any) : Promise<any> {
        return this.put('', model);
    };

    destroy(id : number) : Promise<any> {
        return this.delete(`/$id`);
    };
}