<script setup lang="ts">
import Menus from './Menus.vue';
import { appWindow } from '@tauri-apps/api/window'
import winHelper from '@/app/WinHelper';
import { onMounted } from 'vue';
import favicon from '@/assets/favicon.png'
import exit from '@/assets/titlebar/exit.png'
import fulls from '@/assets/titlebar/fulls.png'
import mins from '@/assets/titlebar/mins.png'
import min from '@/assets/titlebar/min.png'
// import { menusDefineStore } from "@/app/Menus.ts"

const winState = winHelper.getWindowStateStore()();
// const menusStore = menusDefineStore();

onMounted(() => {
    document
        .getElementById('titlebar-minimize')!
        .addEventListener('click', () => appWindow.minimize())
    document
        .getElementById('titlebar-maximize')!
        .addEventListener('click', async () => await winHelper.toggleMaximize());
    document
        .getElementById('titlebar-close')!
        .addEventListener('click', () => appWindow.close())
}) 
</script>

<template>
    <div id="titlebar" :class="{ 'br4': !winState.maximized }">
        <div :class="{ 'drag': !winState.maximized, 'drag-full': winState.maximized }" v-drag="true"></div>
        <Menus />
        <div class="icon">
            <img :src="favicon" alt="favicon" v-drag="true" draggable="false" oncontextmenu="return false;" />
        </div>

        <div class="titlebar-ops">
            <div class="titlebar-button" id="titlebar-minimize">
                <img :src="min" alt="close" />
            </div>
            <div class="titlebar-button" id="titlebar-maximize">
                <img :src="winState.maximized ? mins : fulls" alt="close" />
            </div>
            <div class="titlebar-button" id="titlebar-close">
                <img :src="exit" alt="close" />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
#titlebar {
    height: 35px;
    background: #323233;
    /* border-bottom: 1px solid rgb(43, 43, 43); */
    user-select: none;
    display: flex;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: rgba(204, 204, 204, 0.6);
    font-family: Segoe WPC, Segoe UI, Microsoft YaHei, sans-serif;

    .icon {
        position: absolute;
        width: 48px;
        height: 35px;
        top: 0px;
        left: 0px;
        background: #181818;
        border-radius: 4px 0 0 0;
        box-sizing: border-box;
        border-right: 1px solid #434343;

        img {
            width: 26px;
            height: 26px;
            margin-top: 9px;
            margin-left: 11px;
            z-index: 1000;
            user-select: none;
            cursor: pointer;
        }
    }

    .drag {
        position: absolute;
        height: 26px;
        width: calc(100% - 158px);
        top: 6px;
        left: 48px;
        // background-color: red;
        z-index: 1;
    }

    .drag-full {
        position: absolute;
        height: 35px;
        width: calc(100% - 158px);
        top: 0px;
        left: 48px;
        z-index: 1;
    }

    .titlebar-ops {
        z-index: 3000;
        border-radius: 4px;
        background: #323233;
        position: absolute;
        top: 0;
        right: 0;

        .titlebar-button {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            color: aliceblue;
            border-radius: 4px;

            img {
                width: 16px;
                height: 16px;
            }

            &:hover {
                background: #4d4d4d;
            }
        }
    }
}
</style>