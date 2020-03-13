<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import './assets/css/main.css'
  import Search from './views/Search'
export default {
  data(){
    return {

    }
  },
  components:{
    Search
  }
}
</script>


