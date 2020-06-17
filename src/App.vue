<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  font-family: "PingFangSC-Regular", Helvetica, Arial, "Helvetica Neue",
    "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    sans-serif;
    background: #f5f5f5;
}
#app {
  margin: 0 auto;
  box-sizing: border-box;
  -webkit-overflow-scrolling:touch;
}
div {
  box-sizing: border-box;
}
* {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}
</style>
