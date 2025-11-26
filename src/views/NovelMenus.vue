<template>
  <div class="full-page-wrapper">

      <div class="query-container" >

        <!-- 上半部分：固定搜索区域 -->
            <div class="search-fixed">
              <el-card class="search-card" shadow="never">
                <div slot="header" class="search-header">
                      <div class="title-row">
                          <h2 class="book-title">{{ bookName }}</h2>
                          <el-button type="primary" size="small" @click="beginDownLoad">
                            点击下载
                          </el-button>
                      </div>

                      <div class="meta-row">
                        <h2>{{ author }}</h2>
                        <h2>{{ updateTime }}</h2>
                      </div>

                      <div class="description">
                        {{ description }}
                      </div>
                </div>

              </el-card>
            </div>


            <!-- 下半部分：可滚动的结果列表 -->
            <div class="result-scroll-area">
            <!-- 加载中 -->
            <el-skeleton v-if="loading" :rows="6" animated />

            <!-- 卡片列表 -->
            <div v-else>

                <el-card
                v-for="(book, index) in menus"
                :key="index"
                class="book-item mb-3"
                shadow="hover"
                >
                <div class="book-content">
                    <!-- 左侧：封面图 -->
                    <div class="book-cover">
                    <el-image
                        :src="book.cover || 'https://via.placeholder.com/60x80?text=No+Cover'"
                        fit="cover"
                        style="width: 60px; height: 80px; border-radius: 4px;"
                    ></el-image>
                    </div>

                    <!-- 右侧：信息 -->
                    <div class="book-info">
                    
                    <p class="book-intro">{{ book.chapName }}</p>
                    
                    </div>
                </div>
                </el-card>



                <!-- 无数据提示 -->
                <el-empty v-if="menus.length === 0 && !loading" description="暂无查询结果"></el-empty>
            </div>

            <!-- 分页器 -->
            <div class="pagination mt-4 text-center" v-if="menus.length > 0">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[6, 8, 12]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="total"
                background
                />
            </div>

            
            </div>
      </div>

  </div>
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
        isCollapse: false,
        loading: false,
        bookName:"",
        bookUrl:"",
        author: '',
        updateTime: '',
        description: '',
        menus: [],
        mainUrl:"",
        currentPage: 1,
        pageSize: 6,
      
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

            async loadNovelInfo() {
      
                this.loading = true

                try {
                  const response = await axios.get(`http://localhost:8860/store/getMenuInfo`, {
                    params: { name: this.bookName ,url: this.bookUrl},
                    headers: {
                                'Accept': 'application/json', // 明确指定接受JSON格式
                                'Content-Type': 'application/json'
                            }
                  })
                  
                  this.author = response.data.data.author || ""
                  this.updateTime = response.data.data.lastTime || ""
                  this.description = response.data.data.details || ""
                  this.menus = response.data.data.menus || []
                  this.mainUrl = response.data.data.mainUrl || ""

                  this.loading = false  // 数据加载成功后设置loading为false
                  
                } catch (error) {
                  console.error(error)
                  this.$message.error('获取失败，请重试')
                } finally {
                  this.loading = false  // 数据加载成功后设置loading为false
                }
                this.currentPage = 1

            },

            handleCurrentChange(val) {
                this.currentPage = val
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.currentPage = 1
            },

          
            beginDownLoad() {
              // 开始下载
                this.$message.success(`开始下载==>`+this.mainUrl)
          
                axios.get('http://localhost:8899/download/downLoadSingle', {
                  params: {
                    url: this.mainUrl
                  }
                })
                .then(res => {
                  console.log(res.data)

                })
                .catch(err => {
                  console.error(err)

                })
             
            },

          
          // 滚动到顶部
          scrollToTop() {
            this.$nextTick(() => {
              const content = this.$refs.content
              if (content) {
                content.scrollTop = 0
              }
            })
          },



    },

    watch: {
  // 监听路由变化
       '$route': 'loadChapter'
    },
    computed: {

            paginatedBooks() {
                const start = (this.currentPage - 1) * this.pageSize
                const end = start + this.pageSize
                return this.menus.slice(start, end)
            },

            total() {
                 return this.menus.length
            }

  },
    
 async mounted() {

    this.loading = true;
    try {
      await this.loadNovelInfo();
    } finally {
      this.loading = false;
    }

  },
    created() {
    // 获取 query 参数
    this.bookName = this.$route.query.bookName;
    this.bookUrl = this.$route.query.bookUrl;

  },
  }
</script>

<style scoped>

.full-page-wrapper {
  height: 97vh; /* 使用视口高度，不依赖父级 */
  overflow: hidden; /* 阻止外部滚动 */
  box-sizing: border-box;
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