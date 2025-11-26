<!-- src/views/Download.vue -->
<template>
  <div class="query-container" style="height: 100%; display: flex; flex-direction: column;">
    
  <!-- 上半部分：固定搜索区域 -->
    <div class="search-fixed">
      <el-card class="search-card" shadow="never">
        <div slot="header" class="search-header">
          <span>📚 目前:http://www.xbiqugu.la-笔趣阁</span>
          <el-button type="primary" @click="findWholeNovel">
            获取
          </el-button>
        </div>

         <div class="search-form">
          <el-input
            v-model="searchKey"
            placeholder="请输入小说名称"
            clearable
            @keyup.enter.native="handleSearch"
            style="width: 300px; margin-right: 10px;"
          ></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearch"
          >
            搜索
          </el-button>
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
          v-for="(book, index) in paginatedBooks"
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



                <div class="detail-info">
                  <h3 class="book-title">{{ book.bookName }}</h3>
                    <span v-if="book.bookState == 1" class="undo-color">未下载</span>
                    <span v-else-if="book.bookState == 2" class="did-color">已下载</span>
                     <span v-else-if="book.bookState == 3" class="did-color">已下载-有缺失</span>
                </div>
              
         
      
                <div class="downlaod-button">
                    <el-button size="small" type="primary" @click="addToDownLoad(book)">
                      加入下载
                      </el-button>
                </div>
        
       
            
            </div>
          </div>
        </el-card>



        <!-- 无数据提示 -->
        <el-empty v-if="books.length === 0 && !loading" description="暂无查询结果"></el-empty>
      </div>

      <!-- 分页器 -->
      <div class="pagination mt-4 text-center" v-if="books.length > 0">
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
</template>

<script>

import axios from 'axios';
export default {
  name: 'DownloadPage',
  data() {
    return {
      searchKey: '',
      loading: false,
      books: [],
      currentPage: 1,
      pageSize: 6
    }
  },
    async mounted() {
    this.loading = true;
    try {
      await this.findWholeNovel();
    } finally {
      this.loading = false;
    }
  },
      computed: {
      paginatedBooks() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.books.slice(start, end);
      },
      total() {
        return this.books.length;
      }
    },
    methods: {

      // 加入下载队列开始下载
     addToDownLoad(book) {
       axios.post('http://localhost:8899/download/downloadByTask', {
        novel:[
          {
            id: book.id,
            bookName: book.novelName,
            bookUrl: book.url,
            bookAuthor:book.auther
          }
        ]

      })
      .then(res => {

      })
      .catch(err => {
        console.error(err)

      })
    },
      
    // 从待下载中搜索 
    async handleSearch() {
      const key = this.searchKey.trim()
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:8899/waitDownLoad/queryWaitDownLoad`, {
          params: { bookName: key },
          headers: {
                      'Accept': 'application/json', // 明确指定接受JSON格式
                      'Content-Type': 'application/json'
                  }
        })
        
        this.books = response.data.data || []
      
         this.loading = false  // 数据加载成功后设置loading为false
      } catch (error) {
        console.error(error)
        this.$message.error('搜索失败，请重试')
      } finally {
         this.loading = false  // 数据加载成功后设置loading为false
      }
      this.currentPage = 1

    },

    // 搜索所有的小说
    async findWholeNovel() {
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:8899/waitDownLoad/queryWaitDownLoad`, {
           params: { bookName: "" }
        })
        
        this.books = response.data.data || []
      
         this.loading = false  // 数据加载成功后设置loading为false
      } catch (error) {
        console.error(error)
        this.$message.error('搜索失败，请重试')
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
    }
  }
}
</script>


<style scoped>

.downlaod-button {
      width: 81px;
    margin-top: 17px;
}

.undo-color {
    color: #dfbe93;
}

.did-color {
    color: #93df9b;
}

.search-header {
  display: flex;
  gap: 12px; /* 可选：设置两个元素之间的间距 */
  align-items: center;
}

.detail-info {
  display: flex;
  gap: 8px; /* 可选：设置两个元素之间的间距 */
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