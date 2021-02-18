import { Component, Prop, Vue } from "vue-property-decorator";
import BrandService from "@/services/BrandService";
import UnitService from "@/services/UnitService";
import Brand from "@/entities/Brand";
import Unit from "@/entities/Unit";
import Material from "@/entities/Material";
import { forkJoin } from 'rxjs';

const brandService = BrandService.build();
const unitService = UnitService.build();

@Component
export default class MaterialForm extends Vue {
    @Prop() materialModel !: Material 

    private isEdit = false;

    private isValid = false;
    private brands: Array<Brand> = [];
    
    private brandsForDisplay: Array<string> = [];
    private units: Array<Unit> = [];

    private selectedBrand = "";
    private selectedUnit: Unit = {} as Unit;
    private name = "";
    private price = 0.0;
    private quantity = 0;
    private notes = "";
    
    private saveButtonText = "Salvar";

    private title() : string {
        return this.isEdit?"Alterar matéria prima":"Nova matéria prima";
    }

    private nameRules = [
        (v: string) => !!v || "Nome obrigatório",
        (v: string) => (v && v.length >= 1 && v.length <= 255) || "Nome precisa ter entre 1 e 255 caracteres"
    ];

    private unitRules = [
        (v: Unit) => this.isUnitSelected() || "Unidade obrigatória"
    ];

    private quantityRules = [
        (v: number) => !!v || "Quantidade obrigatória"
    ];

    private priceRules = [
        (v: number) => !!v || "Preço obrigatório"
    ];

    private noteRules = [
        (v: string) => (v ? v.length <= 5000 : true) || "Observações precisa ter até 5000 caracteres"
    ];

    mounted() {
        forkJoin(
            [brandService.readAll(),
            unitService.readAll()]
        ).subscribe(([brandsResponse, unitsResponse]) => {
            if (brandsResponse.isValid) {
                this.brands = brandsResponse.result;
                this.brandsForDisplay = this.brands.map(brand => brand.title);
            }

            if (unitsResponse.isValid) {
                this.units = unitsResponse.result;
            }

            if (this.materialModel && Object.keys(this.materialModel).length !== 0) {
                this.isEdit = true;
    
                const brandTitle = this.brands.find(el => el.id === this.materialModel.idBrand)?.title;
                this.selectedBrand = brandTitle?brandTitle:"";
    
                const unit = this.units.find(el => el.id === this.materialModel.idUnit);
                this.selectedUnit = unit?unit:{} as Unit;
    
                this.name = this.materialModel.name?this.materialModel.name:"";
                this.price = this.materialModel.price?this.materialModel.price:0.0;
                this.quantity = this.materialModel.quantity?this.materialModel.quantity:0;
                this.notes = this.materialModel.note?this.materialModel.note:"";
            }
        });
        
        // this.getBrands();
        // this.getUnits();
        
    }

    private async setFieldsForEdit(promisses : Promise<any>[]) {
        await Promise.all(promisses);
        
        if (this.materialModel && Object.keys(this.materialModel).length !== 0) {
            this.isEdit = true;

            const brandTitle = this.brands.find(el => el.id === this.materialModel.idBrand)?.title;
            this.selectedBrand = brandTitle?brandTitle:"";

            const unit = this.units.find(el => el.id === this.materialModel.idUnit);
            this.selectedUnit = unit?unit:{} as Unit;

            this.name = this.materialModel.name?this.materialModel.name:"";
            this.price = this.materialModel.price?this.materialModel.price:0.0;
            this.quantity = this.materialModel.quantity?this.materialModel.quantity:0;
            this.notes = this.materialModel.note?this.materialModel.note:"";
        }
    }

    private getQuantitySuffix(): string {
        return this.isUnitSelected()? this.selectedUnit.abbreviation : "";
    }

    private isUnitSelected(): boolean {
        return this.selectedUnit && Object.keys(this.selectedUnit).length !== 0;
    }

    private getBrands(): void {
        brandService.readAll().then(response => {
            if (response.isValid) {
                this.brands = response.result;
                this.brandsForDisplay = this.brands.map(brand => brand.title);
            }
        });
    }

    private getUnits(): void {
        unitService.readAll().then(response => {
            if (response.isValid) {
                this.units = response.result;
            }
        });
    }

    private saveMaterial(): void {
        const form : any = this.$refs.materialForm;
        form.validate();
    }

    private resetForm(): void {
        const form : any = this.$refs.materialForm;
        form.reset();
    }
}
