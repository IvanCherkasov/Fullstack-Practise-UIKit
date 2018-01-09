import * as Core from '../core/index';
import * as _ from 'lodash';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

class Location extends Core.Component {

    private locationInfo: {[key: string]: any};

    private domMap: JQuery;
    private domGreet: JQuery;
    private domState: JQuery;
    private domTown: JQuery;

    private parametersObject: Core.TParameters = {
        'variant': 'orangered',
        'location-id': '',
    };

    private static readonly VARIANTS = {
        'aqua': 'aqua',
        'orangered': 'orangered',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new Location_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(Location.VARIANTS);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.variant = this.parametersObject['variant'];
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-location');
        if (this.parametersObject['location-id']) {
            if (this.dom.attr('data-location-id') !== this.parametersObject['location-id']) {
                this.dom.attr('data-location-id', this.parametersObject['location-id']);
            }
        } else {
            this.parametersObject['location-id'] = this.dom.attr('data-location-id');
        }
        this.locationInfo = Core.Backend.getInfo('location', this.dom.attr('data-location-id'));
        this.dom.append(template.clone());
        this.domMap = this.dom.find('.uikit-location-map img');
        this.domGreet = this.dom.find('.uikit-location-greet div');
        this.domState = this.dom.find('.uikit-location-state div');
        this.domTown = this.dom.find('.uikit-location-town div');
        this.applyContent();
    }

    private applyContent() {
        this.domMap.attr('src', this.locationInfo.map);
        this.domGreet.text(this.locationInfo.greet);
        this.domState.text(this.locationInfo.state);
        this.domTown.text(this.locationInfo.town);
    }   
}

class Location_Model extends Core.Model {
    constructor() {
        super({
        });
    }

    public getData(property: string): any {
        return undefined;
    }

    public setData(property: string, data: any): boolean {
        return false;
    }
}

export default Location;
