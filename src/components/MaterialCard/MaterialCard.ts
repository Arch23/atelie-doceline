import { Component, Prop, Vue } from "vue-property-decorator";
import Material from "@/entities/Material";
import BrandService from "@/services/BrandService";
import UnitService from "@/services/UnitService";
import Brand from "@/entities/Brand";
import Unit from "@/entities/Unit";

const brandService = new BrandService();
const unitService = new UnitService();

@Component
export default class MaterialCard extends Vue {
    @Prop({ required: true }) materialModel!: Material;
    @Prop() brandList!: Brand[];
    @Prop() unitList!: Unit[];
    @Prop({ required: false, default: false }) isHoverActive!: boolean;

    selectedBrand: Brand = {} as Brand;
    selectedUnit: Unit = {} as Unit;

    expandNote = false;

    get cardName(): string {
        return `${this.materialModel.id} - ${this.materialModel.name}`;
    }

    get getQuantitySuffix(): string {
        return this.selectedUnit.abbreviation;
    }

    mounted() {
        if (this.brandList && this.unitList) {
            this.setSelectedModels(this.brandList, this.unitList);
        } else {
            Promise.all([brandService.getAll(), unitService.getAll()]).then(
                ([brandsResponse, unitsResponse]) => {
                    let brands: Brand[] = [];
                    let units: Unit[] = [];

                    if (brandsResponse.isValid) {
                        brands = brandsResponse.result;
                    }

                    if (unitsResponse.isValid) {
                        units = unitsResponse.result;
                    }

                    this.setSelectedModels(brands, units);
                }
            );
        }
    }

    setSelectedModels(brandList: Brand[], unitList: Unit[]) {
        const brand = brandList.find(
            el => el.id === this.materialModel.idBrand
        );
        this.selectedBrand = brand ? brand : ({} as Brand);

        const unit = unitList.find(el => el.id === this.materialModel.idUnit);
        this.selectedUnit = unit ? unit : ({} as Unit);
    }
}
