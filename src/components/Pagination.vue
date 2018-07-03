<template>
<div class="pagination">
  <button @click = 'changePage'>首页</button>
  <button @click = 'changePage'>上一页</button>
  <button v-if="currentPage > 4" class="pagebtn">......</button>
  <button v-for="page in pageBtns"
          :class="[{currentPage:page === currentPage},'pageBtn']" @click="changePage(page)">
    <span>{{page}}</span>
  </button>
  <button @click = 'changePage'>下一页</button>
</div>
</template>

<script>
  import $ from 'jquery'
    export default {
        name: "pagination",
      data(){
          return {
            pageBtns:[1,2,3,4,5,'......'],
            currentPage:1
          }
      },
      methods:{
        changePage(page){
          if(typeof page != 'number'){
            switch (page.target.innerText){
              case '上一页':
                $('button.currentPage').prev().click();
                break;
              case '下一页':
                $('button.currentPage').next().click();
                break;
              case '首页':
                this.pageBtns=[1,2,3,4,5,'......'];
                this.changePage(1);
                break;
            }
            return
          }
          this.currentPage = page
          if(page === this.pageBtns[4]){
            this.pageBtns.shift()//移除第一个元素
            this.pageBtns.splice(4,0,this.pageBtns[3]+1)
          }else if(page === this.pageBtns[0] && this.pageBtns[0] !== 1){
            this.pageBtns.unshift(this.pageBtns[0]-1)
            this.pageBtns.splice(5,1)
          }
          this.$emit('handleList',this.currentPage)
        }
      }
    }
</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>
