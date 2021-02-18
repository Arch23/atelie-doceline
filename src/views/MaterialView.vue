<template>
    <div>
        <!-- <material-form :materialModel="material"></material-form> -->
        <material-card :materialModel="material"></material-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MaterialForm from "@/components/MaterialForm";
import MaterialCard from "@/components/MaterialCard";
import Material from "@/entities/Material";

@Component({
    components: {
        MaterialForm,
        MaterialCard
    },
})
export default class MaterialView extends Vue {
    private material : Material = {
        id: 1,
        name: "Leite condensado",
        idBrand: 1,
        price: 6.97,
        quantity: 500,
        idUnit: 1,
        note: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel venenatis magna, et molestie turpis. Curabitur luctus hendrerit blandit. Pellentesque faucibus accumsan vestibulum. Nullam maximus dui in ante rhoncus fermentum. Nulla a consequat nulla, nec lacinia nibh. Nam congue risus diam, porta gravida leo scelerisque eu. Nunc at semper tellus. Duis ut tempor erat, quis interdum lacus. Aliquam at eros facilisis, volutpat nunc et, efficitur nunc."
    } as Material;
}
</script>

<style scoped lang="scss"></style>
