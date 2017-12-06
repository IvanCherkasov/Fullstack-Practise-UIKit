import './themes/index';
import Component from '../core/component/index';
import Mediator from '../core/mediator/index';
import Model from '../core/model/index';
import Types from '../core/types/index';

class ArrowButton extends Component {
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
        this.mediator = new Mediator(model);
        this.build();
        this.isBuilded = true;
        this.acceptType();
    }

    private acceptType() {
        this.availableTypes = new Types(ArrowButton.TYPES);
        const type = this.dom.attr('data-type');
        if (this.availableTypes.contains(type)) {
            this.type = type;
        } else {
            this.type = ''; // no type default
        }
    }

    public build() {
        this.dom.empty();
    }
}

class ArrowButton_Model extends Model {
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
