import './themes/index';
import * as Core from '../core/index';

class ArrowButton extends Core.Component {
    public static readonly TYPES = {
        LEFT: 'left',
        RIGHT: 'right',
    };

    public static create(dom: JQuery): ArrowButton {
        return new ArrowButton(dom);
    }

    constructor(dom: JQuery) {
        super(dom);
        const model = new ArrowButton_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize() {
        this.acceptType(ArrowButton.TYPES, '');
        this.build();
        this.isBuilded = true;
    }

    public build() {
        this.dom.empty();
    }
}

class ArrowButton_Model extends Core.Model {
    constructor() {
        super();
    }

    public getData(property: string): any {
        return undefined;
    }

    public setData(property: string, data: any): boolean {
        return false;
    }
}

export default ArrowButton;
