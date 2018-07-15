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
              <el-col :span="24">
                <!-- @open="handleOpen" -->
                <!-- @close="handleClose" -->
                <el-menu
                  unique-opened
                  default-active="2"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>用户管理</span>
                    </template>
                      <el-menu-item index="1-1">
                        <router-link to="/user">用户列表</router-link>
                      </el-menu-item>
                  </el-submenu>
                  <el-submenu index="2">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>权限管理</span>
                    </template>
                      <el-menu-item index="2-1">角色列表</el-menu-item>
                      <el-menu-item index="2-2">权限列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title">
                      <i class="el-icon-document"></i>
                      <span>商品管理</span>
                    </template>
                      <el-menu-item index="3-1">商品列表</el-menu-item>
                      <el-menu-item index="3-2">分类参数</el-menu-item>
                      <el-menu-item index="3-3">商品分类</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4">
                    <template slot="title">
                      <i class="el-icon-setting"></i>
                      <span>订单管理</span>
                    </template>
                      <el-menu-item index="4-1">订单列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5">
                    <template slot="title">
                      <i class="el-icon-menu"></i>
                      <span>数据统计</span>
                    </template>
                      <el-menu-item index="5-1">数据报表</el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-aside>
            <el-main><router-view/></el-main>
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
.el-col.el-col-24, .el-menu-vertical-demo.el-menu {
  height: 100%;
}
.el-menu-item > a {
  text-decoration: none !important;
  color: inherit;
  display: block;
  width: 100%;
  height: 100%;
}
.el-submenu .el-menu-item {
  min-width: 199px;
}
</style>
