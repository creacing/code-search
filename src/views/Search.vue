<template>
  <div id="main-page">
    <div id="main-header">
      <nav-header></nav-header>
    </div>
    <div id="main-body">
      <search-bar></search-bar>
    </div>
    <div id="main-footer">
      <nav-footer></nav-footer>
    </div>
  </div>
</template>

<script>
  import '../assets/css/main.css'
  import '../assets/css/main-style.css'
  import SearchBar from '../components/SearchBar'
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  export default {
    data(){
      return {}
    },
    components:{
      SearchBar,NavHeader,NavFooter
    }
  }
</script>


