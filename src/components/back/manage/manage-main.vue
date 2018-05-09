<template>
  <div class="main">
      <manageNav @filterChange="filterArticle" :current="current"></manageNav>
      <manageBody :contents="contents"></manageBody>
  </div>
</template>

<script>
import manageNav from '../../common/nav';
import manageBody from './manage-body';
import axios from 'axios';
import Bus from '@/api/bus.js';
export default {
    created () {
        let _this = this;
        // 获取文章信息
        axios.get('api/getArticle', {
            params: {
                page: 1,
                filterText: '',
                perNum: 10
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
        Bus.$on('deleteArticle', this.deleteArticle);
    },
    data () {
        return {
            contents: [],
            page: 1,
            filterText: '',
            current: {
                manage: true
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
                    perNum: 10
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
        turnPage(page) {
            this.page = page;
            let _this = this;
            axios.get('api/getArticle', {
                params: {
                    page: _this.page,
                    filterText: _this.filterText,
                    perNum: 10
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
        deleteArticle (id) {
            axios.post('/api/deleteArticle', {
                id
            })
                .then( (res) => {
                    console.log('delete res = ', res);
                    console.log(res)
                    if (res && res.data.success) {
                        alert('删除成功!');
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    console.log('err is ', err);
                    alert('删除失败，请重新尝试~');
                })
            console.log(id);
        } 
    },
    components: {
        manageNav,
        manageBody
    }
}
</script>

<style lang="scss">

</style>
