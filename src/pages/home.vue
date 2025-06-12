<template>
  <el-container class="outer1">
    <el-header class="header">喵ZK音乐管理系统</el-header>
    <el-container class="content">
      <el-aside class="aside">
        <h2>工作台</h2>
        <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#4f3232"
            text-color="#ffffff"
            active-text-color="#409EFF"
        >
          <el-menu-item index="1">
            <el-icon>
              <user/>
            </el-icon>
            <span @click="usershow">用户管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon>
              <user/>
            </el-icon>
            <span @click="musicshow">音乐管理</span>
          </el-menu-item>

          <el-menu-item index="3">
            <el-icon>
              <document/>
            </el-icon>
            <span @click="playedshow">播放记录管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting/>
            </el-icon>
            <span @click="favoriteshow">音乐收藏管理</span>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon>
              <user/>
            </el-icon>
            <span @click="likedshow">音乐点赞管理</span>
          </el-menu-item>
        </el-menu>

      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      users: []
    }
  },
  methods: {
    usershow() {
      this.$router.push("/user");
    },
    musicshow() {
      this.$router.push("/music");
    },
    likedshow() {
      this.$router.push("/liked");
    },
    favoriteshow() {
      this.$router.push("/favorite");
    },
    playedshow() {
      this.$router.push("/played");
    },
  },
  mounted() {
  }
}
</script>

<style>
.outer1 {
  position: relative;
  width: 100%;
  height: 100%;
}
h2{
  text-align: center;
  color: whitesmoke;
}
.header {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  height: 15%;
  margin-bottom: 20px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  line-height: 60px; /* 设置高度时配合垂直居中 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.content {
  position: relative;
  width: 100%;
  height: 85%;
}

.aside {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 10%;
  align-items: center;
  background-color: #4f3232; /* 深蓝色，可替换为你想要的颜色 */
  color: white; /* 设置字体颜色为白色更易读 */
}

.main {
  display: flex;
  position: relative;
  width: 90%;
  height: 100%;
}
</style>