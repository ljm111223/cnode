
<template>
    <header>
      <div class="container">
        <router-link :to="{
      name:'root'}">
          <img src="../../build/cnode.svg" alt="">
        </router-link>

        <ul>
          <li><a href="#"> 首页 </a></li>
          <li><a href="#"> 新手入门 </a></li>
          <li><a href="#"> API </a></li>
          <li><a href="#"> 关于 </a></li>
          <li><a href="#"> 注册 </a></li>
          <li><a href="#"> 登录 </a></li>
        </ul>
      </div>

    </header>
</template>

<script>
    export default {
        name: "header"
    }
</script>

<style scoped>
  header{
    margin: auto;
    width: 100%;
    height: 50px;
    background: #444;
  }
  .container{
    max-width: 1400px;
    height: 100%;
    margin: 0 auto;
  }
  img{
    width: 120px;
    margin-top: 10px;
  }
  ul{
    list-style: none;
    float: right;
    margin: 0 10px 0 0;
  }
  li{
    padding: 15px;
    display: inline-block;

  }

  a{
    text-decoration: none;
    color: #ccc;
    text-shadow: none;
    font-size: 13px;
  }
</style>
