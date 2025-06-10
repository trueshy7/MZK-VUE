<template>
  <el-container class="outer1">
    <el-header class="header">喵ZK音乐管理系统</el-header>
    <el-container class="content">
      <el-aside class="aside">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
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

.header {
  display: flex;
  position: relative;
  justify-content: center;
  justify-content: center;
  width: 100%;
  height: 15%;
  margin-bottom: 20px;
}

.content {
  position: relative;
  width: 100%;
  height: 85%;
}

.aside {
  position: relative;
  height: 100%;
  width: 10%;
}

.main {
  display: flex;
  position: relative;
  width: 90%;
  height: 100%;
}
</style>