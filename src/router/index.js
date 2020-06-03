import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

// 配置路由懒加载
const Login = () => import('../views/login')
const Home = () => import('../views/home')
const Index = () => import('../components/index')
const Share = () => import('../components/share')
const myShare = () => import('../views/myShare')
const Zclb = () => import('../components/zclb')
const AssetRegister = () => import('../components/assetRegister')
const AttachmentManagement = () => import('../components/attachmentManagement')
const DD = () => import('../components/DD')
const userInfo = () => import('../components/userInfo')
const Shys = () => import('../components/shys')
const Wdzc = () => import('../components/wdzc')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    // 重定向
    redirect: '/login'
  },
  {
    path: '/login',
    name:'login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '',
        // 重定向
        redirect: '/index'
      },
      {
        path: '/index',
        component: Index,
      },
      {
        path: '/assetRegister',
        name:'assetRegister',
        component: AssetRegister,
      },
      {
        path: '/zclb',
        name:'zclb',
        component: Zclb,
      },
      {
        path: '/attachmentManagement',
        component: AttachmentManagement,
      },
      {
        path: '/share',
        component: Share,
      },
      {
        path: '/myshare',
        name:'myshare',
        component: myShare,
      },
      {
        path: '/DD',
        component: DD,
      },
      {
        path: '/userinfo',
        component: userInfo,
      },
      {
        path: '/shys',
        component: Shys,
      },
      {
        path: '/wdzc',
        component: Wdzc,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 注册路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
    if (token === 'null' || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
