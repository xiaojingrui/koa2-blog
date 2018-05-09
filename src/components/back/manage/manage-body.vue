<template>
    <div class="boder clearfix">
        <manage-show :contents="contents"></manage-show>
        <manage-sidebar></manage-sidebar>
    </div>
</template>

<script>
import manageShow from './manage-show';
import manageSidebar from '../../common/sidebar';
export default {
    props: ['contents'],
    components: {
        manageShow,
        manageSidebar
    }
}    
</script>

<style lang="scss">
.boder {
    width: 100%;
    // height: 100px;
}
</style>
