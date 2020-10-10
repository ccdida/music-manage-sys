<template>
  <div class="swiper-list">
    <el-table :data="swiperlist" style="width: 100%" stripe v-loading='loading'>
      <el-table-column label="#" type="index"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" class="banner" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import {delFileid} from '../../../network/swiper.js'
export default {
  name: "swiperlist",
  props: {
    swiperlist: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      loading:true
    }
  },
  watch:{
    swiperlist(val){
      if(val.length!==0){
        this.loading=false
      }
    }
  },
  methods: {
    handleDelete(row) {
      // console.log(row)
      const params={
        bannerId:row.bannerId,
        fileid:row.fileid
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this._delFileid(params)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

      // console.log(params)
     
    },
    _delFileid(params){
      delFileid(params).then(res=>{
          this.loading = false
          const num = res.data.resultDb.deleted
          this.$message({
            message:`删除成功${num}条数据`,
            type:'success'
          })
          this.$emit('successDel')
         
      }).catch(err=>{
         this.loading = false
        this.$message({
            message:'删除失败',
            type:'fail'
          })
        console.log(err)

      })
    }
  },
};
</script>

<style scoped>
.banner{
    width: 300px;
    height: 150px;
}
</style>