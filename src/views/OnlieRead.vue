<template>
  <el-container class="home-container">
    <!-- 侧边栏 -->
  <!-- 侧边栏 -->
  <el-aside :width="isCollapse ? '64px' : '260px'" class="sidebar-container">
    <el-menu
      ref="sideMenu"
      active-text-color="#409EFF"
      :default-active="currentMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
    >
      <el-menu-item
        v-for="item in menuList"
        :key="item.id"
        :index="item.bookIndex"
        @click="handleMenuItemClick(item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>


    <!-- 主体内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
           <span class="cursor-pointer" @click="isCollapse = !isCollapse">
                 <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
                 <span class="ml-2">{{ isCollapse ? '展开' : '关闭' }}</span>
           </span>
          

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
        <div class="search-fixed">
          <el-card class="search-card" shadow="never">
            <div slot="header" class="search-header">
                  <div class="title-row">
                      <h2 class="book-title">{{ bookName }}</h2>
                  </div>
                  <div class="description">
                    {{ description }}
                  </div>
            </div>

          

          </el-card>
        </div>

      <div 
       ref="scrollContainer"
        class="reading-container" 
        :style="{
          fontSize: settings.fontSize + 'px',
          lineHeight: settings.lineHeight,
          color: settings.textColor,
          backgroundColor: settings.bgColor
        }"
      >

        <h1 class="chapter-title">{{ currentChapterTitle }}</h1>
        <div class="chapter-content" ref="content">
          <p v-for="(paragraph, index) in paragraphs" :key="index" class="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>
      </el-main>

      
    </el-container>


  </el-container>
</template>

<script>
export default {
  name: 'Home',
};
</script>


<script>
import axios from 'axios';

  export default {
    props: ['id'], 
    data() {
      return {
        paragraphs: [],
        isCollapse: false,
        bookName:"",
        bookUrl:"",
        bookId:"",
        author: '',
        updateTime: '',
        description: '',
        menuList: [],
        currentMenu: "",
        savedScrollTop: 0,
      
      // 当前章节索引
      currentChapterIndex: 0,
      
      currentChapterTitle:"",
      currentChapter:{},
      // 阅读设置
      settings: {
        fontSize: 16,
        lineHeight: '1.6',
        bgColor: '#ffffff',
        textColor: '#000000'
      },
      
      // 对话框控制
      settingsDialogVisible: false,
      chapterListVisible: false
              
 
      };
    },
    methods: {
            showNoteInfo(book) {
              this.$message.success(`展示加入书架的书`)
            },

            // 菜单项中子菜单点击打开回调事件
            handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },

            // 菜单项中子菜单点击关闭回调事件
            handleClose(key, keyPath) {
              console.log(key, keyPath);
            },

            // 菜单项中子菜单点击事件
            handleMenuItemClick(item) {
              const chapterId = item.id;
              this.loadChapterContent(chapterId);
              this.currentMenu = item.bookIndex;
              this.scrollToTop();
            },

             // 滚动到顶部
            scrollToTop() {
              const container = this.$refs.scrollContainer;
              if (container) {
                container.scrollTop = 0;
              }
            },

            // 页面打开时调用,加载小说信息和章节列表
            async loadNovelInfo() {
              this.loading = true
              try {
                const response = await axios.get(`http://localhost:8899/download/getNovelInfo`, {
                  params: { bookId: this.bookId},
                  headers: {
                              'Accept': 'application/json', // 明确指定接受JSON格式
                              'Content-Type': 'application/json'
                          }
                })
                if(response.data.data !=undefined && response.data.data.chapters !=undefined){
                  //  { index: '1', title: '章节1', icon: 'el-icon-s-order',path: '/OnlineRead/1'},
                  this.menuList = [];
                  response.data.data.chapters.forEach((chapter, index) => {
                    this.menuList.push({
                      id: chapter.id,
                      title: chapter.chaptName,
                      order: chapter.chapterOrder,
                      downloadId: chapter.downloadId,
                      bookIndex:  chapter.chaptName+"-"+chapter.chapterOrder,
                      icon: 'el-icon-s-order'
                    })
                  })

                }
                this.loading = false  // 数据加载成功后设置loading为false
              } catch (error) {
                console.error(error)
                this.$message.error('获取失败，请重试')
              } finally {
                this.loading = false  // 数据加载成功后设置loading为false
              }
             

            },


            // 加载对应的章节内容
         async   loadChapterContent(id) {
              
              this.loading = true
             
              try {
                const response = await axios.get(`http://localhost:8899/download/getChapterInfo`, {
                  params: { chapterId: id}
                })
                if(response.data.data !=undefined ){
                
                  const chapterData = response.data.data;
                    this.description = chapterData.chaptName;
                      this.currentChapter = {
                            title: chapterData.chaptName,
                            content: chapterData.context
                          }         

                      this. currentChapterTitle =  chapterData.title
                        // 将内容按段落拆分
                      this.paragraphs = chapterData.context.split('\r\n').filter(p => p.trim())
                }
                this.loading = false  // 数据加载成功后设置loading为false
              } catch (error) {
                console.error(error)
                this.$message.error('获取失败，请重试')
              } finally {
                this.loading = false  // 数据加载成功后设置loading为false
              }
            },


          
            // 打开设置
            openSettings() {
              this.settingsDialogVisible = true
            },
          

          
            // 打开章节列表
            openChapterList() {
              this.chapterListVisible = true
            },
            
            // 选择章节
            selectChapter(index) {
              this.currentChapterIndex = parseInt(index)
              this.chapterListVisible = false
              this.scrollToTop()
            },
          



    },

    watch: {

        isCollapse(newVal) {
          if (newVal) {
            // 即将收起 → 保存当前滚动位置
            this.savedScrollTop = this.$refs.sideMenu?.$el?.scrollTop || 0;
            
          } else {

            // 展开后，延迟 3 秒恢复滚动位置（不推荐，但可行）
            setTimeout(() => {
              if (this.$refs.sideMenu) {
                this.$refs.sideMenu.$el.scrollTop = this.savedScrollTop;
              }
            }, 500);
          }
        },

    },
    computed: {

    


    },
    
    async mounted() {

        this.loading = true;
        try {
          await this.loadNovelInfo();
        } finally {
          this.loading = false;
        }

        // 记录阅读历史
        this.$nextTick(() => {
          this.scrollToTop()
        })
      },
    created() {
      // 获取 query 参数
      this.bookName = this.$route.query.bookName;
      this.bookId = this.$route.query.bookId;

    },
  }
</script>

<style scoped>

.header-right {
  display: flex;
  align-items: center;
  gap: 16px; /* 控制图标和用户信息之间的间距，可调 */
}

.note-info{
  cursor: pointer;


}
.cursor-pointer {
  cursor: pointer;
}


  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 260px;
    min-height: 400px;
  }

.header {
  background-color:linear-gradient(135deg, #fdfdfd, #edf2f7);;
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
  padding: 7px;
  background-color: #fdfdfd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  /* 关键：让 main-content 占满剩余空间 */
  height: calc(100vh - 60px); /* 60px ≈ header 高度 */
  overflow: hidden; /* 防止双滚动条 */
}


.reading-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}


.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.book-title {
  margin: 0 20px;
  font-size: 18px;
  color: #303133;
}



.reading-container {
  height: 76%;
  padding: 20px;
  overflow-y: auto;
  transition: all 0.3s;
}

.chapter-title {
  text-align: center;
  margin-bottom: 30px;
  color: inherit;
}

.chapter-content {
  max-width: 100%;
  margin: 0 auto;
}

.paragraph {
  margin-bottom: 20px;
  text-indent: 2em;
  color: inherit;
}

.footer {
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  padding: 10px 20px;
}

.control-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chapter-info {
  font-size: 14px;
  color: #606266;
}

.navigation-buttons {
  display: flex;
  gap: 10px;
}

.settings-form {
  padding: 20px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .reading-container {
    padding: 15px;
  }
  
  .control-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .chapter-info {
    order: 2;
  }
  
  .navigation-buttons {
    order: 1;
  }
}

.home-container {
  height: 97vh; /* 整个容器占满视口高度 */
  overflow: hidden; /* 防止 body 出现滚动条 */
}

.sidebar-container {
  /* 侧边栏容器本身不需要滚动，但需限制高度 */
  height: 100%;
  /* overflow: hidden; */
}

.el-menu-vertical-demo {
  height: 100%; /* 占满侧边栏高度 */
  overflow-y: auto; /* 超出时滚动 */
  border-right: none;
}


.query-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

/* 固定搜索栏 */
.search-fixed {
  flex-shrink: 0; /* 不压缩 */
  margin-bottom: 16px;
}

.search-card ::v-deep .el-card__header {
  padding: 10px 16px;
}
.search-card ::v-deep .el-card__body {
  padding: 14px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.book-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta-row {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

/* 第三行：简介 */
.description {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  word-break: break-word;
}

/* 可滚动区域 */
.result-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px; /* 微调避免滚动条遮挡 */
}

/* 滚动条美化（可选） */
.result-scroll-area::-webkit-scrollbar {
  width: 6px;
}
.result-scroll-area::-webkit-scrollbar-thumb {
  background-color: #c1c1c1;
  border-radius: 3px;
}
.result-scroll-area::-webkit-scrollbar-track {
  background-color: transparent;
}

/* 卡片样式 */
.book-item {
  transition: all 0.3s ease;
}
.mb-3 {
  margin-bottom: 12px;
}

.book-content {
  display: flex;
  align-items: flex-start;
}

.book-cover {
  margin-right: 16px;
}

.book-info {
  flex: 1;
}

.book-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: #333;
}

.book-intro {
  margin: 5px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.pagination {
  margin: 20px 0;
}
</style>