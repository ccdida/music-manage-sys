<template>
  <div class="table-list">
    <el-table :data="playlist" style="width: 100%" stripe v-if="playlist.length!==0">
      <el-table-column label="#" type="index" :index="indexMethod"> </el-table-column>
      <el-table-column label="封面">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" class="cover" />
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"> </el-table-column>
      <el-table-column label="描述" prop="copywriter"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import { delPlaylist } from "network/playlist.js";
export default {
  name: "TableList",
  props: {
    playlist: {
      type: Array,
      default() {
        return [];
      }
    },
    currentPage:{
      type:Number,
      defult(){
        return 0
      }
    }
  },
  data() {
    return {
      loading:true
    };
  },
  mounted(){
   
  },
  watch:{
    playlist(val){
      if(val.length!==0){
        this.loading=false
      }
    }
  },
  computed:{
  
  },
  methods: {
    indexMethod(index){
      // console.log(index)
      const num=(this.currentPage-1)*10+index+1
      // console.log(num)
      return num
    },
    // 编辑功能
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({
        path:'music/edit',
        query:{
          id:row._id
        }
      })
    },
    handleDelete(row) {
      const params = {
        playlistId: row._id,
      };
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this._delPlaylist(params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    _delPlaylist(params) {
      delPlaylist(params)
        .then((res) => {
          this.loading = false;
          const num = res.data.result.deleted;
          this.$message({
            message: `删除成功${num}条数据`,
            type: "success",
          });
          this.$emit('successDelPlay')
        })
        .catch((err) => {
          this.loading = false;
          this.$message({
            message: "删除失败",
            type: "fail",
          });
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.table-list .cover {
  width: 100px;
  height: 100px;
}
</style>