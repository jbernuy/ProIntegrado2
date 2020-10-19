<template>
<div class="home-i">
    <v-row>
        <v-col v-for="(item, idx) in cards" :key="idx" cols="12" lg="3" md="4" sm="6">
            <HomeCard :card="item" />
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12" lg="6" md="6" sm="6">
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="6">
            <CardUser :userEdited="user" :isIndex="true" />
        </v-col>
    </v-row>
</div>
</template>

<script>
import HomeCard from '@/components/cards/HomeCard';
import CardUser from '@/components/cards/CardUser';
import homeCards from '@/constants/homeCards';
import {
    mapState
} from 'vuex';
export default {
    components: {
        HomeCard,
        CardUser
    },
    data: () => ({

    }),
    computed: {
        ...mapState({
            role: state => state.user.role,
            user: state => state.user,
            cards: state => homeCards[`${state.user.role}`](),
        })
    }
}
</script>

<style>

</style>
