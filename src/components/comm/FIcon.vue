<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
    type: {
        type: String,
        default: ''
    }
})

// 给图标添加上类名
const iconName = computed(() => {
    if (props.type) {
        return `${props.type}`
    }
    return 'icon-tishi3'
});
</script>
<template>
    <i class="iconfont " :class="iconName"></i>
</template>
<style lang="less" ></style>