<template>
    <transition name="fade">
        <router-view/>
    </transition>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    body {
        margin: 0px;
        background: #f9f9f9;
    }
</style>
