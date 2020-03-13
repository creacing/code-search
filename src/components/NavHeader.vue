<template>
  <ul class="nav-ul">
    <li class="nav-li" :class="{active:active}" @click="selectLi"><router-link to="/">Code Search</router-link></li>
    <li class="nav-li" :class="{active:active1}" @click="selectLi1"><router-link to="/">Home</router-link></li>
    <li class="nav-li" :class="{active:active3}" @click="selectLi3"><router-link to="/about">about</router-link></li>
    <li class="nav-li slide"></li>
  </ul>
</template>

<script>
  import '../assets/css/nav.css'

  export default {
    data () {
      return {
        active: false,
        active1: false,
        active3: false
      }
    },
    methods: {
      selectLi () {
        this.active = true
        this.active1 = false
        this.active3 = false
      },
      selectLi1 () {
        this.active1 = true
        this.active = false
        this.active3 = false
      },
      selectLi3 () {
        this.active3 = true
        this.active = false
        this.active1 = false
      },
    }
  }
</script>


