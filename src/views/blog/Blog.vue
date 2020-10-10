<template>
	<div class="bloglist">
		<blog-list :bloglist='bloglist' :loading='loading' @successDelBlog='onSuccessDelBlog'></blog-list>
	</div>
</template>


<script>
	import {getBloglist} from 'network/blog.js'
	import {formatDate} from 'common/utils.js'
	import BlogList from './childComps/BlogList.vue'
	export default{
		name:"Blog",
		data(){
			return{
				bloglist:[],
				loading:true
			}
		},
		components:{
			BlogList
		},
		created(){
			this._getBloglist()
		},
		methods:{
			_getBloglist(){
				this.loading=true
				getBloglist().then(res=>{
					const result=res.data
					for(let item of result){
						// console.log(item)
						item.createTime=formatDate(new Date(item.createTime.$date),'yyyy-MM-dd hh:mm:ss')
					}

					this.bloglist=result
					// console.log(result)
					this.loading=false
				})
			},
			onSuccessDelBlog(){
				this._getBloglist()
			}
		}
	}
</script>

<style scoped>
	
</style>