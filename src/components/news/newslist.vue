<template>
  <div class="tmpl">
        <!--mui的图文列表-->
        <ul class="mui-table-view">
            <li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
                <router-link :to="'/news/newsdetail/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <p class="newsTitle">
                            {{item.title}}
                        </p>
                        
                        <p class="mui-ellipsis">
                            <span class="left">
                                {{item.add_time | dmtDate('YYYY-MM-DD HH:mm')}}
                            </span>

                            <span class="right">
                                点击数:{{item.click}}次
                            </span>
                        </p>
                    </div>
                </router-link>
            </li>
		</ul>
  </div>
</template>

<style scoped>
    .mui-table-view-cell{
        min-height: 80px;
    }

    .mui-pull-left{
        min-width: 64px;
        height: 64px;
    }

    .newsTitle{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .mui-ellipsis{
        margin-top: 20px;
        color: #0094ff;
        font-size: 12px;
    }

    .right{
        float: right;
    }
</style>


<script>
    import common from '../common/common.js'

    export default {
        data:function(){
            return {
                newsList : []
            }
        },
        created(){
            this.getNewsListData()
        },
        methods:{
            //es6中关于函数还有另外一种写法
            getNewsListData(){
                const url =common.apihost + "api/getnewslist"
                //console.log(url)
                //es6中的箭头函数，如果只有一个参数`()`可以省略
                this.$http.get(url).then(response=>{
                    //console.log(response.body)
                    this.newsList = response.body.message
                },(error)=>{

                })
            }
        }
    }
</script>

<style>

</style>
