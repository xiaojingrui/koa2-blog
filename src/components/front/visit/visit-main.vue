<template>
    <div>
        <visitNav :current="{}"></visitNav>
        <visitBody></visitBody>
    </div>
</template>

<script>
import visitNav from '../../common/nav';
import visitBody from './visit-body';
export default {
    components: {
        visitNav,
        visitBody
    }
}
</script>

<style lang="scss">

</style>
