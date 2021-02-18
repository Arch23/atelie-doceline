import { Component, Vue } from "vue-property-decorator";
import NavigationDrawer from "../components/NavigationDrawer";

@Component({
    components: {
        NavigationDrawer,
    },
})
export default class App extends Vue {
    private drawerToggle = false;

    get isLoading(): boolean {
        return this.$store.getters.loading;
    }
}
