import { App } from 'vue'
// import { PhysicalPosition, PhysicalSize, appWindow, currentMonitor } from '@tauri-apps/api/window'
// import { defineStore } from 'pinia'
import winHelper from './WinHelper';
import { menusDefineStore } from "./Menus.ts"



class Deskme {
    menusStore?: any;
    public async install(app: App) {
        app.directive('drag', winHelper.getDragFunction());
        await winHelper.init();
        this.menusStore = menusDefineStore()
        this.menusStore.initDefault();
    }
}

const dmApp = new Deskme();


export default dmApp;