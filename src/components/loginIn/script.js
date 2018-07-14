import Vue from 'vue'
import axios from 'axios'
export default {
    data() {
        return {
            userObj: {
                username: '',
                password: ''
            },
            rules2: {
                username: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入用户密码', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .post('http://localhost:8888/api/private/v1/login', this.userObj)
                        .then(res => {
                            // console.log(res)
                            let { data, meta } = res.data
                            if (meta.status === 200) {
                                window.localStorage.setItem('token', data.token)
                                this.$message({
                                    message: '恭喜你，登陆成功，即将跳转到主页',
                                    type: 'success'
                                });
                                setTimeout(() => {
                                    this.$router.push('/home')
                                }, 2000)
                            } else {
                                this.$message.error(meta.msg);
                            }
                        })
                } else {
                    this.$message.error('请输入正确的用户信息');
                    return false;
                }
            })
        },
        postUser() {
            axios
                .post('http://localhost:8888/api/private/v1/login', this.userObj)
                .then(res => {
                    // console.log(res)
                    let { data, meta } = res.data
                    if (meta.status === 200) {
                        window.localStorage.setItem('token', data.token)
                        this.$router.push('/home')
                    } else {
                        alert(meta.msg)
                    }
                })
        }
    }
}