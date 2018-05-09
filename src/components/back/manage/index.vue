<template>
    <div class="wrapper">
        <div class="content">
            <manage-header></manage-header>
            <manage-main></manage-main>
            <manage-footer></manage-footer>
        </div>
    </div>
</template>

<script>
import manageHeader from '../../common/header';
import manageMain from './manage-main';
import manageFooter from '../../common/footer';

import axios from 'axios';
export default {
    components: {
        manageHeader,
        manageMain,
        manageFooter
    }
}
</script>

<style lang="scss">
body,
h1,
ul,
input,
tr,
th,
td {
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
