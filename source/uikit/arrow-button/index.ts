import './index.styl';
import * as UIKit from '../uikit-core/index';

class ArrowButton extends UIKit.Core.Element{

    private clickCallbacks: Function[] = [];

    constructor(element: JQuery) {
        super(element);
        this.initialize();
    }

    protected initialize() {

        // применение типа отложено до инициализации (super.initialize())
        this.type = UIKit.Core.Types.LEFT;
        const type: string = this.element.attr('data-type');
        if (type) {
            this.type = type;
        }

        const model = new ArrowButton_Model();
        this.mediator = new UIKit.Core.Mediator(model);
/*
        const midiatorElementType = () => {
            if (this.type === UIKit.Core.Types.LEFT) {
                // remove - Так как стоит noRebuild === true
                this.element.removeClass(UIKit.Core.Types.RIGHT);
                this.element.addClass(UIKit.Core.Types.LEFT);

            } else if (this.type === UIKit.Core.Types.RIGHT) {

                this.element.removeClass(UIKit.Core.Types.LEFT);
                this.element.addClass(UIKit.Core.Types.RIGHT);
            }
        };
        this.mediator.subscribe('element.type', midiatorElementType);*/

        this.element.on('click.uikit.arrow-button.custom', (event) => {
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
