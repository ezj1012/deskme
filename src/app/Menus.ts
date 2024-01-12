import { defineStore } from 'pinia'

export class Menu {
    text: string;
    public constructor(text: string) {
        this.text = text;
    }

    public getText() {
        return this.text;
    }
}
export const menuDefs = [
    { name: '', }
];
// export const menusDef = [new Menu('文(F)'), new Menu('(E)'), new Menu('段啊落(P)'), new Menu('格式(O)'), new Menu('视图(V)'), new Menu('主题(T)'), new Menu('帮助(H)')]
export const menusDef = [new Menu('文件(F)'), new Menu('编辑(E)'), new Menu('段落(P)'), new Menu('格式(O)'), new Menu('视图(V)'), new Menu('主题(T)'), new Menu('帮助(H)')]

export const menusDefineStore = defineStore('menus', {
    state: () => {
        return {
            menus: [] as Menu[],
        }
    },
    actions: {
        initDefault() {
            this.setMenus(menusDef);
        },
        async setMenus(menus: Menu[]) {
            this.menus = menus;
        },
        getMenus(): Menu[] {
            return this.menus;
        }
    }
}); 