<template>
  <div class="outer">
    <div class="top-input">
      <el-input class="search-input" v-model="username" placeholder="请输入用户名" type="text"/>
      <el-input class="search-input" v-model="email" placeholder="请输入邮箱" type="text"/>
      <el-input class="search-input" v-model="age" placeholder="请输入年龄" type="text"/>
      <el-button @click="getUserList" class="search-button" type="default">搜索</el-button>
    </div>
    <div class="table-show">
      <el-table :data="tableData" class="table-item-show">
        <el-table-column prop="userId" label="key" width="60%"/>
        <el-table-column prop="username" label="用户名" width="120"/>
        <el-table-column prop="email" label="邮箱" width="120"/>
        <el-table-column prop="age" label="年龄" width="90"/>
        <el-table-column prop="gender" label="性别" width="90"/>
        <el-table-column prop="status" label="用户状态" width="90"/>
        <el-table-column prop="createTime" label="注册时间" width="180"/>
        <el-table-column prop="lastLogin" label="最近登录时间" width="180"/>
        <el-table-column fixed="right" label="操作" min-width="60">
          <template #default="scope">
            <el-button
                plain
                type="primary"
                size="small"
                @click="deleteRow(scope.row.userId)"
            >
              删除
            </el-button>
            <el-button
                type="primary"
                size="small"
                @click="updateRow(scope.row.userId,scope.$index)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 90%" @click="onAddItem()">
        添加用户
      </el-button>
    </div>
    <div>
      <el-drawer v-model="drawer" :with-header="false">
        <h3>{{ title }}</h3>
        <div class="add-container">
          <div class="edit">
            <el-icon :size="20" color="#409efc">
              <User/>
            </el-icon>
            <el-input class="add-input" v-model="new_username" placeholder="请输入用户名" type="text"/>
          </div>
          <div class="edit">
            <el-icon :size="20" color="#409efc">
              <Lock/>
            </el-icon>
            <el-input class="add-input" v-model="new_password" placeholder="请输入密码" type="text"/>
          </div>
          <div class="edit">
            <el-icon :size="20" color="#409efc">
              <Message/>
            </el-icon>
            <el-input class="add-input" v-model="new_email" placeholder="请输入邮箱" type="text"/>
          </div>
          <div class="edit">
            <el-icon :size="20" color="#409efc">
              <View/>
            </el-icon>
            <el-input class="add-input" v-model="new_age" placeholder="请输入年龄" type="text"/>
          </div>
        </div>
        <el-button @click="AddorSaveSubmit()" class="submitbutton" type="success">提交</el-button>
      </el-drawer>
    </div>
  </div>
</template>


<script>
import {ElMessage, ElMessageBox} from 'element-plus'
import {Lock, User} from "@element-plus/icons-vue";

export default {
  components: {Lock, User},
  data() {
    return {
      username: "",
      email: "",
      age: "",
      create_time: "",
      last_login: "",
      status: "",
      tableData: [],
      drawer: false,
      title: "",
      new_username: "",
      new_email: "",
      new_age: "",
      new_password: "",
      userId: "",
    }
  },
  methods: {
    formatTime() {
      let date = new Date();
      let year = date.getFullYear();
      let month = (date.getMonth() + 1);
      if (month < 10) month = '0' + month;
      let day = date.getDate();
      if (day < 10) day = '0' + day;
      let hour = date.getHours();
      if (hour < 10) hour = '0' + hour;
      let minute = date.getMinutes();
      if (minute < 10) minute = '0' + minute;
      let second = date.getSeconds();
      if (second < 10) second = '0' + second;
      let localDateTime = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second;
      return localDateTime;
    },
    getUserList() {
      let param = {
        "username": this.username,
        "email": this.email,
        "age": this.age,
      }
      this.$axios.post("/user/list", param).then((res) => {
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

        await this.$axios.delete("/user/delete?id=" + id); // 等待删除完成
        await this.getUserList();                          // 然后刷新数据
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
      this.title = "添加用户";
      this.drawer = true;
      this.new_username = "";
      this.new_password = "";
      this.new_email = "";
      this.new_age = "";
    },
    updateRow(id, index) {
      this.title = "编辑用户";
      this.drawer = true;
      this.new_username = this.tableData[index].username;
      this.new_password = this.tableData[index].password;
      this.new_email = this.tableData[index].email;
      this.new_age = this.tableData[index].age;
      this.id = id;
    },
    async AddorSaveSubmit() {
      let param = {}
      if (this.new_username != "") {
        param.username = this.new_username;
      }
      if (this.new_password != "") {
        param.password = this.new_password;
      }
      if (this.new_email != "") {
        param.email = this.new_email;
      }
      if (this.new_age != "") {
        param.age = this.new_age;
      }
      param.lastLogin = this.formatTime();
      if (this.title == "添加用户") {
        param.creatTime = this.formatTime();
        await this.$axios.post("/user/add", param).then((res) => {
          res = res.data;
          if (res.code == 200) {
            this.$message("添加成功");
          } else {
            this.$message(res.msg);
          }

        })
        await this.getUserList();
      } else {
        param.userId = this.id;
        await this.$axios.post("/user/update", param).then((res) => {
          res = res.data;
          this.$message(res.msg);
        })
        await this.getUserList();
      }
    },
  },
  mounted() {
    this.getUserList();
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

.add-container {
  width: 100%;
  height: 40%;
}

.search-input {
  position: relative;
  height: 60%;
  width: 20%;
}

.add-input {
  width: 90%;
  height: 90%;
  margin-bottom: 10px;
}

.search-button {
  margin-left: 30px;
}

.edit {
  flex-direction: row;
  width: 100%;
  height: 15%;
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