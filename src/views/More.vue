<template>
<div id="more-page">
  <div id="more-head">
    <nav-header2/>
  </div>
  <div id="more-body">
    <h3>文章内容</h3>
    <div class="codeBody">
<!--      列表遍历输出-->
      <ul>
        <li class="code-format" v-for="item in codeFormat">{{item}}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
  import NavHeader2 from '../components/NavHeader2'
  import '../assets/css/more-style.css'
  export default {
    data(){
      return {
        codeBody:'',
        codeFormat:''
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        this.codeBody= this.$route.query.codeBody
        // console.log(this.codeBody)
        //检测换行push数组
        this.codeFormat=this.codeBody.split('\n')
      }
    },
    components:{NavHeader2}
  }
</script>

