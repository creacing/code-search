<template>
  <div class="about" style="width: 1000px;margin: 100px auto">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> 基于lucene的代码搜索系统 &nbsp;@Designed by 七夜的许愿星 </span>
        <el-button style="float: right; padding: 3px 0" type="text">github</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "About"
    }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
</style>
