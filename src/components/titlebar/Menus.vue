<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { Menu, menusDefineStore } from "@/app/Menus.ts"

const menusStore = menusDefineStore();
const minWidth = 600;
const mockMenusRef = ref();
const menus = ref(menusStore.getMenus());
const size = ref(1);
const menuWidthsCache: Ref<number[]> = ref([])

menusStore.$subscribe((mutation: any) => {
    if (mutation.events && mutation.events.key == 'menus') {
        updateAll();
    }
})

onMounted(() => {
    window.addEventListener('resize', () => update())
    updateAll();
})

onUnmounted(() => {
    window.removeEventListener('resize', () => { });
})

function computedWidth(menuList: Menu[]): number[] {
    const mockMenus = document.getElementById("mockMenus");
    let widths = [] as number[];
    if (mockMenus) {
        mockMenus.innerHTML = '';
        for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i];
            const newDiv = document.createElement("div");
            newDiv.className = "menu";
            newDiv.textContent = menu.getText();
            mockMenus.appendChild(newDiv);
            var computedStyle = window.getComputedStyle(newDiv);
            widths.push(parseFloat((parseFloat(computedStyle.width) + 16).toFixed(2)));
        }
        mockMenus.innerHTML = '';
    }
    return widths;
}

function updateAll() {
    menus.value = menusStore.getMenus();
    menuWidthsCache.value = computedWidth(menus.value);
    update();
}

function update() {
    let width: number = window.innerWidth - minWidth;
    if (width < 150) {
        size.value = 0;
        return;
    }

    let mustWidth = 0;
    width = width - 30; // 显示'''
    let ws = menuWidthsCache.value;

    let tempSize = 1;
    for (let i = 0; i < ws.length; i++) {
        mustWidth += ws[i];
        if (mustWidth > width) {
            break;
        }
        tempSize++;
    }

    if (size.value != tempSize) {
        size.value = tempSize;
    }
}

function display(idx: number) {
    return idx >= size.value
}
</script>

<template>
    <div ref="mockMenusRef" id="mockMenus" class="mock-menus"></div>
    <div class="titlebar-menus">
        <div class="menu-icon" v-if="size == 0">
            <FIcon style="font-size: 18px;" type="icon-menu-fold" />
        </div>
        <div class="menu" v-for="(   m, idx   ) in    menus   " :class="{ 'hide': display(idx) }" :key="m.getText()">
            <span>{{
                m.getText() }}</span>
        </div>
        <div v-if="size != 0 && size < menus.length" class="menu-icon">
            <FIcon class="ficon" type="icon-gengduo" />
        </div>
    </div>
</template>
<style lang="less">
.mock-menus {
    position: absolute;
    top: -100px;
    left: 0px;
    padding-left: 4px;
    display: flex;

    .menu {
        font-size: 13px;
        height: 22px;
        line-height: 22px;
        padding: 0 8px;
        font-weight: 500;
    }
}
</style>
<style lang="less" scoped>
.titlebar-menus {
    position: absolute;
    display: flex;
    height: 26px;
    z-index: 10;
    top: 6px;
    left: 48px;
    padding-left: 4px;

    .menu-icon {
        height: 22px;
        line-height: 22px;
        padding: 0 8px;
        border-radius: 5px;

        .ficon {
            font-size: 13px;
        }

        img {
            height: 20px;
            padding: 1px;
        }

        &:hover {
            color: #ccc;
            background: #444;
        }

        &:active {
            transform: scale(.9);
        }
    }

    .hide {
        display: none;
    }

    .menu {
        font-size: 13px;
        height: 22px;
        line-height: 22px;
        padding: 0 8px;
        font-weight: 500;
        border-radius: 5px;

        &:hover {
            color: #ccc;
            background: #444;
        }

        &:active {
            transform: scale(.9);
        }
    }

}
</style>