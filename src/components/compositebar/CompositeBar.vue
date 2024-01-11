<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
}) 
</script>

<template>
    <div id="composite-bar">

    </div>
</template>

<style scoped>
#composite-bar {
    background: var(--composite-bar-bg);
    left: 0px;
    width: 48px;
    min-width: 48px;
    height: 100%;
    box-sizing: border-box;
    border-right: 1px solid #434343;
    user-select: none;
}
</style>
