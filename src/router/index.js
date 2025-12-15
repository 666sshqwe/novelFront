import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/Home.vue';
import Login from '../views/Login.vue'
import OnlieRead from '../views/OnlieRead.vue'
import NovelMenus from '../views/NovelMenus.vue'
import DownLoadTaskInfo from '@/views/DownLoadTaskInfo.vue';
import BlogDetail from '@/views/BlogDetail.vue';


Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      meta: { requiresAuth: true }, // 标记需要认证
      component: HomeView,
      children: [
        { path: '',  redirect: '/currentHot'  },
        { path: 'currentHot', component: () => import('@/views/CurrentHot.vue') },
        { path: 'query', component: () => import('@/views/Query.vue') },
        { path: 'downloadBook', component: () => import('@/views/DownloadBook.vue') },
        { path: 'readyToDownLoad', component: () => import('@/views/ReadyToDownLoad.vue') },
        {
          path: '/taskInfo',
          name: 'TaskInfo',
          component: DownLoadTaskInfo
        }
      ]
    },

    {
        path: '/mixDetail',
        name: 'mixDetail',
        component: BlogDetail
    },

    {
        path: '/taskInfo',
        name: 'TaskInfo',
        component: DownLoadTaskInfo
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/onlineRead',
        name: 'OnlineRead',
        component: OnlieRead
    },

    {
      path: '/NovelMenus',
      name: 'NovelMenus',
      component: NovelMenus
    },

    {
      path: '/onlineRead/:id',
      name: 'detail',
      component: OnlieRead,
      props: true
    }
]

const router = new VueRouter({
  mode: 'history', 
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 从 localStorage 或 store 中获取 token
  const token = localStorage.getItem('token') 
    || sessionStorage.getItem('token'); // 根据你的状态管理方式调整

  // 检查目标路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要认证的路由
    if (token) {
      // 已登录，允许访问
      next();
    } else {
      // 未登录，跳转到登录页
      // 可以携带 redirect 参数，登录后跳回原页面
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    // 不需要认证的路由（如登录页）
    if (token && to.path === '/login') {
      // 如果已登录还访问登录页，跳转到首页
      next({ path: '/currentHot' });
    } else {
      // 允许访问
      next();
    }
  }
});

export default router
