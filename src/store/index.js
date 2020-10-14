import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const USER_KEY = 'login-user'
export default new Vuex.Store({
    state: {
        //当前用户的登录状态(token等数据)
        //将从本地存储获取到字符串转为对象形式
        // user: JSON.parse(window.localStorage.getItem('user'))
        user: getItem(USER_KEY)

    },
    mutations: {
        setUser(state, data) {
            state.user = data
                // 防止刷新页面导致数据丢失,将数据保存到本地存储,以数据持久化
                // window.localStorage.setItem('user', JSON.stringify(state.user))
            setItem(USER_KEY, state.user)

        }
    },
    actions: {},
    modules: {}
})