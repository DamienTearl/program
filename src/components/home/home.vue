<template>
    <el-container>
        <el-header>
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple"><img src="" alt=""></div></el-col>
                <el-col :span="16"><div class="grid-content bg-purple-light"><h1>电商后台管理系统</h1></div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"><el-button type="primary" @click="removeToken">退出</el-button></div></el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  methods: {
    removeToken () {
      this.$confirm('是否确定退出登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '退出登录成功!即将跳转到登录页面'
          })
          window.localStorage.removeItem('token')
          setTimeout(() => {
            this.$router.push('/')
          }, 2000)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出登录'
          })
        })
    }
  }
}
</script>

<style>
.el-container,
.el-aside,
.el-main {
  height: 100%;
}
.el-header {
  /* background-color: #b7c4cc; */
  background-color: #2f6e97;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  /* background-color: #cfdfd4; */
  background-color: #5295bf;
}
.el-main {
  /* background: #f2e1cd; */
  background: #edf0f3;
}
</style>
