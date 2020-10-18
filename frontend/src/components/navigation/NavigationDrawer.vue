<template>
<v-navigation-drawer class="nav-drawer" style="border-radius: 0 !important; height: 100vh;" v-model="drawer" :color="color" :expand-on-hover="expandOnHover" mobile-breakpoint="800" :mini-variant.sync="mini" :right="right" :permanent="drawer" fixed hide-overlay height="100%" dark>
    <v-list dense nav class="py-0">
        <v-list-item two-line :class="mini && 'px-0'">
            <v-list-item-avatar>
                <img draggable="false" :src="`${baseURI}${user.image}`" />
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{user.names}} {{user.lastNames}}</v-list-item-title>
                <v-list-item-subtitle>{{cappitalizeKeyword(user.role)}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item @click.stop="mini = true" v-for="item in items" :to="item.to" :key="item.title" link>
            <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>

</v-navigation-drawer>
</template>

<script>
import {
    mapState,
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            color: "primary",
            colors: ["primary", "blue", "success", "red", "teal"],
            right: false,
            permanent: true,
            mini: true,
            expandOnHover: false
        };
    },
    computed: {
        ...mapState({
            user: state => state.user,
            baseURI: state => state.baseURL,
            items: state => state.navUser
        }),
        ...mapGetters({
            menuDrawer: "getMenu"
        }),
        drawer: {
            get() {
                return this.menuDrawer;
            },
            set(newBool) {
                return newBool;
            }
        },
        bg() {
            return this.background ?
                "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg" :
                undefined;
        }
    },
    mounted() {
        const overlay = document.querySelector(".v-overlay");
        /* overlay.addEventListener('click', this.toggleMenu, true) */
    },
    methods: {
        cappitalizeKeyword(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        toggleMenu() {
            this.$store.commit("setMenuState", false);
        },
        signOut() {
            localStorage.removeItem("token");
            localStorage.removeItem("iat");
            this.$store.commit("setCurrentUser", null);
            this.$store.commit("setAuthToken", null);
            location.reload();
            this.$router.push('/login').catch(err => {})
        }
    }
};
</script>

<style>
.nav-drawer {
    top: 65px !important;
    border-top: 1px solid #fff3bf !important;
}

@media screen and (max-width: 959px) {
    .nav-drawer {
        top: 57px !important;
    }
}
</style>
