import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NavigationDrawer extends Vue {
    @Prop({ required: true, type: Boolean }) private drawerToggle!: boolean;

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
            this.$router.push(route);
        }
    }
}
