<template>
  <div class="home">
    <el-container>
      <el-header style="width: 80%; margin: 0 auto">
        <el-menu :default-active="activeIndex2" class="el-menu-demo nav-menu" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">Code Search</el-menu-item>
          <el-menu-item index="2">Home</el-menu-item>
          <el-menu-item index="3">
            <router-link style="text-decoration: none" to="/about">About</router-link>
          </el-menu-item>
          <el-menu-item>
            <el-input class="nav-input" v-model="input" placeholder="请输入内容"></el-input>
            <el-button class="nav-button" type="primary" @click="search">搜索</el-button>
          </el-menu-item>
        </el-menu>
        <div class="line"></div>
      </el-header>
      <el-main class="body-main">
          <span :class="{'body-title':show}">Search results: a total of <span
            style="color: deepskyblue;font-weight: bold">{{totalNumber}}</span> results are searched, and the <span
            style="color: deepskyblue;font-weight: bold">20</span> with the highest matching degree are intercepted</span>
        <hr style="background-color:rgba(233,233,233,0.4);height: 2px;border: none;"/>
        <el-card class="box-card" style="margin-top: 10px" v-for="(item,index) in codeInformation" :key="index">
          <div slot="header" class="clearfix">
            <span class="card-child"><span>title: </span>{{item.title}}</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              <el-popover
                placement="left-end"
                title=''
                width="800"
                trigger="click"
                content=''>
                <span style="max-height: 600px;overflow-y: auto">
                  Abstract:<br><div style="border: 2px solid #7f8c8d;opacity: 0.5"></div><br><span>{{item.abstract}}<br><br><br></span><div
                  style="border: 2px solid #7f8c8d;opacity: 0.5"></div><br>
                  Body:<div style="border: 2px solid #7f8c8d;opacity: 0.5"></div><br><span
                  v-for="(value,indexs) in codeFormat"
                  v-html="value" :key="indexs">{{value}}<br></span>
                </span>
                <el-button slot="reference" style="border: none;" @click="more(item.body)">read more
                </el-button>
              </el-popover>

            </el-button>
          </div>
          <div class="introduction">
            <div class="text item"><span
              class="card-child"><span>abstract: </span>{{item.abstract.substr(0,60)}}......</span></div>
            <div class="text item"><span class="card-child"><span>kew words: </span><span
              v-for="(value,index) in item.keywords" :key="index">{{value}}</span></span></div>
          </div>

        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import '@/assets/css/home.css'
  import axios from 'axios'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        input: '',
        isCollapse: true,
        totalNumber: '',
        codeInformation: '',
        show: true,
        codeFormat: [],
        title: ''
      }
    },
    mounted() {
      this.input = this.getCookie('input')
      this.search()
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
          //trim() 方法用于删除字符串的头尾空格。trim() 方法不会改变原始字符串。
          //substring() 方法用于提取字符串中介于两个指定下标之间的字符。
          let c = ca[i].trim();
          if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
        }
        return "";
      },
      search() {
        let param = {};
        if (this.input) {
          param = {
            input: this.input
          }
        }
        axios.get('/users/search', {
          params: param
        }).then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.show = false
            document.cookie = `input=${this.input}`
            this.totalNumber = res.result.totalNumber
            this.codeInformation = res.result.result
          }
        })
      },
      more(codeBody) {
        let outStr = ''
        for (let i = 0; i < codeBody.length; i++) {
          if (codeBody[i] == '\n') {
            outStr += '<br>'
          } else if (codeBody[i] == ' ') {
            outStr += '&nbsp;'
          } else {
            outStr += codeBody[i]
          }
        }
        this.codeFormat = outStr.split('\n')

      },

    }
  }
</script>

<style>

</style>
