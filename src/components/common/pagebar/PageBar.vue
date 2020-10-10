<template>
  <div class="pagebar" v-if="total!==-1">
    <el-pagination  
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>


<script>
export default {
  name: "PageBar",
  props:{
     total:{
       type:Number,
       default:-1
     }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('pageChange',page)

    }
  },
  created(){
    console.log(this.total)
  },
  data() {
    return {
      currentPage: 1
    };
  },
};
</script>

<style scoped>
</style>