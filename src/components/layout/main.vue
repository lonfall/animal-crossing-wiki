<template>
    <div id="Main" class="layout">
        <el-container>
            <el-header class="header">
                <div class="header-item">
                    <el-image
                            class="logo"
                            :src="titleLogoUrl"
                            fit="scale-down"></el-image>
                    <ul class="nav">
                        <li class="nav-item">
                            <a data-index="home" v-on:click="navClick($event)" href="#/home"
                               :class="checkActive('home')">首页</a>
                        </li>
                        <li class="nav-item">
                            <a data-index="fish" v-on:click="navClick($event)" href="#/fish"
                               :class="checkActive('fish')">摸鱼</a>
                        </li>
                        <li class="nav-item">
                            <a data-index="bug" v-on:click="navClick($event)" href="#/bug"
                               :class="checkActive('bug')">捉虫</a>
                        </li>
                        <li class="nav-item">
                            <a data-index="stone" v-on:click="navClick($event)" href="#/stone"
                               :class="checkActive('stone')">挖矿</a>
                        </li>
                        <li class="nav-item">
                            <a data-index="music" v-on:click="navClick($event)" href="#/music"
                               :class="checkActive('music')">听歌</a>
                        </li>
                        <li class="nav-item nav-avatar" v-if="isLogin">
                            <el-dropdown class="dropdown" trigger="click" @command="handleCommand">
                                <el-image
                                        class="avatar el-dropdown-link"
                                        :src="avatarUrl"
                                        fit="scale-down"></el-image>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="signOut" icon="fa fa-sign-out">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </li>
                        <li class="nav-item nav-login" v-else>
                            <a href="#/login">登录</a>
                        </li>
                    </ul>
                </div>
            </el-header>
            <el-main class="main" :style="{'min-height' : MainHeight + 'px'}">
                <div class="content">
                    <router-view/>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import icon from '@/assets/dstj.png'
    import avatar from '@/assets/avatar_error.png'

    export default {
        data() {
            return {
                documentClientHeight: 0,
                titleLogoUrl: icon,
                avatarUrl: avatar,
                activeIndex: this.$route.path.replace("/", "")
            }
        },
        name: "Main",
        computed: {
            MainHeight: function () {
                return this.documentClientHeight - 60 - 10 * 2
            },
            user() {
                return this.$store.getters.getUser
            },
            isLogin() {
                return this.$store.getters.getUser != null
            }
        },
        watch: {
            user: {
                handler: function (_new, _old) {
                    if (_new && _new.avatar) {
                        if ((!_old || !_old.avatar) || _new.avatar !== _old.avatar) {
                            this.$axiox.get(_new.avatar, {responseType: 'blob'})
                                .then((response) => {
                                    let reader = new FileReader()
                                    reader.onload = (e) => {
                                        this.avatarUrl = e.target.result
                                    }
                                    reader.readAsDataURL(response.data)
                                })
                                .catch((error) => {
                                    console.log('error:' + error)
                                })
                        }
                    }
                },
                deep: true
            }
        },
        created() {
            this.$axiox.get('/sys/user/current')
                .then((response) => {
                    if (response.data.code === 200) {
                        console.log("登录成功")
                        this.$store.commit('setUser', response.data.data)
                    } else if (response.data.msg) {
                        console.log("以游客身份登录")
                        this.$cookies.remove('token')
                        this.$store.commit('setUser', null)
                        // this.$message.error(response.data.msg)
                    }
                })
                .catch((error) => {
                    console.log('error:' + error)
                })
        },
        mounted() {
            this.resetDocumentClientHeight()
        },
        methods: {
            // 重置窗口可视高度
            resetDocumentClientHeight() {
                this.documentClientHeight = document.documentElement['clientHeight']
                window.onresize = () => {
                    this.documentClientHeight = document.documentElement['clientHeight']
                }
            },
            navClick(event) {
                let index = event.currentTarget.getAttribute('data-index')
                this.activeIndex = index
            },
            checkActive(index) {
                if (this.activeIndex === index) {
                    return "active"
                }
                return ""
            },
            handleCommand(command) {
                switch (command) {
                    case 'signOut':
                        if (this.$cookies.isKey('token')) {
                            this.$cookies.remove('token')
                        }
                        this.$store.commit('setUser', null)
                        this.$router.push('/login')
                        break
                    default:
                        break
                }
            }
        }
    }
</script>

<style scoped>
    .layout {
        position: relative;
    }

    .header {
        background: #ffffff;
        border-bottom: 1px solid #f0f0f0;
        box-shadow: 0 5px 10px rgba(26, 26, 26, .1);
        padding: 0px;
    }

    .header .nav {
        float: right;
        height: 100%;
        line-height: 60px;
        background: transparent;
        padding: 0;
        margin: 0;
    }

    .header .nav-item {
        margin: 0;
        float: left;
        list-style: none;
        position: relative;
    }

    .header .nav-avatar {
        padding-left: 30px;
        margin-top: 10px;
        height: 50px;
    }

    .header .nav-item a {
        text-decoration: none;
        color: #1989fa;
        opacity: .5;
        display: block;
        padding: 0 22px;
        cursor: pointer;
    }

    .header .nav-item a:hover {
        opacity: 1;
    }

    .header .nav-item a.active {
        opacity: 1;
    }

    .header .nav-item a.active:after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: calc(50% - 15px);
        width: 30px;
        height: 2px;
        background: #409eff;
    }

    .header .nav-login a {
        color: #969696;
        padding-left: 30px;
        cursor: pointer;
    }

    .header .nav-login a:hover {
        color: #444;
    }

    .header-item {
        height: 60px;
        width: 1000px;
        padding: 0px 16px;
        margin: 0px auto;
    }

    .logo {
        width: 200px;
        height: 60px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .main {
        background: #ffffff;
        margin: 10px auto;
        padding: 0px;
        width: 1000px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }

    .content {
        padding: 0px;
    }

    .dropdown {
        height: 40px;
        outline: none;
    }
</style>
