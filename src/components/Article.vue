<template>
    <div class="article">
      <div class="loading" v-if="isLoading">
        <!--在数据未返回时显示-->
        <img src="../assets/loading.gif" height="48" width="48"/>

      </div>
      <div v-else>
        <div class="topic_header" >
          <div class="topic_title">{{post.title}}</div>
          <ul class="">
            <li>• 发布于 {{post.create_at | formateDate}}</li>
            <li>• 作者 {{post.author.loginname}}</li>
            <li>• {{post.visit_count}} 次浏览</li>
            <li>• 来自  {{ post | formateTab }}</li>
          </ul>
        </div>
        <div v-html="post.content" class="topic_content"></div>
        <div id="reply">
          <div class="topbar">
            回复
          </div>
          <div v-if="post.replies.length === 0" class="no-reply">暂无回复</div>
          <div v-else v-for="(reply,index) in post.replies" class="replySec" >
            <div class="replyUp">
              <router-link :to="{
          name:'user_info',
          params:{name:reply.author.loginname}
          }"> <img :src="reply.author.avatar_url" alt=""> </router-link>
              <router-link :to="{
          name:'user_info',
          params:{name:reply.author.loginname}
          }"> <span>{{reply.author.loginname}}</span> </router-link>

              <span>{{index+1}} 楼</span>
              <span>• 发布于 {{reply.create_at | formateDate}}</span>

              <span v-if="reply.ups.length>0" class="up-count">
          <i class="iconfont icon-like"></i>  {{reply.ups.length}}
        </span>
            </div>

            <p v-html="reply.content" class="reply-content"></p>
          </div>

        </div>

      </div>

    </div>

</template>



<script>

    export default {
        name: "article",
      data(){
          return {
            post:{},//当前文章页的所有内容
            isLoading : false
          }
      },
      methods:{
          getArticleData(){
            this.$http.get( `https://cnodejs.org/api/v1/topic/${this.$route.params.id}` )
              .then((res)=>{
                if(res.data.success === true){
                  this.isLoading = false;
                  this.post = res.data.data
                }

              })
              .catch(function (err) {
                console.log(err)
              })
          }


      },
      beforeMount(){
          this.isLoading = true;
          this.getArticleData()
      },
      watch:{
          '$route'(to,from){
            this.getArticleData()
          }
      }
    }
</script>
<style>
  @import url('../assets/markdown-github.css');
  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }
  #reply .reply-content{
    font-size: 15px;
    color: #333333;
  }
  #reply .no-reply{
    font-size: 14px;
    color: #888888;
    text-align: center;
    padding-bottom: 10px;
  }

  .iconfont{
    font-size: 14px;
    color: #888888;
  }

  .iconfont:hover{
    color: #333;
  }

  .reply-content p{
    padding-left: 50px;
    margin-top: 0;
  }
  .reply-content{
    margin-top: 0;
  }
  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -12px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }

  .up-count{
    float: right;
    margin-top: 20px;
  }

  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
    padding-bottom: 500px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }
</style>
