export default interface Material {
    id: number;
    name: string;
    idBrand: number | undefined;
    price: number;
    quantity: number;
    idUnit: number;
    note: string;
    createDate: Date | undefined;
    alterDate: Date | undefined;
}
