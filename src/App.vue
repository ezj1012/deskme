<script setup lang="ts">
import {
  onMounted
  // , ref
  // , type Ref
} from 'vue';
// import Vditor from 'vditor'
import TitleBar from '@/components/titlebar/TitleBar.vue'
import CompositeBar from './components/compositebar/CompositeBar.vue';
import winHelper from './app/WinHelper';
import 'vditor/dist/index.css'

// const contentEditor: Ref<any> = ref('');
const curWindows = winHelper.getWindowStateStore()();

onMounted(() => {

  // contentEditor.value = new Vditor('vditor', {
  //   width: '1688',
  //   height: 360,
  //   cdn: '/node_modules/vditor',
  //   lang: 'zh_CN',
  //   mode: 'ir',
  //   outline: {
  //     enable: true,
  //     position: 'left',
  //   },
  //   preview: {
  //     delay: 200,
  //     maxWidth: window.innerHeight + 100,
  //     url: 'asdasdas',
  //     parse: (e) => { console.log(`parse ${e}`) },
  //     transform: (html) => { console.log(html); return html; },
  //     markdown: {
  //       mark: true,
  //       toc: true
  //     }
  //   },
  //   toolbarConfig: {
  //     pin: true,
  //   },
  //   cache: {
  //     enable: false,
  //   },
  //   after: () => {
  //     contentEditor.value.setValue('hello, Vditor + Vue!')
  //   },
  // })
}) 
</script>

<template>
  <TitleBar />
  <div id="main">
    <CompositeBar />
    <div id="vditor">
      {{ curWindows }}
    </div>
  </div>
</template>

<style lang="less" scoped>
#main {
  width: 100%;
  height: calc(100% - 35px);
  margin-top: 35px;
  position: relative;
  display: flex;
}

#video {
  flex: 1;
}
</style>
