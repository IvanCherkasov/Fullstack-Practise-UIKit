class Utils {
    public static isUikit(dom: JQuery): void {
        if (!dom.hasClass('uikit')) {
            dom.addClass('uikit');
        }
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
