<template>
  <div id="show-page">
    <div id="show-header-left">
      <nav-header2/>
    </div>
    <div id="show-header-right">
<!--      searchBar2-->
      <div class="search-bar2-middle">
        <form class="search-bar2-box">
          <input class="search-bar2-input" type="text" v-model="searchInput"
                 placeholder='请输入你想搜索的内容'>
        </form>
        <button class="subBtn2" type="submit" @click="searchCode">搜索</button>
      </div>
    </div>
    <div id="show-codes">
      <ul class="container">
        <span>搜索结果:共搜索到 {{totalNumber}} 条结果，截取匹配度最高的 20 条</span>
        <hr/>
        <li class="card" v-for="item in codeInformation">
          <div class="card-content"><a href="javascript:void(0)" @click="sendData(item.body)">标题:{{item.title}}</a></div>
<!--          <div class="card-content">作者:{{item.authors}}</div>-->
          <div class="card-content">简介:{{item.abstract}}</div>
<!--          <div class="card-content">原址:{{item.link}}</div>-->
          <div class="card-content">关键词:<span v-for="itemK in item.keywords">{{itemK}} </span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavHeader2 from '../components/NavHeader2'
  import NavFooter from '../components/NavFooter'
  import axios from 'axios'
  import '../assets/css/show-style.css'
  import '../assets/css/code.css'
  import '../assets/css/searchBar2.css'

  export default {
    data () {
      return {
        searchInput:'',
        codeInformation: '',
        totalNumber: '',
        codeBody:''
      }
    },
    components: {
      NavHeader2,NavFooter
    },
    mounted () {
      this.searchCode()
    },

    methods: {
      searchCode () {
        let param='';
        if (!this.searchInput){
          param = {
            searchInput: this.$route.query.searchInput
          }
        }else{
          param = {
            searchInput: this.searchInput
          }
        }

        axios.get('/users/search', {
          params: param
        }).then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.totalNumber = res.result.totalNumber
            this.codeInformation = res.result.result
          }
        })
      },
      sendData(codeBody){
        this.codeBody = codeBody
        this.$router.push({
          path:'/more',
          query:{codeBody:this.codeBody}
        })
      }
    }
  }
</script>


