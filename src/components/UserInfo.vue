<template>
<div class="UserInfo">
  <div class="loading" v-if="isLoading">
    <!--在数据未返回时显示-->
    <img src="../assets/loading.gif" height="48" width="48"/>
  </div>

  <div class="userInfomation" v-else>
    <section>
      <img :src="userinfo.avatar_url" alt="">
      <span>{{userinfo.loginname}}</span>
      <p>{{userinfo.score}} 积分</p>
      <p>注册时间 {{userinfo.create_at | formateDate}}</p>
    </section>
    <div class="replies">
      <p>最近参与的话题</p>

    <ul>
      <li v-for="item in userinfo.recent_replies">
        <router-link :to="{
        name:'user_info',
        params:{
          name:item.author.loginname
        }
        }">
          <img :src="item.author.avatar_url" alt="">
        </router-link>
        <router-link :to="{
        name:'post_content',
        params:{id:item.id}
        }">{{item.title}}</router-link>
        <span class="last_reply">{{item.last_reply_at | formateDate}}</span>
      </li>
    </ul>
    </div>
    <div class="topics">
      <p>最近创建的话题</p>

    <ul>
      <li v-for="item in userinfo.recent_topics">
        <router-link :to="{
        name:'post_content',
        params:{id:item.id}
        }">{{item.title}}</router-link>
      </li>
    </ul>
    </div>
  </div>

</div>
</template>

<script>
    export default {
        name: "user-info",
        data(){
          return {
            isLoading : false,
            userinfo:{}
          }

        },
      methods:{
          getUserInfo(){

            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
              .then(res=>{
                if (res.data.success === true){
                  this.isLoading = false;
                  this.userinfo = res.data.data
                }

              })
              .catch(err=>{
                console.log(err)
              })
          }
      },
      beforeMount(){
          this.isLoading = true;
          this.getUserInfo()
      },watch:{
        '$route'(to,from){
          this.getUserInfo()
        }
      }
    }
</script>

<style scoped>

  .loading {
    text-align: center;
    padding-top: 300px;
    padding-bottom: 500px;
  }

  .userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }

  .userInfomation ul{
    padding-left: 0;
  }

  .userInfomation li {
    list-style:none;
    position: relative;
  }
  .userInfomation .replies,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px #DDDDDD solid;
  }

  /*.userInfomation .replies img,*/
  /*.userInfomation .topics img{*/
    /*position: absolute;*/
    /*left: 0;*/
    /*z-index: 1;*/
  /*}*/
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }
  .last_reply{
    float: right;
    margin-right: 10px;
    color: #888888;
  }

</style>
