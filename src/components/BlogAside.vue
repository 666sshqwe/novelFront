<!-- src/components/BlogAside.vue -->
<template>
  <aside class="blog_container_aside">
    <!-- 作者信息 -->
    <div id="asideProfile" class="aside-box active">
      <div class="profile-intro d-flex">
        <img :src="author.avatar" :alt="author.name" class="avatar_pic" />
        <div class="user-info">
          <a :href="author.blogUrl">{{ author.name }}</a>
          <p>码龄 {{ author.years }}年</p>
        </div>
      </div>
      <div class="profile-intro-rank-information">
        <dl class="author-stat"><dd>{{ author.articles }}</dd><dt>原创</dt></dl>
        <dl class="author-stat"><dd>{{ author.fans }}</dd><dt>粉丝</dt></dl>
      </div>
    </div>

    <!-- 目录 -->
    <div id="asidedirectory" class="aside-box">
      <h3 class="aside-title">目录</h3>
      <div class="toc-box">
        <ol>
          <li v-for="item in toc" :key="item.id">
            <a :href="item.href">{{ item.title }}</a>
            <ol v-if="item.children">
              <li v-for="child in item.children" :key="child.id">
                <a :href="child.href">{{ child.title }}</a>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>

    <!-- 分类专栏 -->
    <div id="asideCategory" class="aside-box">
      <h3 class="aside-title">分类专栏</h3>
      <ul>
        <li v-for="col in columns" :key="col.id">
          <a :href="col.url">{{ col.name }}</a>
          <span>{{ col.count }}篇</span>
        </li>
      </ul>
    </div>

    <!-- 上一篇 / 下一篇 -->
    <div class="article-previous">
      <dl>
        <dt>上一篇：</dt>
        <dd><a :href="prevArticle.url">{{ prevArticle.title }}</a></dd>
      </dl>
      <dl class="next">
        <dt>下一篇：</dt>
        <dd><a :href="nextArticle.url">{{ nextArticle.title }}</a></dd>
      </dl>
    </div>
  </aside>
</template>

<script setup>
// 模拟数据（实际应通过 API 获取）
const author = {
  name: 'drebander',
  avatar: 'https://profile-avatar.csdnimg.cn/442d6667c7d34ec99a5566263ce645a9_u012561308.jpg!1',
  blogUrl: 'https://blog.csdn.net/u012561308',
  years: 12,
  articles: 274,
  fans: 2275
}

const toc = [
  { id: 't0', title: '1. MyBatis-Plus 核心设计理念', href: '#t0', children: [
    { id: 't1', title: '1.1 减少代码量', href: '#t1' },
    { id: 't2', title: '1.2 灵活性与扩展性', href: '#t2' },
    { id: 't3', title: '1.3 无侵入设计', href: '#t3' }
  ]},
  { id: 't4', title: '2. MyBatis-Plus 的核心设计', href: '#t4', children: [
    { id: 't5', title: '2.1 通用 CRUD 操作', href: '#t5' },
    { id: 't6', title: '2.2 条件构造器', href: '#t6' },
    // ...其他节点
  ]}
]

const columns = [
  { id: 1, name: 'mybatis-plus', url: '#', count: 23 },
  { id: 2, name: 'docker', url: '#', count: 24 },
  { id: 3, name: 'spring', url: '#', count: 12 }
]

const prevArticle = { title: 'Spring 之 SseEmitter —— 让你的进度条实时更新', url: '#' }
const nextArticle = { title: '除了增删改查，MyBatis-Plus 中的这些方法，你知道吗？', url: '#' }
</script>

<style scoped>

.author-stat {
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中对齐 */
  margin: 0;
  padding-left: 13px;
  font-size: 14px;
}
.author-stat dt{
  margin: 0; /* 清除默认 margin */
  font-size: 12px;
  color: #666;
}
.author-stat dd {
  margin: 0; /* 清除默认 margin */
  font-size: 14px;
}
.author-stat dd {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}


.profile-intro-rank-information{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 76px;

    margin-top: 16px;
    border-radius: 2px;
    background: #fafafa;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;

}

.blog_container_aside {
  background:#e4e7ed;
  position: sticky;
  top: 3px;
  align-self: flex-start;
  width: 300px;
  padding: 16px;
  font-size: 14px;
}
.aside-box {
  margin-bottom: 24px;
}
.aside-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}
.toc-box ol {
  list-style: none;
  padding-left: 16px;
}
.toc-box a {
  color: #333;
  text-decoration: none;
}
.toc-box a:hover {
  color: #007bff;
}
.article-previous a {
  color: #007bff;
}
</style>