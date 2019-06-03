<template>
  <el-container>
    <el-header height="80px">
      <Header/>
    </el-header>
    <el-container>
      <div class="container-main">
        <router-view></router-view>
      </div>
    </el-container>
  </el-container>
</template>

<script>
  import Header from './Header.vue'
  export default {
    components: {
      Header
    },
    data: () => ({
      activeIndex: "1",
    })
  }
</script>
