import UIKit from 'uikit';
import * as Core from '../core/index';
import * as _ from 'lodash';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

interface DomContent {
    domTitle: JQuery;
    domText: JQuery;
    domButton: JQuery;
    domDateDay: JQuery;
    domDateMonth: JQuery;
}

class Event extends Core.Component {

    private eventInfo: {[key: string]: any};

    private domPicture:JQuery;
    private domContent: DomContent;

    private static readonly VARIANTS = {
        'aqua': 'aqua',
        'orangered': 'orangered',
    };

    private parametersObject: Core.TParameters = {
        'variant': 'aqua',
        'event-id': '',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new Event_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(Event.VARIANTS);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
        this.variant = this.parametersObject['variant'];
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-event');
        if (this.parametersObject['event-id']) {
            if (this.dom.attr('data-event-id') !== this.parametersObject['event-id']) {
                this.dom.attr('data-event-id', this.parametersObject['event-id']);
            }
        } else {
            this.parametersObject['event-id'] = this.dom.attr('data-event-id');
        }
        this.eventInfo = Core.Backend.getInfo('event', this.dom.attr('data-event-id'));
        this.dom.append(template.clone());
        this.domPicture = this.dom.find('.uikit-event-picture img');
        this.domContent = {
            domDateDay: this.dom.find('.uikit-event-date .uikit-event-date-day'),
            domDateMonth: this.dom.find('.uikit-event-date .uikit-event-date-month'),
            domText: this.dom.find('.uikit-event-text'),
            domTitle: this.dom.find('.uikit-event-title'),
            domButton: this.dom.find('.uikit-event-action div'),
        };
        this.applyContent();
    }

    private applyContent() {
        this.domPicture.attr('src', this.eventInfo.picture);
        this.domContent.domTitle.text(this.eventInfo.title);
        this.domContent.domDateDay.text(this.eventInfo.date.day);
        this.domContent.domDateMonth.text(this.eventInfo.date.month);
        this.eventInfo.text.map((line) => {
            const p = $('<p>').text(line);
            this.domContent.domText.append(p);
        });
        this.domContent.domButton.attr('data-type', 'button');
        UIKit.Input.create(this.domContent.domButton, { 
            'caption': this.eventInfo.action.caption,
            'variant': `event.${this.parametersObject['variant']}`,
        });
    }

    private applyEvents() {
        this.mediator.subscribe('parameters.event-id', () => {
            this.applyContent();
        });
    }

    public get parameters(): Core.TParameters {
        return _.cloneDeep(this.parametersObject);
    }

    public set parameters(newParams: Core.TParameters) {
        _.merge(this.parametersObject, newParams);
        const keys = Object.keys(newParams);
        keys.map((current) => {
            if (typeof newParams[current] === 'string') {
                switch (current) {
                    case 'variant':
                        this.variant = newParams[current];
                        break;
                    case 'event-id':
                        this.eventInfo = Core.Backend.getInfo('event', newParams[current]);
                        this.mediator.publish(`parameters.event-id`, this.eventInfo);
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class Event_Model extends Core.Model {
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

export default Event;
