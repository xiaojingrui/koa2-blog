<template>
    <div class="wrapper">
        <div class="content">
            <home-header></home-header>
            <home-main></home-main>
            <home-footer></home-footer>
        </div>
    </div>
</template>

<script>
import homeHeader from '../../common/header';
import homeMain from './home-main';
import homeFooter from '../../common/footer';

import axios from 'axios';
export default {
    components: {
        homeHeader,
        homeMain,
        homeFooter
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
