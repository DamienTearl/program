<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">home</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索部分 -->
      <el-row>
        <el-col :span="6">
          <div style="margin-bottom: 15px;">
            <el-input placeholder="请输入内容" v-model="getParams.query" class="input-with-select" >
              <!-- v-on:input="getUserInfo" -->
              <el-button slot="append" icon="el-icon-search" @click="getUserInfo"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">&nbsp;&nbsp;&nbsp;&nbsp;<el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button></el-col>
      </el-row>
      <!-- 数据渲染部分 -->
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
          prop="username"
          label="用户名"
          width="180">
          </el-table-column>
          <el-table-column
          prop="email"
          label="邮箱"
          width="180">
          </el-table-column>
          <el-table-column
          prop="mobile"
          label="电话">
          </el-table-column>
          <el-table-column label="操作">
          </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="getParams.pagenum"
          :page-sizes="[1, 5, 10, 20]"
          :page-size="getParams.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <!-- 添加弹框 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile" :label-width="formLabelWidth">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      getParams: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      tableData: [],
      total: 0,
      formLabelWidth: '70px',
      dialogFormVisible: false,
      labelPosition: 'left',
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入电话', trigger: 'blur' }]
      },
      token: window.localStorage.getItem('token')
    }
  },
  methods: {
    getUserInfo () {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          headers: {'Authorization': this.token},
          params: this.getParams
        })
        .then(res => {
          var {data, meta} = res.data
          // console.log(data)
          // console.log(meta)
          if (meta.status === 200) {
            this.tableData = data.users
            this.total = data.total
          }
        })
    },
    handleSizeChange (val) {
      this.getParams.pagesize = val
      console.log(this.pagesize)
      this.getUserInfo()
    },
    handleCurrentChange (val) {
      this.getParams.pagenum = val
      console.log(this.pagenum)
      this.getUserInfo()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    add () {
      axios
        .post('http://localhost:8888/api/private/v1/users', this.ruleForm,
          {headers: {'Authorization': this.token}}
        )
        .then(res => {
          const meta = res.data.meta
          if (meta.status === 201) {
            this.dialogFormVisible = false
            this.$message({
              message: '新增用户成功',
              type: 'success'
            })
          }
          this.getUserInfo()
        })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>
<style scoped>
.el-breadcrumb {
  height: 30px;
}
.el-dialog__body {
  padding-bottom: 0;
}
</style>
