import { Component, Prop, Vue } from "vue-property-decorator";
import BrandService from "@/services/BrandService";
import UnitService from "@/services/UnitService";
import Brand from "@/entities/Brand";
import Unit from "@/entities/Unit";
import Material from "@/entities/Material";
import MaterialService from "@/services/MaterialService";
import BusinessResponse from "@/entities/BusinessResponse";
import Helper from "@/common/Helper";

const brandService = new BrandService();
const unitService = new UnitService();
const materialService = new MaterialService();

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

    unitRules = [() => this.isUnitSelected() || "Unidade obrigatória"];

    quantityRules = [(v: number) => !!v || "Quantidade obrigatória"];

    priceRules = [(v: number) => !!v || "Preço obrigatório"];

    noteRules = [
        (v: string) =>
            (v ? v.length <= 5000 : true) ||
            "Observações precisa ter até 5000 caracteres",
    ];

    mounted() {
        Promise.all([brandService.getAll(), unitService.getAll()]).then(
            ([brandsResponse, unitsResponse]) => {
                this.afterPromiseAll(brandsResponse, unitsResponse);
            }
        ).catch(err => {
            this.$toast.open({
                type: "error",
                message: 'Erro ao inicializar página de matérias-primas!<br/>'+err
            });
        });
    }

    afterPromiseAll(brandsResponse: BusinessResponse, unitsResponse: BusinessResponse) {
        if (brandsResponse.isValid) {
            this.brands = brandsResponse.result;
            this.brandsForDisplay = this.brands.map(brand => brand.title);
        }

        if (unitsResponse.isValid) {
            this.units = unitsResponse.result;
        }

        if (!!this.materialId && this.materialId !== 0) {
            this.isEdit = true;

            materialService.get(this.materialId).then(response => {
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

    saveMaterial(): void {
        const form: any = this.$refs.materialForm;
        if(!form.validate())
            return
        debugger;
        if (this.selectedBrand && this.selectedBrand.trim() !== "" && !this.checkIfBrandAlreadyExists()) {
            brandService.post({ title: this.selectedBrand } as Brand).then(
                (response: BusinessResponse) => {
                    if (response.isValid && response.result !== 0) {
                        brandService.getAll().then(
                            (response: BusinessResponse) => {
                                if (response.isValid) {
                                    this.brands = response.result;
                                    this.brandsForDisplay = this.brands.map(brand => brand.title);

                                    this.$toast.open({
                                        message: "Marca cadastrada com sucesso!",
                                    });

                                    this.$emit("createdNewBrand");

                                    this.materialModel.idBrand = this.brands.find(
                                        el => el.title === this.selectedBrand
                                    )?.id;

                                    this.materialModel.idUnit = this.selectedUnit.id;

                                    if (this.isEdit) {
                                        this.updateMaterial(this.materialModel);
                                    } else {
                                        this.createMaterial(this.materialModel);
                                    }
                                } else {
                                    this.$toast.open({
                                        type: "error",
                                        message: `Erro ao carregar lista de marcas!<br/>${Helper.formatErrors(response)}`
                                    });
                                }
                            }
                        ).catch(err => {
                            this.$toast.open({
                                type: "error",
                                message: 'Erro ao carregar marcas!<br/>'+err
                            });
                        });
                    } else {
                        this.$toast.open({
                            type: "error",
                            message: `Erro ao cadastrar nova marca!<br/>${Helper.formatErrors(response)}`
                        });
                    }
                }
            ).catch(err => {
                this.$toast.open({
                    type: "error",
                    message: 'Erro ao cadastrar nova marca!<br/>'+err
                });
            });
        } else {
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
    }

    checkIfBrandAlreadyExists(): boolean {
        return this.brands.findIndex(brand => brand.title === this.selectedBrand) !== -1;
    }

    resetForm(): void {
        const form: any = this.$refs.materialForm;
        form.reset();
    }

    createMaterial(materialModel: Material): void {
        materialService.post(materialModel).then(response => {
            if (response.isValid) {
                this.resetForm();

                this.$toast.open({
                    message: "Matéria-prima criada com sucesso!",
                });

                this.$emit("updatedMaterialList");
            } else {
                this.$toast.open({
                    type: "error",
                    message: `Erro criar matéria-prima!<br/>${Helper.formatErrors(response)}`
                });
            }
        }).catch(err => {
            this.$toast.open({
                type: "error",
                message: 'Erro ao cadastrar nova matéria-prima!<br/>'+err
            });
        });
    }

    updateMaterial(materialModel: Material): void {
        materialService.update(materialModel).then((response: any) => {
            if (response.isValid) {
                this.resetForm();

                this.$toast.open({
                    message: "Matéria-prima alterada com sucesso!",
                });

                this.$emit("updatedMaterialList");
            } else {
                this.$toast.open({
                    type: "error",
                    message: `Erro ao atualizar matéria-prima!<br/>${Helper.formatErrors(response)}`
                });
            }
        }).catch(err => {
            this.$toast.open({
                type: "error",
                message: 'Erro ao atualizar matéria-prima!<br/>'+err
            });
        });
    }
}
