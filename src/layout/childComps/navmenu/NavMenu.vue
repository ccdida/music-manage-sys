<template>
  <div class="menu">
    <el-menu
      :default-active="getCurrentPath"
      class="nav-menu"
      background-color="#213446"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item index="/music">
        <i class="el-icon-s-data"></i>
        <span slot="title">歌单管理</span>
      </el-menu-item>
      <el-menu-item index="/blog">
        <i class="el-icon-s-promotion"></i>
        <span slot="title">博客管理</span>
      </el-menu-item>
      <el-menu-item index="/swiper">
        <i class="el-icon-orange"></i>
        <span slot="title">轮播图管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>


<script>
export default {
  name: "NavMenu",
  props:{
    isCollapse:Boolean
  },
  computed: {
    getCurrentPath() {
      // console.log(this.$route);
      return this.$route.path;
    },
  },
};
</script>

<style scoped>
.nav-menu{
  border: none;
}
</style>