import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../components/Home.vue';
import Login from '../views/Login.vue'
import OnlieRead from '../views/OnlieRead.vue'
import NovelMenus from '../views/NovelMenus.vue'
import DownLoadTaskInfo from '@/views/DownLoadTaskInfo.vue';

Vue.use(VueRouter)

const routes = [
    {
      path: '/',
      component: HomeView, // 主布局
      redirect: '/currentHot',
      children: [
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
    mode: 'history', // 可选：去掉 URL 中的 #
  routes
})

export default router
