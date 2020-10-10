
import {request} from './request.js'

export function getPlaylist(start,count){
	return request({
        url:'/playlist/list',
        params:{
            start,
            count
        }
	})
}

export function getPlaylistLen(){
	return request({
        url:'/playlist/listLen'
	})
}

export function delPlaylist(params){
	return request({
        url:'/playlist/del',
        params
	})
}

export function getPlaylistInfo(playlistId){
	return request({
        url:'/playlist/info',
        params:{
              playlistId  
        }
	})
}

export function updatePlaylistInfo(playlist){
	return request({
        url:'/playlist/update',
        params:{
            playlist  
        }
	})
}