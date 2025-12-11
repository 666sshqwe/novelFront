<!-- src/components/BlogHeader.vue -->
<template>
  <div id="toolbarBox" class="toolbar-box">
    <div id="csdn-toolbar" class="toolbar">
      <div class="toolbar-inside exp3">
        <div class="toolbar-container">
          <div class="toolbar-container-left">
            <div class="toolbar-logo toolbar-subMenu-box csdn-toolbar-fl">
              <a href="https://www.csdn.net/">
               <img src="@/assets/csdn.png" alt="CSDN Logo" />
              </a>
            </div>
            <ul class="toolbar-menus csdn-toolbar-fl">
              <li><a href="https://blog.csdn.net/">博客</a></li>
              <li><a href="https://download.csdn.net/">下载</a></li>
              <li><a href="https://edu.csdn.net?utm_source=zhuzhantoolbar">学习</a></li>
              <li><a href="https://edu.csdn.net?utm_source=zhuzhantoolbar">社区</a></li>

              <!-- 可根据需要补充其他菜单项 -->
            </ul>
            <div class="toolbar-logo2 ">
                <a href="https://link.csdn.net?target=https%3A%2F%2Fgitcode.com%3Futm_source%3Dcsdn_toolbar" class="flex-align">
                    <img  src="@/assets/Git.png" alt="Git Logo" />
                GitCode</a>
            </div>

            <div class="toolbar-logo2 ">
                <a href="https://link.csdn.net?target=https%3A%2F%2Fgitcode.com%3Futm_source%3Dcsdn_toolbar" class="flex-align">
                    <img  src="@/assets/Ins.png" alt="Ins Logo" />
                InsCode</a>
            </div>

            <div class="toolbar-logo2 ">
                <a href="https://link.csdn.net?target=https%3A%2F%2Fgitcode.com%3Futm_source%3Dcsdn_toolbar" class="flex-align">
                    
                会议</a>
            </div>

            <div class="toolbar-logo2 ">
                <a href="https://link.csdn.net?target=https%3A%2F%2Fgitcode.com%3Futm_source%3Dcsdn_toolbar" class="flex-align">
                      <img  src="@/assets/Xt.png" alt="Xt Logo" />
                星图AI</a>
            </div>

          </div>

          <div class="toolbar-container-middle">
            <div class="toolbar-search onlySearch exp1">
              <input
        
                id="toolbar-search-input"
                type="text"
                placeholder="mybatis"
                v-model="searchQuery"
              />
              <button id="toolbar-search-button">
                <img src="@/assets/white-search.png" alt="搜索" class="btn-icon" />
                搜索</button>

              <button id="toolbar-AI-search-button" class="btn2Style">AI 搜索</button>
            </div>
            
          </div>

          <div class="toolbar-container-right">
            <a class="toolbar-btn-loginfun">登录</a>
            <a class="toolbar-fl" href="https://mall.csdn.net/vip">会员·新人礼包</a>
              <img src="@/assets/fl.png" alt="搜索" class="btn-icon" />
            <!-- 消息、收藏、创作中心等可按需添加 -->
             <a class="toolbar-fj" href="https://i.csdn.net/#/msg/index">消息</a>
             <a class="toolbar-fj" href="https://i.csdn.net/#/user-center/history">历史</a>
             <a class="toolbar-fj" href="https://mp.csdn.net">创作中心</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
</script>

<style scoped>

.toolbar-fj {
    color: #303133e0;
    font-size: 14px;
   
}

.toolbar-fl {
    color: #FC5531;
    font-weight: 500;
}

.toolbar-btn-loginfun {
     width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #e8e8ed;
    color: #222226;
    border-radius: 50%;
}

.btn2Style {
      text-align: center;
      background: linear-gradient(90deg, #ba88fa 0, #635bff 100%);
}

.btn-icon {
   text-align: center;
    display: inline-block;
    gap: 4px;
    text-decoration: none;
    width: 26px;
    height: 26px;
    vertical-align: middle;
    background-size: 100%;
    position: relative;
    top: 0px;
    margin-left: -6px;
}


.toolbar-box {
  min-height: 48px;
}
.toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1993;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 关键：让 toolbar-container 使用 flex 布局 */
.toolbar-container {
  display: flex;
  align-items: center;

  padding: 0px 34px; /* 可选：加点内边距 */
  height: 48px; /* 与 min-height 一致 */
}

.toolbar-container-left {
  display: flex;
  align-items: center;
  gap: 20px; /* logo 和菜单之间的间距 */
}

.toolbar-logo img {
     display: block;
    width: 80px;
    min-width: 80px;
    height: 42px;
    margin-top: calc((48px - 44px) / 2);
}

.toolbar-logo2 img {
    top: 1px;
    width: 20px;

}

.flex-align {
  display: flex;
  align-items: center; /* 垂直居中 */
  gap: 4px; /* 可选：控制图片和文字间距 */
  text-decoration: none;
}

.imgStyle{

}


.toolbar-menus {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px; /* 菜单项间距 */
}

.toolbar-menus li a {
  text-decoration: none;
  color: #333;
}

.toolbar-container-middle {
  flex: 1; /* 中间搜索栏占剩余空间 */
  max-width: 400px;
  margin: 0 20px;
}

.toolbar-search {
  display: flex;
  align-items: center;
    max-width: 400px;
}

.toolbar-search input,
.toolbar-search button {
  height: 32px; /* 统一高度 */
  padding: 0 12px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.toolbar-search input {
      width: 141px;
  padding-left: 36px; /* 为左侧图标留空间 */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23999' d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: 12px center;
  border-radius: 16px 16px 16px 16px; /* 右边圆，左边直 */
  background-size: 16px;
}

.toolbar-search button {
  background-color: #fc5531;
  color: white;
  border: none;
  border-radius: 16px 16px 16px 16px; /* 右边圆，左边直 */
  cursor: pointer;
  margin-left: 18px;
  width: 91px;
}

.toolbar-search button:hover {
  background-color: #c24428;
}

.toolbar-container-right {
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
}

.toolbar-container-right a {
  text-decoration: none;
   
    font-size: 14px;
}
</style>