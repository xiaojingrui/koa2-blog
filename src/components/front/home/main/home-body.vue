<template>
    <div class="boder clearfix">
        <home-show :contents="contents"></home-show>
        <home-sidebar></home-sidebar>
    </div>
</template>

<script>
import homeShow from './home-show';
import homeSidebar from './home-sidebar';
export default {
    props: ['contents'],
    components: {
        homeShow,
        homeSidebar
    }
}    
</script>

<style lang="scss">
.boder {
    width: 100%;
    // height: 100px;
}
</style>
