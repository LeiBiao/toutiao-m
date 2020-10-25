import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'login',
    component: () =>
        import ('@/views/login/')
}, {
    path: '/',
    component: () =>
        import ('@/views/layout/'),
    children: [{
            path: '', //默认子路由
            name: 'home',
            component: () =>
                import ('@/views/home/')
        },
        {
            path: '/my',
            name: 'my',
            component: () =>
                import ('@/views/my/')
        },
    ]
}, {
    path: '/search',
    name: 'search',
    component: () =>
        import ('@/views/search/')
}, {
    path: '/article/:articleId',
    name: 'article',
    component: () =>
        import ('@/views/article/'),
    // 将动态路由参数映射到组件的props中
    props: true
}]

const router = new VueRouter({
    routes
})

export default router