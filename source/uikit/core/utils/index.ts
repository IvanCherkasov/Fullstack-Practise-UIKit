class Utils {
    public static isUikit(dom: JQuery): boolean {
        if (dom.hasClass('uikit')) {
            return true;
        }
        return false;
    }

    public static getAllAttributes(obj: JQuery): object {
        const attributes: object = {};
        const elementEachCallback = (item) => {
            $.each(item.attributes, function () {
                if (this.specified) {
                    attributes[this.name] = this.value;
                }
            });
        };
        obj.toArray().map(elementEachCallback);
        return attributes;
    }
}

export default Utils;
