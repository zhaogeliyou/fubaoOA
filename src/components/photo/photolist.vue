<template>
    <div class="tmpl">
        <!--1.0 上面的分类-->
        <div class="categoryStyle">
            <ul ref="categoryUl">
                <li @click="getImageListById(0)">全 部</li>
                <li @click="getImageListById(item.id)" v-for="item in photoCategoryList" :key="item.id">
                    {{item.title}}
                </li>
            </ul>
        </div>

        <!--2.0 下面的列表-->
        <div class="photoListStyle">
            <ul>
                <li v-for="item in photoList" :key="item.id">
                    <router-link :to="'/photo/photoinfo/'+item.id">
                        <img :src="item.img_url">
                        <p class="titleAndZhaiyaoStyle">
                            <span>{{item.title}}</span>
                            <br/>
                            {{item.zhaiyao}}
                        </p>
                        
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
    /*分类样式*/
    .categoryStyle{
        overflow-x: auto;
        margin-bottom: 10px;
    }

    .categoryStyle ul{
        padding-left: 0px;
        width: 1200px;
        margin: 3px;
        margin-bottom: 10px;
    }

    .categoryStyle li{
        list-style: none;
        display: inline;
        color: #0094ff;
        margin: 0px 5px;
    }

    /*列表样式*/
    .photoListStyle ul{
        padding: 0px;
        margin: 0px;
    }

    .photoListStyle li{
        list-style: none;
        padding: 3px;
        position: relative;
    }

    .photoListStyle img{
        width: 100%;
        height: 400px;
    }

    .titleAndZhaiyaoStyle{
        left:5px;
        bottom: 0px;
        width:98%;
        position: absolute;
        background-color: rgba(0,0,0,0.4);
        color: white;
    }

    .titleAndZhaiyaoStyle span{
        font-size: 16px;
        font-weight: bold;
    }
</style>

<script>
import common from '../common/common.js'

//导入需要的组件
import { Indicator } from 'mint-ui';
export default {
    data(){
        return {
            photoCategoryList : [], //分类数组
            photoList:[] //图片数组
        }
    },
    created(){
        this.getPhotoCategoryListData()
    },
    methods:{
        getPhotoCategoryListData(){
            const url = common.apihost+"api/getimgcategory"

            this.$http.get(url).then(res=>{
                //计算分类的宽度
                const categoryWidth = (res.body.message.length + 1) * 80
                this.$refs.categoryUl.style.width = categoryWidth+'px';
                this.photoCategoryList = res.body.message

                //去加载全部的列表数据
                this.getImageListById(0)
            },err=>{
            
            })
        },
        getImageListById(categoryId){
            const url = common.apihost+"api/getimages/"+categoryId
            
            //给用户一个友好的提示
            Indicator.open({
                text: '加载中...',
                spinnerType: 'triple-bounce'
            });
            this.$http.get(url).then(res=>{
                this.photoList = res.body.message
                Indicator.close();
            },err=>{
                Indicator.close();
            })

        }
    }
}
</script>
