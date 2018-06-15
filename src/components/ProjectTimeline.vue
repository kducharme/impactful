<template>
    <div class="timeline">
        <div class="feature__title">
            <h4>Project updates <span>({{ newUpdates }} new)</span></h4>
        </div>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from "vuex";
    
    export default {
        name: "timeline",
        data() {
            return {
                newUpdates: 2
            };
        },
        computed: {
            ...mapState(["projects"])
        }
    };
</script>

<style lang='scss'>
    @import "../styles/variables";
    @import "../styles/mixins";
    @import "../styles/project";
    .timeline {
        @include display-flex(flex-start, flex-start, column);
    }
</style>