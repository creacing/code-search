<template>
  <div class="search-middle">
    <form class="search-box">
      <input class="search-input" :class="{changToSearchFlag}" type="text" v-model="searchInput"
             :placeholder=defaultStr>
      <button class="search-btn" :class="{btnCloseFlag}" type="button" @click="changeToSearch"></button>
    </form>
    <button :class="subBtn" type="submit" @click="toShow">搜索代码</button>
  </div>
</template>

<script>
  import '../assets/css/main.css'

  export default {
    data () {
      return {
        searchInput: '',
        changToSearchFlag: false,
        btnCloseFlag: false,
        defaultStr: '',
        subBtn: 'subBtn'
      }
    },
    methods: {
      changeToSearch () {
        if (this.changToSearchFlag == false) {
          this.changToSearchFlag = true
          this.btnCloseFlag = true
          setTimeout(()=>{
            this.defaultStr = '请输入你想搜索的内容'
            this.subBtn = 'subBtn1'
          },1000)
        } else {
          this.changToSearchFlag = false
          this.btnCloseFlag = false
          this.defaultStr = ''
          this.subBtn = 'subBtn'
        }
      },
      toShow(){
        this.$router.push({
          path: '/show',
          query:{searchInput:this.searchInput}
        })
      },

    }
  }
</script>

