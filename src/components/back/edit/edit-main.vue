<template>
    <div>
        <editNav :current="current"></editNav>
        <editBody></editBody>
    </div>
</template>

<script>
import editNav from '../../common/nav';
import editBody from './edit-body';
export default {
    data () {
        return {
            current: {
                write: true
            }
        }
    },
    components: {
        editNav,
        editBody
    }
}
</script>

<style lang="scss">

</style>
