<!-- src/views/BlogDetail.vue -->
<template>
  <div class="blog-page">
    <BlogHeader />
    <div class="main-content">
      <article class="blog-content">
        <!-- 此处放文章正文（可使用 markdown 渲染） -->
        <h1>MyBatis-Plus 核心设计原理</h1>
        <div id="content_views" v-html="articleContent"></div>
      </article>
      <BlogAside />
    </div>
  </div>
</template>

<script setup>
import BlogHeader from '@/components/BlogHeader.vue'
import BlogAside from '@/components/BlogAside.vue'

// 模拟文章内容（实际应通过 API 获取）
const articleContent = `
  <h3 id="t0">1. MyBatis-Plus 核心设计理念</h3>
  <h4 id="t1">1.1 减少代码量</h4>
  <p>MyBatis-Plus 的设计初衷...</p>
`
</script>

<style scoped>
.blog-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
    
    margin-top: 3px;

    width: 1318px;
    margin-left: auto;
    margin-right: auto;
    background: #f9f9f9;
    border-radius: 8px;
}
.blog-content {
  flex: 1;
  margin-right: 32px;
        width: 1010px;
  float: right;
  background: white;
  padding: 24px;
  border-radius: 8px;
}
</style>