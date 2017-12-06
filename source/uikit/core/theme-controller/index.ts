import themes from '../../themes.conf';

class ThemeController {
    private static themes: string[] = themes.list;
    private static baseTheme: string = themes.baseTheme;
    private static inited: boolean = false;

    private static clearThemes() {
        this.themes.map((themeName) => {
            $('body').removeClass(themeName);
        });
    }

    public static changeTheme(themeName: string) {
        if (this.themes.indexOf(themeName) > -1) {
            this.clearThemes();
            $('body').addClass(themeName);
        } else {
            if (themeName === this.baseTheme) {
                this.clearThemes();
            }
        }
    }

    public static getAll(): string[] {
        const outArray: string[] = [];
        outArray.push(this.baseTheme);
        this.themes.map((theme) => {
            outArray.push(theme);
        });
        return outArray;
    }

    public static initialize() {
        if (!this.inited) {
            $('body').addClass(this.baseTheme);
            this.inited = true;
        }
    }
}

export default ThemeController;
