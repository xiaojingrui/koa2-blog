<template>
    <div class="wrapper">
        <div class="content">
            <edit-header></edit-header>
            <edit-main></edit-main>
            <edit-footer></edit-footer>
        </div>
    </div>
</template>

<script>
import editHeader from '../../common/header';
import editMain from './edit-main';
import editFooter from '../../common/footer';

import axios from 'axios';
export default {
    components: {
        editHeader,
        editMain,
        editFooter
    }
}
</script>

<style lang="scss">
body,
h1,
ul,
input {
    margin: 0;
    padding: 0;
}
li {
    list-style: none;
}
a {
    text-decoration: none;
    color: #555;
}
.clearfix::after {
    content: '';
    display: block;
    clear: both;
    *zoom: 1;
}
.wrapper {
    position: relative;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    padding: 0 50px;
    .content {
        
    }
}

</style>
