<template>
  <div class="layout">
    <el-container class="layout-container">
			<!-- 侧边导航 -->
      <el-aside class="aside" :class="{'hidden':isCollapse}">
        <nav-menu :isCollapse="isCollapse"></nav-menu>
      </el-aside>
			<!-- 侧边导航结束 -->
      <el-main class="main-right-wrap">
        <el-container>
					<!-- 面包屑导航 -->
          <el-header class="breadcrumb-header">
						<div class="tab-control">
							<div class="unfold" @click="onUnfold">
								<i class="el-icon-s-unfold" v-if="isCollapse"></i>
								<i class="el-icon-s-fold" v-else></i>
							</div>
						</div>
						<breadcrumb class="breadcrumb"></breadcrumb>
					</el-header>
					<!-- 面包屑导航结束 -->
          <el-main>
              <router-view>
              </router-view>
          </el-main>

        </el-container>
      </el-main>

    </el-container>
  </div>
</template>


<script>
import Breadcrumb from './childComps/breadcrumb/Breadcrumb.vue'
import NavMenu from './childComps/navmenu/NavMenu.vue'
export default {
	name: "Layout",
	data(){
		return {
			isCollapse: false
		}
	},
	components:{
		Breadcrumb,
		NavMenu
	},
	methods:{
		onUnfold(){
			this.isCollapse=!this.isCollapse
		}
	}
};
</script>

<style scoped>
.layout {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.aside {
  height: 100%;
	padding-top: 10px;
  background-color: #213446;
	/* width: 210px !important; */
}
.aside.hidden{
	width: 80px !important;
}
.layout-container {
  height: 100%;
}
.breadcrumb-header{
	display: flex;
	align-items: center;

}
.tab-control{
	widows: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.breadcrumb{
	flex: 1;
}
.unfold i{
	font-size: 24px;
	font-weight: normal;
	margin-right: 20px;
}
.main-right-wrap{
	padding-left: 0;
}
</style>