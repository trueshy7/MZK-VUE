<template>
  <div class="outer1">
    <div class="top-input">
      <el-input class="search-input" v-model="username" placeholder="请输入用户名" type="text"/>
      <el-input class="search-input" v-model="email" placeholder="请输入邮箱" type="text"/>
      <el-input class="search-input" v-model="age" placeholder="请输入年龄" type="text"/>
      <el-button @click="getUserList">搜索</el-button>
    </div>
    <div class="tableshow">
      <el-table :data="tableData" style="width: 100%" max-height="250">
        <el-table-column prop="username" label="用户名" width="180"/>
        <el-table-column prop="email" label="邮箱" width="180"/>
        <el-table-column prop="age" label="年龄" width="90"/>
        <el-table-column prop="gender" label="性别" width="90S"/>
        <el-table-column prop="status" label="用户状态" width="90"/>
        <el-table-column prop="create_time" label="注册时间" width="160"/>
        <el-table-column prop="last_login" label="最近登录时间" width="160"/>
        <el-table-column fixed="right" label="操作" min-width="60">
          <template #default="scope">
            <el-button
                plain
                type="primary"
                size="small"
                @click="deleteRow(scope.row.id)"
            >
              删除
            </el-button>
            <el-button
                type="primary"
                size="small"
                @click="updateRow(scope.row.id)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="width: 100%" @click="onAddItem()">
        添加用户
      </el-button>
    </div>
    <div>
      <el-drawer v-model="drawer" :with-header="false">
        <span>{{ title }}</span>
        <div class="add-container">
          <div>
            <span>用户名</span>
            <el-input class="add-input" v-model="new_username" placeholder="请输入用户名" type="text"/>
          </div>
          <div>
            <span>密码</span>
            <el-input class="add-input" v-model="new_password" placeholder="请输入密码" type="text"/>
          </div>
          <div>
            <span>邮箱</span>
            <el-input class="add-input" v-model="new_email" placeholder="请输入邮箱" type="text"/>
          </div>
          <div>
            <span>年龄</span>
            <el-input class="add-input" v-model="new_age" placeholder="请输入年龄" type="text"/>
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
      id: "",
    }
  },
  methods: {
    getUserList() {
      let param = {
        "username": this.username,
        "email": this.email,
        "age": this.age,
      }
      this.$axios.post("/user/list", param).then((res) => {
        this.tableData = res.data.data;
        console.log(this.tableData);
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
            this.$axios.delete("/user/delete?id=" + id);
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            this.getUserList();
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '您取消了删除',
            })
          })
    },
    onAddItem() {
      this.title = "添加用户";
      this.drawer = true;
      this.new_username = "";
      this.new_password = "";
      this.new_email = "";
      this.new_age = "";
    },
    updateRow(id) {
      this.title = "编辑用户";
      this.drawer = true;
      this.new_username = "";
      this.new_password = "";
      this.new_email = "";
      this.new_age = "";
      this.id = id;
    },
    AddorSaveSubmit() {
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
      if (this.title == "添加用户") {
        this.$axios.post("/user/add", param).then((res) => {
          res = res.data;
          if (res.code == 200) {
            this.$message("添加成功");
          } else {
            this.$message(res.msg);
          }
        })
      } else {
        param.id = this.id;
        console.log(param);
        this.$axios.post("/user/update", param).then((res) => {
          res = res.data;
          console.log(res);
        })
      }
      this.getUserList();
    },
  },
  mounted() {
    this.getUserList();
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
  width: 25%;
}
</style>