<!-- src/views/Download.vue -->
<template>
  <div class="query-container" style="height: 100%; display: flex; flex-direction: column;">
    
  <!-- 上半部分：固定搜索区域 -->
    <div class="search-fixed">
      <el-card class="search-card" shadow="never">
        <div slot="header" class="search-header">
          <span>📚 当前任务队列-下载: downLoad:queue</span>
          <el-button type="primary" @click="queryTask('downLoad:queue')">
            查看
          </el-button>
        </div>

        <div slot="header" class="search-header">
          <span>📚 当前任务队列-补偿: backDown:queue</span>
          <el-button type="primary" @click="queryTask('backDown:queue')">
            查看
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
          v-for="(taskInfo, index) in paginatedBooks"
          :key="index"
          class="book-item mb-3"
          shadow="hover"
        >
          <div class="book-content">


            <!-- 右侧：信息 -->
            <div class="book-info">

                <div class="detail-info">
                  <h3 class="book-title">{{ taskInfo.bookName }}</h3>
      
                </div>

            </div>
          </div>
        </el-card>



        <!-- 无数据提示 -->
        <el-empty v-if="taskInfo.length === 0 && !loading" description="暂无查询结果"></el-empty>
      </div>

      <!-- 分页器 -->
      <div class="pagination mt-4 text-center" v-if="taskInfo.length > 0">
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
      taskInfo: [],
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
        return this.taskInfo.slice(start, end);
      },
      total() {
        return this.taskInfo.length;
      }
    },
    methods: {

      
    // 搜索所有的小说
    async queryTask(taskKey) {
      this.loading = true
      try {
        const response = await axios.get(`http://localhost:8899/download/queryTaskQueue`, {
           params: { taskKey: taskKey }
        })
        
        this.taskInfo = response.data.data || []
      
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
  margin-top: 5px;
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