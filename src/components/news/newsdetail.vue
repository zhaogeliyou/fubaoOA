<template>
    <div class="tmpl">
        <!--1.0 新闻详情的标题-->
        <div class="title">
            <h3>{{newsDetail.title}}</h3>
            <p>{{newsDetail.add_time | dmtDate('YYYY-MM-DD')}}&nbsp;&nbsp;&nbsp;{{newsDetail.click}}次浏览&nbsp;&nbsp;&nbsp;
                分类:民生经济
            </p>
        </div>
        <!--2.0 新闻详情的内容-->
        <div class="content">
            <p v-html="newsDetail.content"></p>
        </div>
        <!--3.0 此条新闻的评论-->
        <subcomment :commentId="this.$route.params.newsId"></subcomment>
    </div>
</template>

<style scoped>
    h3{
        color: #0094ff;
        font-size: 16px;
    }

    .title{
        border-bottom: 1px solid rgba(92,92,92,0.3);
        padding-bottom:5px;
    }

    .content{
        padding:10px;
    }
</style>


<script>
import common from '../common/common.js'

// 导入评论子组件
import subcomment from '../subcomponents/subcomment.vue'

export default {
    data(){
        return {
            newsDetail : {}
        }
    },
    created(){
        this.getNewsDetailData()
    },
    methods:{
        getNewsDetailData(){
            const url =common.apihost + "api/getnew/"+this.$route.params.newsId

            this.$http.get(url).then(res=>{
                
                this.newsDetail = res.body.message[0]
            },err=>{

            })
        }
    },
    components:{
        subcomment : subcomment
    }
}
</script>

<style>

</style>
