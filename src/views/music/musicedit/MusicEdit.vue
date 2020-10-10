<template>
  <div class="music-edit">
    <el-form
      :model="playlistInfo"
      :rules="rules"
      ref="playlistInfo"
      label-width="100px"
      class="music-edit-form"
      label-position="right"
      v-loading='loading'
    >
      <el-form-item label="歌单名称" prop="name">
        <el-input v-model="playlistInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="copywriter">
        <el-input v-model="playlistInfo.copywriter"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('playlistInfo')"
          >更新</el-button
        >
        <el-button @click="onCancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import {getPlaylistInfo,updatePlaylistInfo} from 'network/playlist.js'
export default {
  name: "MusicEdit",
  data() {
    return {
      playlistInfo: {
        name: "",
        copywriter:""
      },
      rules: {
        name: [
          { required: true, message: "请输入歌单名称", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15个字符", trigger: "blur" }
        ],
        copywriter:[
          { required: true, message: "请输入歌单描述", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15个字符", trigger: "blur" }
        ]
      },
      playlistId:0,
      loading:true
    }
  },
  created(){
      this.playlistId=this.$route.query.id
    //   1.通过id请求当前表单信息显示
     this._getPlaylistInfo(this.playlistId)
    //   2.通过id更新当前表单信息
  },
  methods: {
    onSubmit() {
      console.log(this.playlistInfo);
      this._updatePlaylistInfo(this.playlistInfo)
    },
    onCancle(){
        this.$router.go(-1)
    },
    _getPlaylistInfo(playlistId){
        getPlaylistInfo(playlistId).then(res=>{
        this.playlistInfo=res.data.result
           this.loading=false
        }).catch(err=>{
            console.log(err)
        })
    },
    _updatePlaylistInfo(playlist){
        updatePlaylistInfo(playlist).then(res=>{
            if(res.data.result.matched==1){
                this.$message({
                 message: `更新成功`,
                 type: "success",
                });
                this.$router.go(-1)
            }
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
  },
};
</script>

<style scoped>
.music-edit{
    margin-left: -20px;
}
</style>