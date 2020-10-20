/**
 * 封装axios请求模块
 */
import axios from "axios"
// 获取到store
import store from "@/store/"

const request = axios.create({
        baseURL: "http://ttapi.research.itcast.cn"

    })
    // 请求拦截器
request.interceptors.request.use(function(config) {
    // console.log(config);
    const { user } = store.state
        // 如果以登录,给用户设置token信息
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
}, function(error) {
    return Promise.reject(error)
})

export default request