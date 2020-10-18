<template>
<div class="home">
    <div v-if="user">
        <v-app-bar fixed color="primary" dark>
            <v-container>
                <v-row>
                    <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
                    <v-toolbar-title class="my-auto" style="color: orange;">{{titleApp}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn dark @click="signOut" icon>
                        <i class="material-icons">power_settings_new</i>
                    </v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
        <div class="main-section">
            <NavigationDrawer />
            <v-main>
                <v-container class="mt-12">
                    <v-flex shrink class="mt-5">
                        <router-view></router-view>
                    </v-flex>
                </v-container>
            </v-main>
        </div>
    </div>
    <div v-else>
        <v-container>
            <v-alert type="error">Sesión culmidada! Actualiza la pagina para volver a ingresar</v-alert>
        </v-container>
    </div>
</div>
</template>

<script>
import NavigationDrawer from "@/components/navigation/NavigationDrawer";
import {
    mapState
} from "vuex";

export default {
    name: "Home",
    components: {
        NavigationDrawer
    },
    data: () => ({
        interval: null
    }),
    computed: {
        ...mapState({
            user: state => state.user,
            role: state => state.user.role,
            titleApp: state => state.titleApp,
        })
    },
    async mounted() {
        await this.getDataByRoleUser(this.user.role);
    },
    methods: {
        signOut() {
            localStorage.removeItem("token");
            localStorage.removeItem("iat");
            this.$store.commit("setCurrentUser", null);
            this.$store.commit("setAuthToken", null);
            location.reload();
            this.$router.push("/login").catch(err => {});
        },
        async getDataByRoleUser(role) {
            this.$store.dispatch("getAllDegrees");
            switch (role) {
                case "administrador":
                    await this.$store.dispatch("getAllCourses");
                    await this.$store.dispatch("getAllDegrees");
                    await this.$store.dispatch("getUsers");
                    break;
                case "docente":
                    await this.$store.dispatch("getClassroomByUserId");
                    //getClassroomByUserId
                    break;
                case "alumno":
                    await this.$store.dispatch("getClassroomByUserId");
                    break;
            }
            /* this.verifyTimeExpiresToken(); */
        },
        async verifyTimeExpiresToken() {
            this.interval = setInterval(async () => {
                try {
                    if (
                        localStorage.getItem("iat") - Date.now() <= 60000 &&
                        localStorage.getItem("iat") - Date.now() > 0
                    ) {
                        console.log("renovando token");
                        clearInterval(this.interval);
                        const res = await this.$store.dispatch("refreshedToken"); //renovamos el token
                        if (res) {
                            this.verifyTimeExpiresToken(); // volvemos a ejecutar recursivamente la función
                        } else {
                            this.redirectLogin();
                        }
                    } else if (localStorage.getItem("iat") - Date.now() <= 0) {
                        this.redirectLogin();
                    }
                } catch (error) {}
            }, 5000);
        },
        redirectLogin() {
            this.$store.dispatch("logout");
            this.$router.push("/login").catch(err => {});
            clearInterval(this.interval);
        },
        toggleMenu() {
            this.$store.commit("setMenuState", !this.$store.state.menu);
        }
    }
};
</script>

<style lang="scss">
.navbar-project {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

.main-content {
    width: 100%;
    min-height: 100vh;
    padding-top: 80px;
}

.main-section {
    display: flex;
}
</style>
