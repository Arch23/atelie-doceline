<template>
    <v-container>
        <v-row>
            <v-col>
                <material-form
                    @updatedMaterialList="updateMaterialList()"
                    @createdNewBrand="updateBrandList()"
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
    materialList : any;

    mounted(){
        this.materialList = this.$refs.materialListRef;
    }

    updateBrandList() {
        this.materialList.refreshBrandList();
    }

    updateMaterialList() {
        this.materialList.getMaterials();
    }
}
</script>

<style scoped lang="scss">
.material-list-style {
    height: 90vh;
}
</style>
