<template>
    <div class="main">
        <home-nav @filterChange="filterArticle" :current="current"></home-nav>
        <home-body :contents="contents"></home-body>
    </div>
</template>

<script>
import homeNav from '../../common/nav';
import homeBody from './main/home-body';
import axios from 'axios';
import Bus from '@/api/bus.js';
export default {
    created () {
        console.log('widnow = ', window);
        let _this = this;
        // 获取文章信息
        axios.get('api/getArticle', {
            params: {
                page: 1,
                filterText: '',
                perNum: 7
            }
        })
        .then((res) => {
            _this.contents = res.data.data;
            console.log('res is ', res);
        })
        .catch((err) => {
            console.log('err is ', err);
        })
       
        // bus
        Bus.$on('turnPage', this.turnPage);
    },
    data () {
        return {
            contents: [],
            page: 1,
            filterText: '',
            current: {
                home: true
            }
        }
    },
    methods: {
        filterArticle(filterText) {
            this.filterText = filterText;
            // console.log(filterText);
            // this.articles = this.articles.filter( item => item.title.includes(filterText));
            let _this = this;
            axios.get('api/getArticle', {
                params: {
                    page: _this.page,
                    filterText: _this.filterText,
                    perNum: 7
                }
            })
            .then((res) => {
                _this.contents = res.data.data;
                console.log('res is ', res);
            })
            .catch((err) => {
                console.log('err is ', err);
            })
        },
        turnPage (page) {
            this.page = page;
            let _this = this;
            console.log('page = ', this.page);
            console.log('filterText = ', this.filterText);
            axios.get('api/getArticle', {
                params: {
                    page: _this.page,
                    filterText: _this.filterText,
                    perNum: 7
                }
            })
            .then((res) => {
                _this.contents = res.data.data;
                console.log('getRes is ', res);
            })
            .catch((err) => {
                console.log('err is ', err);
            })
        }
    },
    components: {
        homeNav,
        homeBody
    }
}
</script>

<style lang="scss">
.main {
    width: 100%;
}
</style>

