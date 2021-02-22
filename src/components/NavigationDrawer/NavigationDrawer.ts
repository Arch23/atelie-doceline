import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class NavigationDrawer extends Vue {
    @Prop({required: true}) changeToggle !: boolean; 
    
    private drawerToggle = false;

    private routes: Array<object> = [
        {
            icon: "mdi-home ",
            to: "/",
            name: "Home",
        },
        {
            icon: "mdi-package-variant ",
            to: "/material",
            name: "Materia Prima",
        },
    ];

    private goTo(route: string) {
        if (this.$route.path !== route) {
            this.drawerToggle = false;
            this.$router.push(route);
        }
    }

    @Watch('changeToggle')
    toggleDrawer(newVal: boolean, oldVal: boolean) {
        this.drawerToggle = !this.drawerToggle;
    }
}
