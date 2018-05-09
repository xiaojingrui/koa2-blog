<template>
    <div class="wrapper">
        <div class="content">
            <visit-header></visit-header>
            <visit-main></visit-main>
            <visit-footer></visit-footer>
        </div>
    </div>
</template>

<script>
import visitHeader from '../../common/header';
import visitMain from './visit-main';
import visitFooter from '../../common/footer';

import axios from 'axios';
export default {
    components: {
        visitHeader,
        visitMain,
        visitFooter
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
