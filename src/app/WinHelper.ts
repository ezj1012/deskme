import { Directive } from 'vue'
import { type } from '@tauri-apps/api/os';
import { PhysicalPosition, PhysicalSize, appWindow, currentMonitor } from '@tauri-apps/api/window'
import { defineStore } from 'pinia'
// import debounce from 'lodash/debounce';

const dev_flag = 'WEB_DEV'
export const windowStateStore = defineStore('windowState', {
    state: () => {
        return {
            maximized: false,
            outerSize: null as PhysicalSize | null,
            outerPosition: null as PhysicalPosition | null,
            mouseX: 0,
            mouseY: 0,
        }
    },
    actions: {
        async init() {
            this.maximized = await appWindow.isMaximized();
            this.outerPosition = await appWindow.outerPosition();
            this.outerSize = await appWindow.outerSize();
        }
    }
});

class WinHelper {
    osType = dev_flag;
    osName = dev_flag;
    windowState = undefined as any;
    public async init() {
        this.osType = await type()
        this.osName = this.osType === dev_flag ? dev_flag : this.osType === 'Windows_NT' ? 'windows' : this.osType === 'Linux' ? 'linux' : 'macos';
        this.windowState = windowStateStore();
        await this.windowState.init();

        document.addEventListener('mousemove', (event) => {
            this.windowState.mouseX = event.clientX;
            this.windowState.mouseY = event.clientY;
        });

        appWindow.onResized(async () => {
            if (await appWindow.isMaximized()) {
                const curMonitor = await currentMonitor();

                // 拖拽最大化
                this.windowState.maximized = true;
                const size = await appWindow.innerSize();
                size.height = size.height + 2;

                await appWindow.setSize(size)
                await appWindow.setPosition(curMonitor!.position);
                await appWindow.setResizable(false)
                // appWindow.setIgnoreCursorEvents(true)
            } else if (!this.windowState.maximized) {
                this.windowState.outerSize = await appWindow.outerSize();
            }
        });

        appWindow.onMoved(async ({ payload: position }) => {
            if (this.windowState.maximized || await appWindow.isMaximized()) {
                return;
            }
            this.windowState.outerPosition = position;
        });

    }

    public getWindowStateStore() {
        return windowStateStore;
    }

    public isMaximized(): boolean {
        return this.windowState ? this.windowState.maximized.value : false;
    }

    public isMacOS(): boolean {
        return this.osName == 'macos'
    }

    public isWebOS(): boolean {
        return this.osName == dev_flag
    }

    public async startDragging() {
        await appWindow.startDragging();
    }

    public async toggleMaximize() {
        if (await appWindow.isMaximized()) {
            console.log("appWindow.isMaximized()");
            await appWindow.unmaximize();
            this.windowState.outerPosition = await appWindow.outerPosition();
            this.windowState.outerSize = await appWindow.outerSize();
            this.windowState.maximized = false;
            await appWindow.setResizable(true);
        } else if (this.windowState.maximized) {
            console.log("windowState.maximized()");
            await appWindow.unmaximize();
            await appWindow.setPosition(this.windowState.outerPosition!);
            await appWindow.setSize(this.windowState.outerSize!)
            this.windowState.maximized = false;
            await appWindow.setResizable(true);
        } else {
            // 最大化 
            this.windowState.outerPosition = await appWindow.outerPosition();
            this.windowState.outerSize = await appWindow.outerSize();
            this.windowState.maximized = true;
            await appWindow.maximize();
        }
    }

    public getDragFunction(): Directive {
        return {
            async beforeMount(el, binding) {
                let x = 0, y = 0;
                let timeId = null as any;
                el.addEventListener('mousedown', async (e: MouseEvent) => {
                    if (
                        e.button === 0 &&
                        // and was normal click to drag or double click to maximize
                        (e.detail === 1 || e.detail === 2)
                    ) {
                        // macOS maximization happens on `mouseup`,
                        // so we save needed state and early return
                        if (winHelper.isMacOS() && e.detail == 2) {
                            x = e.clientX
                            y = e.clientY
                            return
                        }

                        e.preventDefault()
                        e.stopImmediatePropagation()

                        if (winHelper.isWebOS()) {
                            // WEB页面啥也不用干.
                        } else
                            console.log('3333333', timeId)
                        // 双击进行缩放
                        if (e.detail === 2) {
                            console.log('444444444', timeId)
                            if (timeId) {
                                clearTimeout(timeId);
                                timeId = null;
                            }
                            if (binding.value) {
                                await winHelper.toggleMaximize();
                            }
                        } else {
                            if (winHelper.windowState.maximized) {
                                console.log('111111111')
                                timeId = setTimeout(async () => {
                                    console.log('22222222')
                                    const curMonitor = await currentMonitor();
                                    await appWindow.unmaximize();
                                    //    await appWindow.setPosition(this.windowState.outerPosition!);
                                    await appWindow.setSize(winHelper.windowState.outerSize!)
                                    const position = await appWindow.innerPosition();
                                    position.y = winHelper.windowState.mouseY - 10;
                                    position.x = Math.ceil(winHelper.windowState.mouseX - winHelper.windowState.outerSize.width / 2);
                                    position.x = position.x < 10 ? 10 : position.x;
                                    position.x = curMonitor!.position.x + position.x;
                                    await appWindow.setPosition(position)
                                    winHelper.startDragging();
                                    timeId = null;
                                    await appWindow.setResizable(true);
                                    winHelper.windowState.maximized = false;
                                }, 300);
                            } else {
                                console.log('555555555555', timeId)
                                winHelper.startDragging();
                            }
                        }

                    }
                })

                if (winHelper.isMacOS()) {
                    el.addEventListener('mouseup', (e: MouseEvent) => {
                        if (
                            // and was left mouse button
                            e.button === 0 &&
                            // and was double click
                            e.detail === 2 &&
                            // and the cursor hasn't moved from initial mousedown
                            e.clientX === x && e.clientY === y
                        ) {
                            console.log(" mouseup  start Drgging")
                            winHelper.toggleMaximize();
                        }
                    })
                }
            }
        }
    }
}

const winHelper = new WinHelper();

export default winHelper;