<template>
<div class="authorinfo">
<div class="authersummay">
 <div class="topbar">作者</div>
  <router-link :to="{
          name:'user_info',
          params:{
            name:userinfo.loginname
          }
          }">
    <img :src="userinfo.avatar_url" alt="">
  </router-link>
  <p class="loginname">
    <router-link :to="{
      name:'user_info',
      params:{
        name:userinfo.loginname
      }
  }">{{userinfo.loginname}}</router-link>
  </p>
  <div class="score">积分：{{userinfo.score}}</div>


</div>
  <div class="recent_topics">
    <div class="topbar">作者最近主题</div>
    <ul>
      <li v-for="item in topicsTop5">
        <router-link :to="{
        name:'post_content',
        params:{id:item.id,
                name:item.author.loginname}
        }">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
  <div class="recent_replies">
    <div class="topbar">作者最近回复</div>
    <ul>
      <li v-if="topicsTop5.length === 0" class="no-reply">暂无最新回复</li>
      <li v-for="item in repliesTop5" v-else>
        <router-link :to="{
        name:'post_content',
        params:{id:item.id,name:item.author.loginname}
        }">{{item.title}}</router-link>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
    export default {
        name: "SlideBar",
      data(){
        return {userinfo:{}}
      },
      methods:{
        getUserInfo(){

          this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
            .then(res=>{
              if (res.data.success === true){
                this.userinfo = res.data.data
              }

            })
            .catch(err=>{
              console.log(err)
            })
        }
      },
      beforeMount(){
          this.getUserInfo()
      },
      computed:{
          repliesTop5(){
            if(this.userinfo.recent_replies){
              return this.userinfo.recent_replies.slice(0,5)
            }
          },
        topicsTop5(){
            if(this.userinfo.recent_topics){
              return this.userinfo.recent_topics.slice(0,5)
            }
        }
      }
    }
</script>

<style scoped>
  .authersummay, .recent_replies, .recent_topics {
    background-color: #fff;
  }
  .authorinfo {
    width: 328px;
    float: right;
    margin-top: 0;
  }
  li{
    padding: 3px 0 ;
  }
  .recent_replies ul, .recent_topics ul {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 5px;
    list-style: none;
    padding-left: 14px;
  }


  ul a {
    font-size: 12px;
    text-decoration: none;
    color: #778087;
  }

  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }
  .score{
    margin-left: 10px;
    padding-bottom: 5px;
    font-size: 15px;
    color: #333;
  }
  img {
    height: 48px;
    width: 48px;
    border-radius: 3px;
    margin: 10px;
  }

  .loginname {
    width: 100px;
    float: right;
    margin-top: 22px;
    margin-right: 159px;
    font-size: 14px;
  }

  .loginname a {
    text-decoration: none;
    color: #778087;
    font-size: 16px;
  }
  .no-reply{
    font-size: 14px;
    color: #888888;
    text-align: center;
    padding-bottom: 10px;
  }
  .authersummay .topbar {
    margin-top: 0px;
  }
</style>
