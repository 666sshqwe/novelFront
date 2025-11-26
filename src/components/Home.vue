<template>
  <el-container class="home-container">



    <!-- 侧边栏 -->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" defaultActive="/currentHot" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>

        <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span slot="title">小说整理</span>
                </template>

                <el-menu-item-group>
                        <el-menu-item index="/currentHot">当天榜单</el-menu-item>
                        <el-menu-item index="/query">在线查询</el-menu-item>
                        <el-menu-item index="/downloadBook">已下载</el-menu-item>
                        <el-menu-item index="/readyToDownLoad">已缓存</el-menu-item>
                </el-menu-item-group>
        </el-submenu>

        <el-menu-item index="/taskInfo">
            <i class="el-icon-menu"></i>
             <span slot="title">待下载列表</span>
            
        </el-menu-item>


        <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">待定</span>
        </el-menu-item>


        <el-menu-item index="4">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">资源分享网址</span>
        </el-menu-item>

        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>

    
    </el-menu>


    <!-- 主体内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
           <span class="cursor-pointer" @click="isCollapse = !isCollapse">
                 <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                 <span class="ml-2">{{ isCollapse ? '展开' : '关闭' }}</span>
           </span>

        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
         
          </el-breadcrumb>
        </div>
        <div class="header-right">
              <span class="note-info" @click="showNoteInfo()">
                    <i class="el-icon-notebook-1" style="font-size: 24px;"></i>
              </span>

              <div class="user-info">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <span class="username">管理员</span>
              </div>
      </div>
      </el-header>

      <!-- 主体内容区域 -->
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>

.cursor-pointer {
  cursor: pointer;
}

.note-info{
  cursor: pointer;


}

.home-container {
  height: calc(100vh - 20px); 
 background: linear-gradient(135deg, #fdfdfd, #edf2f7);
}

.home-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.02) 1px, transparent 0);
  background-size: 50px 50px;
  pointer-events: none;
  opacity: 0.1;
  z-index: -1;
}

.aside {
  background-color: #ffffff;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.1);
}

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

.header {
  background:linear-gradient(135deg, #fdfdfd, #edf2f7);;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
}

.breadcrumb {
  font-size: 14px;
}

.user-info {
  display: flex;
  align-items: center;
}

.username {
  margin-left: 8px;
}

.main-content {
  padding: 20px;
  background-color: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  /* 关键：让 main-content 占满剩余空间 */
  height: calc(100vh - 60px); /* 60px ≈ header 高度 */
  overflow: hidden; /* 防止双滚动条 */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px; /* 控制图标和用户信息之间的间距，可调 */
}

/* 可选：给图标加一点内边距或大小调整 */
.header-icon {
  font-size: 18px;
}
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

    showNoteInfo(book) {
      this.$message.success(`展示加入书架的书`)
    }
    }
  }
</script>