import Vue from 'vue'
import Router from 'vue-router'

const _import = path => require('@/components/' + path + '.vue').default

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'hash',
    routes: []
})

let noFind = {
    path: '/404',
    name: '404',
    component: _import('common/404'),
    meta: {
        title: '404'
    }
}

let login = {
    path: '/login',
    name: 'login',
    component: _import('common/login'),
    meta: {
        title: '登录'
    }
}

let main = {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: _import('layout/main'),
    meta: {
        title: '首页'
    },
    children: [
        {
            path: '/home',
            name: 'home',
            component: _import('content/home'),
            meta: {
                title: 'home'
            }
        },
        {
            path: '/fish',
            name: 'fish',
            component: _import('content/fish'),
            meta: {
                title: 'fish'
            }
        },
        {
            path: '/bug',
            name: 'bug',
            component: _import('content/bug'),
            meta: {
                title: 'bug'
            }
        },
        {
            path: '/stone',
            name: 'stone',
            component: _import('content/stone'),
            meta: {
                title: 'stone'
            }
        },
        {
            path: '/music',
            name: 'music',
            component: _import('content/music'),
            meta: {
                title: 'music'
            }
        }
    ]
}

router.addRoutes([noFind, login, main, {
    path: '*',
    redirect: '/404'
}])

export default router
