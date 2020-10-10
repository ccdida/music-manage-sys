
import {request} from './request.js'

export function getSwiperlist(){
	return request({
		url:'/swiper/list'
	})
}

export function delFileid(params){
	return request({
		url:'/swiper/del',
		params
	})
}