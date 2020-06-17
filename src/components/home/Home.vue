<template>
     <div class="container">
		 <transition name="move" mode="out-in"><router-view></router-view></transition>
	</div>
</template>

<script>
export default {
     name:'home'
}
</script>
<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
}
</style>
