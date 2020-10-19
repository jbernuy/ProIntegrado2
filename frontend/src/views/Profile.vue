<template>
  <div>
    <FormRegister :isCreate="false" :userEdited="user" />
  </div>
</template>

<script>
import FormRegister from "@/components/forms/FormRegister";
import { mapState } from "vuex";

export default {
    components: {
        FormRegister,
    },
    computed: {
        ...mapState({
            user: state => state.user,
        }),
    },

}
</script>

<style>

</style>