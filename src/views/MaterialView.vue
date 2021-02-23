<template>
    <v-container>
        <v-row>
            <v-col>
                <material-form
                    :materialId="materialId"
                    @updatedMaterialList="updateMaterialList()"
                ></material-form>
            </v-col>
            <v-col>
                <material-list
                    ref="materialListRef"
                    class="material-list-style"
                    :inverted="true"
                ></material-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MaterialForm from "@/components/MaterialForm";
import MaterialList from "@/components/MaterialList";
import Material from "@/entities/Material";

@Component({
    components: {
        MaterialForm,
        MaterialList,
    },
})
export default class MaterialView extends Vue {
    private material: Material = {
        id: 1,
        name: "Leite condensado",
        idBrand: 1,
        price: 6.97,
        quantity: 500,
        idUnit: 1,
        note:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel venenatis magna, et molestie turpis. Curabitur luctus hendrerit blandit. Pellentesque faucibus accumsan vestibulum. Nullam maximus dui in ante rhoncus fermentum. Nulla a consequat nulla, nec lacinia nibh. Nam congue risus diam, porta gravida leo scelerisque eu. Nunc at semper tellus. Duis ut tempor erat, quis interdum lacus. Aliquam at eros facilisis, volutpat nunc et, efficitur nunc.",
    } as Material;
    //material : Material = {} as Material;
    materialId = null;

    updateMaterialList() {
        debugger;
        const materialList: any = this.$refs.materialListRef;
        materialList.getMaterials();
    }
}
</script>

<style scoped lang="scss">
.material-list-style {
    height: 90vh;
}
</style>
