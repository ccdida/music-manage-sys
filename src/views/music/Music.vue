<template>
	<div class="music-container">
		<table-list :playlist='playlist' ref='playlist' @successDelPlay='onSuccessDelPlay' :currentPage='currentPage'></table-list>
		<page-bar :total='playlistTotal' @pageChange='onPageChange' v-if='playlist.length!==0'></page-bar>
		<router-view></router-view>
	</div>
	
</template>


<script>
import {getPlaylist,getPlaylistLen} from 'network/playlist.js'
import TableList from './childComps/tablelist/TableList.vue'
import PageBar from 'components/common/pagebar/PageBar.vue'
	export default{
		name:"Music",
		data(){
			return {
				playlist:[],
				count:10,
				playlistTotal:-1,
				currentPage:1
			}
		},
		components:{
			TableList,
			PageBar
		},
		created(){
			this._getPlaylistLen()
			this._getPlaylist(0)
		},
		methods:{
			_getPlaylist(start){
				getPlaylist(start,this.count).then(res=>{
					// const result=res.data
					// this.playlist.push(...result)
					this.$refs.playlist.loading=false
					this.playlist=res.data
					console.log(res.data)
				}).catch(err=>{
					this.$refs.playlist.loading=false
					console.log(err)
				})
			},
			_getPlaylistLen(){
				getPlaylistLen().then(res=>{
					console.log(res.data)
					this.playlistTotal=res.data
					
				})
			},
			onPageChange(pageIndex){
				console.log(pageIndex)
				this.currentPage=pageIndex
				let start=this.count*(pageIndex-1)
				this._getPlaylist(start)
			},
			onSuccessDelPlay(){
				this.$refs.playlist.loading=false
				this._getPlaylist(this.currentPage)
				this._getPlaylistLen()
			}
		}
	}
</script>

<style scoped>
	
</style>