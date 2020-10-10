
import {request} from './request.js'

export function getBloglist(){
	return request({
		url:'/bloglist/list'
	})
}



export function delBlog(params){
	return request({
		url:'/bloglist/del',
		params
	})
}