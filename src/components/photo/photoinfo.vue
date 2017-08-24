<template>
    <div class='tmpl'>
        <!--1.0 标题 -->
        <div class="title">
            <h3>{{photoInfo.title}}</h3>
            <p>
                {{photoInfo.add_time | dmtDate("YYYY-MM-DD")}}&nbsp;&nbsp;&nbsp;
                {{photoInfo.click}}次浏览
            </p>
        </div>

        <!--2.0 缩略图-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(item,index) in thumbImages" :key="item.src" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <img @click="$preview.open(index, thumbImages)" class="preview-img" height="100" width="100" :src="item.src">
            </li>
        </ul>

        <!--3.0 内容-->
        <div class="content">
            <div v-html="photoInfo.content"></div>
        </div>
    </div>
</template>

<style scoped>
    .title{
        padding: 5px;
    }

    h3{
        font-size: 18px;
        color: #0094ff;
    }

    .title p{
        font-size: 12px;
        color: gray;
    }

    .content{
        padding: 5px;
        color: gray;
        font-size: 14px;
    }
</style>

<script>
    import common from '../common/common.js'

    export default{
        data(){
            return {
                photoInfo : {},//图片的基本信息
                thumbImages : []
            }
        },
        created(){
            //获取除开缩略图的数据
            this.getPhotoInfoData()
            //获取缩略图的数据
            this.getThumbImagesData()
        },
        methods:{
            getPhotoInfoData(){
                const url = common.apihost+"api/getimageInfo/"+this.$route.params.photoId

                this.$http.get(url).then(res=>{
                    this.photoInfo = res.body.message[0]
                },err=>{

                })
            },
            getThumbImagesData(){
                const url = common.apihost+"api/getthumimages/"+this.$route.params.photoId

                this.$http.get(url).then(res=>{
                     res.body.message.forEach(item=>{
                        item.w = 600
                        item.h = 400
                    })
                    this.thumbImages = res.body.message
                },err=>{

                })
            }
        }
    }
</script>