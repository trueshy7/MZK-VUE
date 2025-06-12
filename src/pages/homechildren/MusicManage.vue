<template>
  <div class="outer">
    <div class="top-input">
      <el-input class="search-input" v-model="title" placeholder="请输入歌曲名" type="text"/>
      <el-input class="search-input" v-model="artist" placeholder="请输入作者" type="text"/>
      <el-input class="search-input" v-model="album" placeholder="请输入专辑名" type="text"/>
      <el-input class="search-input" v-model="genre" placeholder="请输入音乐类型" type="text"/>
      <el-button @click="getMusicList" class="search-button">搜索</el-button>
    </div>
    <div class="table-show">
      <el-table :data="tableData" class="table-item-show">
        <el-table-column prop="musicId" label="key" class="table-item" width="50%"/>
        <el-table-column prop="title" label="歌名" class="table-item" width="100%"/>
        <el-table-column prop="artist" label="作者" class="table-item" width="100%"/>
        <el-table-column prop="album" label="专辑名" class="table-item" width="80%"/>
        <el-table-column prop="genre" label="类别" class="table-item" width="60%"/>
        <el-table-column prop="duration" label="歌曲时长" class="table-item" width="80%"/>
        <el-table-column prop="coverUrl" label="封面图片url" class="table-item"/>
        <el-table-column prop="fileUrl" label="音乐url" class="table-item"/>
        <el-table-column fixed="right" label="操作" min-width="90%" class="table-item">
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
                @click="updateRow(scope.row.musicId,scope.$index)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 90%" @click="onAddItem()">
        添加歌曲
      </el-button>
    </div>
    <div>
      <el-drawer v-model="drawer" :with-header="false">
        <h3>{{ title1 }}</h3>
        <div class="add-container">
          <div class="edit">
            <el-icon>
              <Headset/>
            </el-icon>
            <el-input class="add-input" v-model="new_title" placeholder="请输入歌名" type="text"/>
          </div>
          <div class="edit">
            <el-icon>
              <User/>
            </el-icon>
            <el-input class="add-input" v-model="new_artist" placeholder="请输入作者" type="text"/>
          </div>
          <div class="edit">
            <el-icon>
              <Search/>
            </el-icon>
            <el-input class="add-input" v-model="new_genre" placeholder="请输入种类" type="text"/>
          </div>
          <div class="edit">
            <el-icon>
              <Files/>
            </el-icon>
            <el-input class="add-input" v-model="new_album" placeholder="请输入专辑名称" type="text"/>
          </div>
          <div class="edit">
            <el-icon>
              <Position/>
            </el-icon>
            <el-input class="add-input" v-model="fileUrl" placeholder="请输入播放地址" type="text"/>
          </div>
        </div>
        <el-button @click="AddorSaveSubmit()" type="success">提交</el-button>
      </el-drawer>
    </div>
  </div>
</template>


<script>
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  data() {
    return {
      title1: "",
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
    async deleteRow(id) {
      try {
        await ElMessageBox.confirm(
            '你确定你要删除吗，此操作不可撤销?',
            'Warning',
            {
              confirmButtonText: 'OK',
              cancelButtonText: '取消',
              type: 'warning',
            }
        );

        await this.$axios.delete("/music/delete?id=" + id); // 等待删除完成
        await this.getMusicList();                          // 然后刷新数据
        ElMessage({
          type: 'success',
          message: '删除成功',
        });
      } catch (error) {
        ElMessage({
          type: 'info',
          message: '您取消了删除',
        });
      }
    },
    onAddItem() {
      this.title1 = "添加歌曲";
      this.drawer = true;
      this.new_artist = "";
      this.new_title = "";
      this.new_album = "";
      this.new_genre = "";
      this.fileUrl = "";
    },
    updateRow(id, index) {
      this.title1 = "编辑歌曲";
      this.drawer = true;
      this.new_artist = this.tableData[index].artist;
      this.new_title = this.tableData[index].title;
      this.new_album = this.tableData[index].album;
      this.new_genre = this.tableData[index].genre;
      this.fileUrl = this.tableData[index].fileUrl;
      this.musicId = this.tableData[index].musicId;
    },
    async AddorSaveSubmit() {
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
      try {
        if (this.title1 === "添加歌曲") {
          let res = await this.$axios.post("/music/add", param);
          res = res.data;
          console.log(res);
          if (res.code === 200) {
            await this.getMusicList(); // 确保刷新完成
            this.$message("添加成功");
          } else {
            this.$message(res.msg);
          }
        } else {
          param.musicId = this.musicId;
          let res = (await this.$axios.post("/music/update", param)).data;
          console.log(res);
          if (res.code === 200) {
            await this.getMusicList(); // 确保刷新完成
            this.$message("更新成功");
          } else {
            this.$message(res.msg);
          }
          await this.getMusicList();
        }
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
  },
  mounted() {
    this.getMusicList();
  }
}
</script>
<style>
.outer {
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.top-input {
  position: relative;
  width: 100%;
  height: 10%;
}

.search-input {
  position: relative;
  height: 60%;
  width: 20%;
}

.table-show {
  width: 90%;
  height: 75%;
}

.search-button {
  margin-left: 30px;
}

.table-show {
  width: 100%;
  height: 100%;
}

.table-item-show {
  height: 100%;
  width: 90%;
  max-height: 78%;
}

.table-item {

}
</style>