import { Component, Vue } from "vue-property-decorator";
import MaterialCard from "@/components/MaterialCard";
import MaterialService from "@/services/MaterialService";
import BrandService from "@/services/BrandService";
import UnitService from "@/services/UnitService";
import Material from "@/entities/Material";
import Brand from "@/entities/Brand";
import Unit from "@/entities/Unit";
import { forkJoin } from 'rxjs';

const materialService = MaterialService.build();
const brandService = BrandService.build();
const unitService = UnitService.build();

@Component({
    components: {
        MaterialCard
    }
})
export default class MaterialList extends Vue {
    private materialList : Material[] = [];
    private brandList: Brand[] = [];
    private unitList: Unit[] = [];
    private search = "";

    mounted() {
        forkJoin([materialService.readAll(),unitService.readAll(),brandService.readAll()])
        .subscribe(([materialResponse,unitResponse,brandResponse]) => {
            if(materialResponse.isValid) {
                this.materialList = materialResponse.result;
            }
            if(unitResponse.isValid) {
                this.unitList = unitResponse.result;
            }
            if(brandResponse.isValid) {
                this.brandList = brandResponse.result;
            }
        });
    };

    refreshMaterialList() : void {
        this.getMaterials();
    };

    getMaterials() {
        materialService.readAll().then((materialResponse: any) => {
            if(materialResponse.isValid) {
                this.materialList = materialResponse.result;
            }
        })
    };

    materialFilter(material: Material) : boolean {
        if(this.search.length === 0) {
            return true;
        }
        const id = Number.parseInt(this.search);
        
        const materialBrand = this.brandList.find((brand: Brand) => brand.id === material.idBrand);
        return (material.name.toLowerCase().includes(this.search.toLowerCase()) 
            || (!!materialBrand && materialBrand.title.toLowerCase().includes(this.search.toLowerCase())))
            || (!Number.isNaN(id) && id===material.id);
    }
}
