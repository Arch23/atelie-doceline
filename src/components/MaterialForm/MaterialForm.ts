import { Component, Prop, Vue } from "vue-property-decorator";
import BrandService from "@/services/BrandService";
import UnitService from "@/services/UnitService";
import Brand from "@/entities/Brand";
import Unit from "@/entities/Unit";
import Material from "@/entities/Material";
import { forkJoin } from "rxjs";
import MaterialService from "@/services/MaterialService";

const brandService = BrandService.build();
const unitService = UnitService.build();
const materialService = MaterialService.build();

@Component
export default class MaterialForm extends Vue {
    @Prop({ required: false, default: 0 }) materialId!: number;

    materialModel: Material = {} as Material;

    isEdit = false;

    isValid = false;
    brands: Array<Brand> = [];

    brandsForDisplay: Array<string> = [];
    units: Array<Unit> = [];

    selectedBrand = "";
    selectedUnit: Unit = {} as Unit;

    saveButtonText = "Salvar";

    title(): string {
        return this.isEdit ? "Alterar matéria prima" : "Nova matéria prima";
    }

    nameRules = [
        (v: string) => !!v || "Nome obrigatório",
        (v: string) =>
            (v && v.length >= 1 && v.length <= 255) ||
            "Nome precisa ter entre 1 e 255 caracteres",
    ];

    unitRules = [(v: Unit) => this.isUnitSelected() || "Unidade obrigatória"];

    quantityRules = [(v: number) => !!v || "Quantidade obrigatória"];

    priceRules = [(v: number) => !!v || "Preço obrigatório"];

    noteRules = [
        (v: string) =>
            (v ? v.length <= 5000 : true) ||
            "Observações precisa ter até 5000 caracteres",
    ];

    mounted() {
        Promise.all([brandService.readAll(), unitService.readAll()]).then(
            ([brandsResponse, unitsResponse]) => {
                this.afterPromiseAll(brandsResponse, unitsResponse);
            }
        );
    }

    afterPromiseAll(brandsResponse: any, unitsResponse: any) {
        if (brandsResponse.isValid) {
            this.brands = brandsResponse.result;
            this.brandsForDisplay = this.brands.map(brand => brand.title);
        }

        if (unitsResponse.isValid) {
            this.units = unitsResponse.result;
        }

        if (!!this.materialId && this.materialId !== 0) {
            this.isEdit = true;

            materialService.read(this.materialId).then(response => {
                if (response.isValid) {
                    this.materialModel = response.result;

                    const brandTitle = this.brands.find(
                        el => el.id === this.materialModel.idBrand
                    )?.title;
                    this.selectedBrand = brandTitle ? brandTitle : "";

                    const unit = this.units.find(
                        el => el.id === this.materialModel.idUnit
                    );
                    this.selectedUnit = unit ? unit : ({} as Unit);
                }
            });
        } else {
            this.materialModel = {} as Material;
        }
    }

    getQuantitySuffix(): string {
        return this.isUnitSelected() ? this.selectedUnit.abbreviation : "";
    }

    isUnitSelected(): boolean {
        return this.selectedUnit && Object.keys(this.selectedUnit).length !== 0;
    }

    getBrands(): void {
        brandService.readAll().then(response => {
            if (response.isValid) {
                this.brands = response.result;
                this.brandsForDisplay = this.brands.map(brand => brand.title);
            }
        });
    }

    getUnits(): void {
        unitService.readAll().then(response => {
            if (response.isValid) {
                this.units = response.result;
            }
        });
    }

    saveMaterial(): void {
        const form: any = this.$refs.materialForm;
        form.validate();

        this.materialModel.idBrand = this.brands.find(
            el => el.title === this.selectedBrand
        )?.id;

        this.materialModel.idUnit = this.selectedUnit.id;

        if (this.isEdit) {
            this.updateMaterial(this.materialModel);
        } else {
            this.createMaterial(this.materialModel);
        }
    }

    resetForm(): void {
        const form: any = this.$refs.materialForm;
        form.reset();
    }

    createMaterial(materialModel: Material): void {
        materialService.create(materialModel).then(response => {
            if (response.isValid) {
                this.$toast.open({
                    message: "Matéria-prima criada com sucesso!",
                });

                this.$emit("updatedMaterialList");
            }
        });
    }

    updateMaterial(materialModel: Material): void {
        materialService.update(this.materialModel).then((response: any) => {
            if (response.isValid) {
                this.$toast.open({
                    message: "Matéria-prima alterada com sucesso!",
                });

                this.$emit("updatedMaterialList");
            }
        });
    }
}
