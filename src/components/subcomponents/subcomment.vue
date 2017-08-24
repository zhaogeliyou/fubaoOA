<template>
    <div>
        <!--1.0 提交评论的html代码-->
        <div class="postCommentStyle">
            <h4>提交评论</h4>
            <div class="submitCommentStyle">
                <textarea ref="textAreaRef" rows="5" class="submitTextAreaStyle" placeholder="请输入要提交的内容"></textarea>

                <mt-button type="primary" @click="postComment" size="large">提交评论</mt-button>
            </div>
        </div>

        <!-- 2.0 评论列表 -->
        <div class="commentListStyle">
            <h4>评论列表</h4>
            <div v-for="item in commentList" :key="new Date().getTime()"  class="commentItem">
                <h5>
                    {{item.content}}
                </h5>
                <p class="commentUserAndTime">
                    <span class="commentUser">{{item.user_name}}</span>
                    <span  class="commentTime">{{item.add_time | dmtDate}}</span>
                </p>
            </div>
            <mt-button class="loadmore" @click="loadMore" plain size="large" type="danger">加载更多</mt-button>
        </div>
    </div>
</template>

<style>
    h4{
        padding: 5px 5px 10px 5px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }

    .submitCommentStyle,.commentListStyle{
        padding: 5px;
    }

    .commentItem{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.2);
        height: 70px;
        overflow-y: auto;
    }

    h5{
        font-size: 16px;
        color: black;
    }

    .commentUserAndTime{
        margin-top: 15px;
        color: #0094ff;
    }

    .commentUser{
        float: left;
        width: 50%;
    }

    .commentTime{
        float: right;
    }

    .loadmore{
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>


<script>
    import common from '../common/common.js'

    import { Toast } from 'mint-ui';

    export default{
        data(){
            return {
                pageIndex : 1, //要加载的页码，默认是第一页
                commentList : []
            }
        },
        created(){
            this.getCommentListByPageIndex()
        },
        methods:{
            getCommentListByPageIndex(){
                const url = common.apihost+ "api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex

                this.$http.get(url).then(res=>{
                    // console.log(res.body.message)
                    if(this.pageIndex == 1){//加载第一页
                        this.commentList = res.body.message
                    }else{//加载更多
                        this.commentList =this.commentList.concat(res.body.message);
                    }
                },err=>{

                })
            },
            //加载更多
            loadMore(){
                this.pageIndex++

                this.getCommentListByPageIndex()
            },
            //提交评论
            postComment(){
                //获取文本域的值
                const postContent = this.$refs.textAreaRef.value;

                if(postContent==null || postContent.length<=0){
                    Toast({
                        message: '评论内容不能为空，不要瞎评论',
                        position: 'middle',
                        duration: 2000
                    });

                    return
                }
                //提交给服务器
                const url = common.apihost + "api/postcomment/"+this.commentId

                this.$http.post(url,{content:postContent},{emulateJSON:true}).then(res=>{
                    if(res.body.status == 0){
                        //提示
                        Toast({
                            message: '提交成功',
                            position: 'middle',
                            duration: 2000
                        });

                        //清空
                        this.$refs.textAreaRef.value = ''

                        //重新加载第一页数据
                        this.pageIndex = 1
                        this.getCommentListByPageIndex()
                    }
                },err=>{

                })
            }
        },
        props: ['commentId'] //用来接收父组件传递过来的数据，表名父组件可以传递多个值
    }
</script>