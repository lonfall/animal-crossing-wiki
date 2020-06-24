<template>
    <div class="i-login">
        <el-card class="i-login-el-card"
                 :body-style="{ padding: '0px' }">
            <el-image class="i-login-el-image"
                      :src="background"
                      fit="cover"></el-image>
            <div class="i-login-el-form">
                <el-form label-position="right"
                         label-width="auto"
                         ref="loginForm"
                         :model="loginForm"
                         :rules="loginRules">
                    <h1 style="margin: 25px 0px;font-size: 26px;">登录</h1>
                    <el-form-item label="用户名"
                                  prop="username">
                        <el-input v-model="loginForm.username"
                                  @keyup.enter.native="submitForm('loginForm')"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"
                                  prop="password">
                        <el-input type="password"
                                  v-model="loginForm.password"
                                  @keyup.enter.native="submitForm('loginForm')"
                                  autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="submitForm('loginForm')">提交
                        </el-button>
                        <el-button @click="resetForm('loginForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import background from '@/assets/background.jpg'

    export default {
        data() {
            return {
                background: background,
                loginForm: {
                    username: '',
                    password: ''
                },
                loginRules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var _this = this
                        this.$axiox.post('/login?username=' + this.loginForm.username +
                            '&password=' + this.loginForm.password, {})
                            .then(function (response) {
                                if (response.data.code === 200) {
                                    // 获取token，并把token写入cookies中
                                    var token = response.data.data
                                    _this.$cookies.set("token", token)
                                    // console.log('token = ' + token)
                                    // 登录成功，跳转到主页
                                    _this.$router.push('/home')
                                } else if (response.data.msg) {
                                    _this.$message.error(response.data.msg)
                                }
                            })
                            .catch(function (error) {
                                console.log('error:' + error)
                            })
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>
    .i-login-el-form {
        width: 340px;
        height: 340px;
        position: relative;
        float: right;
        z-index: 110;
        padding: 30px 40px;
    }

    .i-login-el-image {
        width: 260px;
        height: 340px;
        float: left;
        z-index: 100;
    }

    .i-login-el-card {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 600px;
        height: 340px;
        margin-left: -350px;
        margin-top: -170px;
        border: none;
    }

    .i-login {
        background-color: #f5f7f9;
        height: 100%;
        width: 100%;
        position: fixed;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
    }
</style>
