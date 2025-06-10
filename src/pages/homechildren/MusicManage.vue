<template>
  <div class="outer1">
    <div class="top-input">
      <el-input class="search-input" v-model="title" placeholder="请输入歌曲名" type="text"/>
      <el-input class="search-input" v-model="artist" placeholder="请输入作者" type="text"/>
      <el-input class="search-input" v-model="album" placeholder="请输入专辑名" type="text"/>
      <el-input class="search-input" v-model="genre" placeholder="请输入音乐类型" type="text"/>
      <el-button @click="getMusicList">搜索</el-button>
    </div>
    <div class="tableshow">
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column prop="musicId" label="key" width="90"/>
        <el-table-column prop="title" label="歌名" width="180"/>
        <el-table-column prop="artist" label="作者" width="180"/>
        <el-table-column prop="album" label="专辑名" width="90"/>
        <el-table-column prop="genre" label="类别" width="90S"/>
        <el-table-column prop="releaseDate" label="歌曲时长" width="90"/>
        <el-table-column prop="coverUrl" label="封面图片url" width="160"/>
        <el-table-column prop="fileUrl" label="音乐url" width="160"/>
        <el-table-column fixed="right" label="操作" min-width="60">
          <template #default="scope">
            <el-button
                plain
                type="primary"
                size="small"
                @click="deleteRow(scope.row.musicId)"
            >
              删除
            </el-button>
            <el-button
                type="primary"
                size="small"
                @click="updateRow(scope.row.musicId)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 100%" @click="onAddItem()">
        添加歌曲
      </el-button>
    </div>
    <div>
      <el-drawer v-model="drawer" :with-header="false">
        <span>{{ title }}</span>
        <div class="add-container">
          <div>
            <span>歌名</span>
            <el-input class="add-input" v-model="new_title" placeholder="请输入歌名" type="text"/>
          </div>
          <div>
            <span>作者</span>
            <el-input class="add-input" v-model="new_artist" placeholder="请输入作者" type="text"/>
          </div>
          <div>
            <span>种类</span>
            <el-input class="add-input" v-model="new_genre" placeholder="请输入种类" type="text"/>
          </div>
          <div>
            <span>专辑名</span>
            <el-input class="add-input" v-model="new_album" placeholder="请输入专辑名称" type="text"/>
          </div>
          <div>
            <span>播放地址</span>
            <el-input class="add-input" v-model="fileUrl" placeholder="请输入播放地址" type="text"/>
          </div>
        </div>
        <el-button @click="AddorSaveSubmit()">提交</el-button>
      </el-drawer>
    </div>
  </div>
</template>


<script>
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  data() {
    return {
      title: "",
      artist: "",
      album: "",
      genre: "",
      duration: "",
      coverUrl: "",
      fileUrl: "",
      releaseDate: "",
      tableData: [],
      drawer: false,
      new_title: "",
      new_artist: "",
      new_album: "",
      new_genre: "",
      musicId: "",
    }
  },
  methods: {
    getMusicList() {
      let param = {
        "title": this.title,
        "artist": this.artist,
        "album": this.album,
        "genre": this.genre,
        "duration": this.duration,
        "releaseDate": this.releaseDate,
        "coverUrl": this.coverUrl,
        "fileUrl": this.fileUrl,
      }
      this.$axios.post("/music/list", param).then((res) => {
        this.tableData = res.data.data;
      })
    },
    deleteRow(id) {
      ElMessageBox.confirm(
          '你确定你要删除吗,此操作不可撤销?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            this.$axios.delete("/music/delete?id=" + id);
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '您取消了删除',
            })
          })
      this.getUserList();
    },
    onAddItem() {
      this.title = "添加歌曲";
      this.drawer = true;
      this.new_artist = "";
      this.new_title = "";
      this.new_album = "";
      this.new_genre = "";
    },
    updateRow(id) {
      this.title = "编辑歌曲";
      this.drawer = true;
      this.new_artist = "";
      this.new_title = "";
      this.new_album = "";
      this.new_genre = "";
      this.fileUrl = "";
      this.id = id;
    },
    AddorSaveSubmit() {
      let param = {}
      if (this.new_title != "" && this.new_title != null) {
        param.title = this.new_title;
      }
      if (this.new_artist != "" && this.new_artist != null) {
        param.artist = this.new_artist;
      }
      if (this.new_genre != "" && this.new_genre != null) {
        param.genre = this.new_genre;
      }
      if (this.new_album != "" && this.new_album != null) {
        param.album = this.new_album;
      }
      if (this.fileUrl != "" && this.fileUrl != null) {
        param.fileUrl = this.fileUrl;
      }
      console.log(param);
      if (this.title == "添加歌曲") {
        this.$axios.post("/music/add", param).then((res) => {
          res = res.data;
          if (res.code == 200) {
            this.$message("添加成功");
          } else {
            this.$message(res.msg);
          }
          this.getMusicList();
        })
      } else {
        param.musicUd = this.musicId;
        this.$axios.post("/music/update", param).then(() => {
          this.getMusicList();
        })
      }
    },
  },
  mounted() {
    this.getMusicList();
  }
}
</script>
<style>
.outer1 {
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.top-input {
  position: relative;
  width: 100%;
  height: 20%;
}

.search-input {
  position: relative;
  height: 25%;
  width: 20%;
}
</style>