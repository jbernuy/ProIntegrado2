<template>
<v-card v-if="user" width="700" elevation="1">
    <v-toolbar flat dark color="primary">
        <v-toolbar-title>{{cappitalizeKeyword(user.role)}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!isIndex" icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
    <v-card-text>
        <v-row align="end" class="fill-height">
            <v-col align-self="start" class="d-flex flex-column" cols="12" lg="5" md="5" sm="5">
                <v-avatar class="profile mx-auto" color="grey" size="164">
                    <v-img :src="`${baseURI}${user.image}`"></v-img>
                </v-avatar>
                <v-list-item color="rgba(0, 0, 0, .4)">
                    <v-list-item-content class="text-center">
                        <v-list-item-title>{{user.names}} {{user.lastNames}}</v-list-item-title>
                        <v-list-item-subtitle>{{ cappitalizeKeyword(user.role) }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col align-self="start" cols="12" lg="7" md="7" sm="7">
                <v-list-item color="rgba(0, 0, 0, .8)">
                    <v-list-item-content>
                        <v-list-item-subtitle><strong>Domicilio: </strong> {{user.address}} </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item color="rgba(0, 0, 0, .8)">
                    <v-list-item-content>
                        <v-list-item-subtitle><strong>Correo: </strong> {{user.email}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item color="rgba(0, 0, 0, .8)">
                    <v-list-item-content>
                        <v-list-item-subtitle><strong>Telefono: </strong> {{user.phone}} </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item color="rgba(0, 0, 0, .8)">
                    <v-list-item-content>
                        <v-list-item-subtitle><strong>Código: </strong> {{user.accessCode}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item color="rgba(0, 0, 0, .8)">
                    <v-chip dark small :color="getColorActive(user.active)">
                        {{getStatus(user.active)}}
                    </v-chip>
                </v-list-item>
                <v-list-item v-if="!isIndex" color="rgba(0, 0, 0, .8)">
                    <v-switch v-model="user.active" :label="`${getStatus(user.active)}`"></v-switch>
                </v-list-item>
            </v-col>
        </v-row>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="!isIndex" color="primary" :loading="loading" :disabled="isChanged" @click="updateActive(user)" text>Guardar</v-btn>
    </v-card-actions>

</v-card>
</template>

<script>
import Swal from 'sweetalert2';
import {
    mapState
} from 'vuex';

export default {
    props: {
        userEdited: Object,
        isIndex: Boolean
    },
    data: () => ({
        loading: false,
        user: null
    }),
    computed: {
        ...mapState({
            baseURI: state => state.baseURL
        }),
        isChanged() {
            if (this.userEdited.active === this.user.active || this.loading) return true;
            return false;
        }
    },
    mounted() {
        if (this.userEdited) {
            this.user = {
                ...this.userEdited
            };
        }
    },
    methods: {
        cappitalizeKeyword(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getStatus(bool) {
            if (bool) return 'Activo';
            return 'Inactivo'
        },
        getColorActive(bool) {
            if (bool) return 'primary';
            return 'orange'
        },
        closeDialog() {
            this.$emit('closeDialog')
        },
        async updateActive(user) {
            this.loading = true;
            const FORM_USER = new FormData();
            FORM_USER.append('user', JSON.stringify(user));
            const res = await this.$store.dispatch('updateUser', {
                formData: FORM_USER,
                _id: user._id
            });
            if (user.active) {
                await this.$store.dispatch('addClassroom', {
                    degreeCode: user.accessCode.split('-')[1],
                });
                await this.$store.dispatch('addUserToClassroom', {
                    userId: user._id
                });
            }
            if (res.status != 200) {
                this.loading = false;
                return Swal.fire('Oops', `${res.data.msg}`, 'error');
            }
            this.loading = false;
            this.closeDialog();
            return Swal.fire('Bien!', `${res.data.msg}`, 'success');
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
