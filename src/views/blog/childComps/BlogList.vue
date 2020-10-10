<template>
  <div class="blog-list">
    <el-table :data="bloglist" style="width: 100%" stripe v-loading='loading'>
      <el-table-column label="#" type="index" > </el-table-column>
      <el-table-column label="内容" prop="content">
      </el-table-column>
      <el-table-column label="时间" prop="createTime"> </el-table-column>
      <el-table-column label="用户" prop="nickname"> </el-table-column>
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
import {delBlog} from 'network/blog.js'
export default {
  name: "BlogList",
  props:{
    bloglist:{
      type:Array,
      default(){
        return []
      }
    },
    loading:{
        type:Boolean,
        default(){
            return true
        }
    }
  },
  data() {
    return{
      
    }
  },
  methods: {
    handleDelete(row) {
       const params={
        blogid:row._id
       }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(params)
          this._delBlog(params)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
     
    },
    _delBlog(params){
      delBlog(params).then(res=>{
        this.$emit('successDelBlog')
        const num = res.data.blogRes.deleted
         this.$message({
            message:`删除成功${num}条数据`,
            type:'success'
          })
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<style scoped>
.table-list .cover{
  width: 100px;
  height: 100px;
}
</style>