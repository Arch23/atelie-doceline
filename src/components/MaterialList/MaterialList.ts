import { Component, Prop, Vue } from "vue-property-decorator";
import MaterialCard from "@/components/MaterialCard";
import MaterialService from "@/services/MaterialService";
import BrandService from "@/services/BrandService";
import UnitService from "@/services/UnitService";
import Material from "@/entities/Material";
import Brand from "@/entities/Brand";
import Unit from "@/entities/Unit";

const materialService = new MaterialService();
const brandService = new BrandService();
const unitService = new UnitService();

@Component({
    components: {
        MaterialCard,
    },
})
export default class MaterialList extends Vue {
    @Prop({ required: false, default: false }) inverted!: boolean;

    materialList: Material[] = [];
    brandList: Brand[] = [];
    unitList: Unit[] = [];
    search = "";

    mounted() {
        Promise.all([
            materialService.getAll(),
            unitService.getAll(),
            brandService.getAll(),
        ]).then(([materialResponse, unitResponse, brandResponse]) => {
            this.afterPromiseAll(materialResponse, unitResponse, brandResponse);
        });
    }

    afterPromiseAll(
        materialResponse: any,
        unitResponse: any,
        brandResponse: any
    ) {
        if (materialResponse.isValid) {
            this.materialList = materialResponse.result;
        }
        if (unitResponse.isValid) {
            this.unitList = unitResponse.result;
        }
        if (brandResponse.isValid) {
            this.brandList = brandResponse.result;
        }
    }

    refreshMaterialList(): void {
        this.getMaterials();
    }

    refreshBrandList(): void {
        this.getMaterials();
    }

    getMaterials() {
        materialService.getAll().then((materialResponse: any) => {
            if (materialResponse.isValid) {
                this.materialList = materialResponse.result;
            }
        });
    }

    getBrands() {
        brandService.getAll().then((brandResponse: any) => {
            if (brandResponse.isValid) {
                this.brandList = brandResponse.result;
            }
        });
    }

    materialFilter(material: Material): boolean {
        if (this.search.length === 0) {
            return true;
        }
        const id = Number.parseInt(this.search);

        const materialBrand = this.brandList.find(
            (brand: Brand) => brand.id === material.idBrand
        );
        return (
            material.name.toLowerCase().includes(this.search.toLowerCase()) ||
            (!!materialBrand &&
                materialBrand.title
                    .toLowerCase()
                    .includes(this.search.toLowerCase())) ||
            (!Number.isNaN(id) && id === material.id)
        );
    }
}
