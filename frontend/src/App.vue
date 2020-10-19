<template>
<v-app class="app-integrador">
    <router-view></router-view>
</v-app>
</template>

<script>
import "material-icons/iconfont/material-icons.scss";

export default {
    name: "App",
    data: () => ({
        //
    }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Overpass:wght@100;200;300;400;600;700;800;900&display=swap");

label,
.app-integrador,
button,
.theme--dark.v-input input,
.theme--dark.v-input textarea,
.theme--light.v-input input,
.theme--light.v-input textarea,
.v-alert__content,
.v-select__selections {
    font-family: "Overpass" !important;
    font-weight: 300 !important;
}

.swal2-title,
.swal2-content,
.swal2-actions button {
    font-family: "Overpass" !important;
}

label,
.v-alert__content,
.v-select__selections {
    font-size: 14px !important;
}

.theme--dark.v-input input,
.theme--dark.v-input textarea,
.theme--light.v-input input,
.theme--light.v-input textarea {
    font-size: 13px !important;
}

.bg-primary {
    background: rgb(6, 36, 62) !important;
}

.bg-secondary {
    background: rgb(255, 243, 191) !important;
}

.bg-muted {
    background: #eee !important;
}

.border-muted {
    border-color: rgba(0, 0, 0, .1) !important;
}

.border-primary {
    color: rgb(6, 36, 62) !important;
}

.color-primary {
    color: rgb(6, 36, 62) !important;
}

.color-secondary {
    color: rgb(255, 243, 191) !important;
}

.flex-header-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title-section {
    font-weight: 700;
    color: #06243e;
    font-size: 20px;
    margin: 15px 0;
}

@media screen and (max-width: 500px) {
    .title-section {
        font-size: 17px;
    }
}

button {
    outline: none !important;
}

.a:hover,
.v-list-item.v-list-item--link.theme--dark,
.v-list-item.v-list-item--link.theme--dark:hover,
.v-list-item.v-list-item--link.theme--light,
.v-list-item.v-list-item--link.theme--light:hover,
.v-btn.v-btn--flat.v-btn--text.v-size--default:hover,
.app-integrador a:hover {
    text-decoration: none !important;
}
</style>
