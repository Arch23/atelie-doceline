<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="4">
                <v-img
                    class="logo-full"
                    alt="Ateliê Doceline logo"
                    src="../resources/img/logo.png"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-button @click.stop="openS()">success</v-button>
                <v-button @click.stop="openI()">info</v-button>
                <v-button @click.stop="openW()">warning</v-button>
                <v-button @click.stop="openE()">error</v-button>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Alert from "@/components/Alert";

@Component({
    components:{
        Alert
    }
})
export default class Home extends Vue {
    openS() {
        console.log("success");
    }

    openI() {
        console.log("info");
    }

    openW() {
        console.log("warning");
    }

    openE() {
        console.log("error");
    }
}
</script>

<style scoped lang="scss">
.logo-full {
    width: 100%;
    height: 100%;
}
</style>
