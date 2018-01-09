import * as Core from '../core/index';
import * as _ from 'lodash';
import UIKit from 'uikit';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

class MessageBox extends Core.Component {

    private domName: JQuery;
    private domPhoto: JQuery;
    private domRecievedMsg: JQuery;
    private domTextarea: JQuery;
    private domButton: JQuery;

    private profileInfo: {[key: string]: any};
    private historyInfo: {[key: string]: any};

    private static readonly VARIANTS = {
        'aqua': 'aqua',
        'orangered': 'orangered',
    };

    private parametersObject: Core.TParameters = {
        'profile-id': '',
        'variant': 'aqua',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new MessageBox_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(MessageBox.VARIANTS);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.variant = this.parametersObject['variant'];
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-message-box');
        if (this.parametersObject['profile-id']) {
            if (this.dom.attr('data-profile-id') !== this.parametersObject['profile-id']) {
                this.dom.attr('data-profile-id', this.parametersObject['profile-id']);
            }
        } else {
            this.parametersObject['profile-id'] = this.dom.attr('data-profile-id');
        }
        this.dom.append(template.clone());
        this.domName = this.dom.find('.uikit-message-box-name');
        this.domPhoto = this.dom.find('.uikit-message-box-icons .photo img');
        this.domRecievedMsg = this.dom.find('.uikit-message-box-recieved div');
        this.domTextarea = this.dom.find('.uikit-message-box-textarea .uikit-input-textarea');
        this.domButton = this.dom.find('.uikit-message-box-btn .uikit-button');
        this.profileInfo = Core.Backend.getInfo('profile-bar', this.dom.attr('data-profile-id'));
        this.historyInfo = Core.Backend.getInfo('message-box', this.dom.attr('data-profile-id'));
        this.applyContent();
        UIKit.Input.create(this.domButton, { 
            'caption': 'Reply',
        });
        const textarea = UIKit.Input.create(this.domTextarea, { 
            'shadow-text': 'Enter message...',
        });
        textarea.variant = UIKit.Inputs.InputTextarea.VARIANTS.fullsize;
    }

    private applyContent() {
        this.domName.text(this.profileInfo.name);
        this.domPhoto.attr('src', this.profileInfo.photo);
        this.domRecievedMsg.text(this.historyInfo.lastmessage);
    }

    private applyEvents() {

    }
}

class MessageBox_Model extends Core.Model {
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

export default MessageBox;
