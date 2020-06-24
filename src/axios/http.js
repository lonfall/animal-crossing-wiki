import axios from 'axios'
import cookie from 'vue-cookies'
import store from '../store'
import api from '@/config/interface'

// axios默认配置
axios.defaults.timeout = 10000 // 超时时间
axios.defaults.baseURL = api.api_host
axios.defaults.crossDomain = true // 跨域
axios.defaults.withCredentials = true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息

// 整理数据
axios.defaults.transformRequest = function (data) {
    data = JSON.stringify(data)
    return data
}

function isJSONString(str) {
    if (typeof str === 'string') {
        try {
            var obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.log('error：' + str + '!!!' + e)
            return false
        }
    }
    return false
}

// 响应数据格式化
axios.defaults.transformResponse = function (data) {
    if (isJSONString(data)) {
        return JSON.parse(data)
    } else {
        return data
    }
}

// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        if (cookie.get('token')) {
            config.headers['token'] = cookie.get('token')
        }

        return config
    },
    error => {
        return Promise.reject(error.response)
    }
)

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 401) {
            console.log('响应拦截', response.data.msg)
            // 清空登录信息
            cookie.remove('token')
            store.commit('setUser', null)
            return response
        } else if (response.data.resultCode === '404') {
            console.log('response.data.resultCode是404')
            // 跳转到登录页面
            // window.location.href = 'http://127.0.0.1:8080/#/login'
        } else if (response.headers['refreshToken']) {
            // 如果有更新cookie则更新
            cookie.set("token", response.headers['refreshToken'])
            return response
        } else {
            return response
        }
    },
    error => {
        return Promise.reject(error.response) // 返回接口返回的错误信息
    }
)

export default axios
