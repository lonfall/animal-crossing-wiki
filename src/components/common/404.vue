<template>
    <div class="container">
        <div class="no-find">
            <div class="no-find-content">
                <h2 class="not-found-title">404 NOT FOUND</h2>
                <p class="not-found-desc">抱歉！您访问的页面未找到<br>
                    请返回<em @click="toHome">首页</em>，或者去<em @click="$router.go(-1)">上一个页面</em></p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            toHome: function () {
                this.$router.push('/')
            }
        }
    }
</script>

<style>
    .container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
    }

    .no-find {
        padding: 0;
        margin: 0;
        background-color: #fff;
    }

    .no-find-content {
        position: fixed;
        top: 15%;
        left: 50%;
        z-index: 2;
        padding: 30px;
        text-align: center;
        transform: translate(-50%, 0);
    }

    .not-found-title {
        margin: 20px 0 15px;
        font-size: 5em;
        font-weight: 400;
        color: rgb(55, 71, 79);
    }

    .not-found-desc {
        margin: 0 0 30px;
        font-size: 26px;
        text-transform: uppercase;
        color: rgb(118, 131, 143);
    }

    .not-found-desc > em {
        font-style: normal;
        color: #ff4d4d;
        cursor: pointer;
        text-decoration: underline;
    }

    .not-found-btn-gohome {
        margin-left: 30px;
    }
</style>
