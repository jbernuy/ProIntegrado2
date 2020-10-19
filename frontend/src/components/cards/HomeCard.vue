<template>
<v-card color="primary" dark class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
        <v-list-item-avatar size="60" tile>
            <v-img :src="card.img" aspect-ratio="1.7"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="headline mt-1 text-right">{{card.cant()}}</v-list-item-title>
            <div class="overline mb-0 text-right">{{card.name()}}</div>
        </v-list-item-content>

    </v-list-item>

    <v-card-actions>
        <v-spacer></v-spacer>
        <router-link :to="card.redirectTo()" class="v-btn v-btn--flat v-btn--text theme--dark v-size--default">
            Ver
        </router-link>
    </v-card-actions>
</v-card>
</template>

<script>
export default {
    props: {
        card: Object
    }
}
</script>

<style lang="scss" scoped>

</style>
