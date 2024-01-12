<script setup lang="ts">
import { onMounted } from 'vue';


onMounted(() => {
}) 
</script>

<template>
    <div id="composite-bar">
        <div>

        </div>
        <div>
            <div class="btn">
                <FIcon class="icon" type="icon-shezhi" />
            </div>
            <div class="btn">
                <FIcon class="icon" type="icon-shezhi" />
            </div>
        </div>
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

    display: flex;
    flex-direction: column;
    justify-content: space-between;


    .btn {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            color: rgba(255, 255, 255, 0.4);
            font-size: 28px;

            &:hover {
                color: rgba(255, 255, 255, 1);
            }

            &:active {
                font-size: 24px;
            }
        }
    }

}
</style>
