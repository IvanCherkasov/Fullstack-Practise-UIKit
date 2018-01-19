import * as Core from '../core/index';
import * as _ from 'lodash';
import ProfileBar_Info from './info/index';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

class ProfileBar extends Core.Component {

    private original: JQuery;
    private profileInfo: {[key: string]: any};

    private domPhoto: JQuery;
    private domInfo: JQuery;
    private info: ProfileBar_Info;

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
        const model = new ProfileBar_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(ProfileBar.VARIANTS);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.variant = this.parametersObject['variant'];
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-profile-bar');
        if (this.parametersObject['profile-id']) {
            if (this.dom.attr('data-profile-id') !== this.parametersObject['profile-id']) {
                this.dom.attr('data-profile-id', this.parametersObject['profile-id']);
            }
        } else {
            this.parametersObject['profile-id'] = this.dom.attr('data-profile-id');
        }
        this.profileInfo = Core.Backend.getInfo('profile-bar', this.dom.attr('data-profile-id'));
        this.dom.append(template.clone());
        this.domPhoto = this.dom.find('.uikit-profile-bar-photo img');
        this.domPhoto.attr('src', this.profileInfo.photo);
        this.domInfo = this.dom.find('.uikit-profile-bar-info');
        this.info = new ProfileBar_Info(
            this.domInfo,
            this.mediator,
            this.orientation,
            _.cloneDeep(this.parametersObject),
            this.profileInfo,
        );
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
                    case 'profile-id':
                        this.profileInfo = Core.Backend.getInfo('profile-bar', newParams[current]);
                        this.mediator.publish(`parameters.profile-id`, this.profileInfo);
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class ProfileBar_Model extends Core.Model {
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

export default ProfileBar;
