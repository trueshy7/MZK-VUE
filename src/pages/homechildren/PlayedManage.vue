<template>
  <div class="outer">
    <div class="top-input">
      <el-input class="search-input" v-model="username" placeholder="请输入用户名" type="text"/>
      <el-input class="search-input" v-model="musictitle" placeholder="请输入歌曲名" type="text"/>
      <el-input class="search-input" v-model="starttime" placeholder="请输入起始时间" type="text"/>
      <el-input class="search-input" v-model="endtime" placeholder="请输入结束时间" type="text"/>
      <el-button @click="getPlayRecordsList" class="search-button" type="default">搜索</el-button>
    </div>
    <div class="table-show">
      <el-table :data="tableData" class="table-item-show" header-align="center">
        <el-table-column prop="playId" label="key" class="table-item"/>
        <el-table-column prop="username" label="用户名" class="table-item"/>
        <el-table-column prop="title" label="歌曲名" class="table-item"/>
        <el-table-column prop="startTime" label="播放时间" class="table-item"/>
        <el-table-column fixed="right" label="操作" class="table-item">
          <template #default="scope">
            <el-button
                plain
                type="primary"
                size="small"
                @click="deleteRow(scope.row.playId)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      username: "",
      musictitle: "",
      starttime: "",
      endtime: "",
      tableData: [],
    }
  },
  methods: {
    getPlayRecordsList() {
      let param = {
        "username": this.username,
        "title": this.musictitle,
        "starttime": this.starttime,
        "endtime": this.endtime,
      }
      this.$axios.post("/playrecords/list", param).then((res) => {
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
        console.log(id);
        await this.$axios.delete("/playrecords/delete?id=" + id); // 等待删除完成
        await this.getPlayRecordsList();                          // 然后刷新数据
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
  },
  mounted() {
    this.getPlayRecordsList();
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
}

.search-input {
  position: relative;
  height: 60%;
  width: 20%;
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
  width: 10%;
  justify-content: center;
}
</style>
