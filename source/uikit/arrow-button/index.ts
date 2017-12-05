import './themes/index';
import * as UIKit from '../uikit-core/index';

class ArrowButton extends UIKit.Core.Component{

    public static readonly TYPES = {
        LEFT: 'left',
        RIGHT: 'right',
    };

    private clickCallbacks: Function[] = [];

    constructor(dom: JQuery) {
        super(dom);
        this.initialize();
    }

    protected initialize() {

        // применение типа отложено до инициализации (super.initialize())
        this.types = new UIKit.Core.Types(ArrowButton.TYPES);
        const type = this.dom.attr('data-type');
        if (this.types.contains(type)) {
            this.type = type;
        } else {
            this.type = ''; // no type default
        }

        const model = new ArrowButton_Model();
        this.mediator = new UIKit.Core.Mediator(model);

        this.dom.on('click.uikit.arrow-button.custom', (event) => {
            if (this.enabled) {
                this.clickCallbacks.map((item) => {
                    item(event);
                });
            }
        });

        super.initialize();
    }

    public set click(foo: (event) => void) {
        this.clickCallbacks.push(foo);
    }
}

class ArrowButton_Model extends UIKit.Core.Model{
    constructor() {
        super();
    }
}

export default ArrowButton;
