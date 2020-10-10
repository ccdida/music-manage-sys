<template>
  <div class="swiper">
    <!-- 上传图片 -->
    <el-upload
      class="upload-demo"
      name="file"
      action="/api/swiper/upload"
      :on-success="onSuccess"
       :with-credentials=true
      list-type="picture"
      :auto-upload="true"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
    <!-- 上传图片结束 -->
    <swiper-list :swiperlist="swiperlist" ref='swiperlist' @successDel="onSuccessDel"></swiper-list>
  </div>
</template>


<script>
import { getSwiperlist} from "network/swiper.js";
import SwiperList from "./childComps/SwiperList.vue";
export default {
  name: "Swiper",
  data() {
    return {
      swiperlist: []
    };
  },
  components: {
    SwiperList,
  },
  created() {
    this._getSwiperlist();
  },
  methods: {
    _getSwiperlist() {
      getSwiperlist().then((res) => {
        this.$refs.swiperlist.loading = false;
        // console.log(res.data)
        
        if(Object.keys(res.data).length==0){
          this.$message('暂无数据')
          this.swiperlist=[]
          return
        }
        this.swiperlist = res.data;
        
      }).catch(err=>{
        console.log(err)
        if(this.$refs.swiperlist){
          this.$refs.swiperlist.loading = false
        }
        
        // this.$message('由于网络原因请求失败')
      })
    },
    onSuccess(){
      // const bannerId=res[0]
      // console.log(bannerId)
      this._getSwiperlist()
      this.$message({
        message:'上传成功',
        type:'success'
      })
    },
    onSuccessDel(){
      // console.log('刷新页面')
      this._getSwiperlist()
    }
  }
};
</script>

<style scoped>
</style>