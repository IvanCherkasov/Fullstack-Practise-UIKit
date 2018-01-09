import * as Core from '../../core/index';
import ProfileBar_Social from './social/index';
import ProfileBar_Person from './person/index';

class ProfileBar_Info extends Core.Element {

    private domSocial: JQuery;
    private domPerson: JQuery;

    private social: ProfileBar_Social;
    private person: ProfileBar_Person;

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
        defaultParameters: Core.TParameters,
        private profileInfo: {[key: string]: any},
    ) {
        super(dom, mediator, orientation, defaultParameters);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
    }

    protected build() {
        this.domSocial = this.dom.find('.uikit-profile-bar-social');
        this.domPerson = this.dom.find('.uikit-profile-bar-person');
        this.social = new ProfileBar_Social(
            this.domSocial,
            this.mediator,
            this.orientation,
            this.defaultParameters,
            this.profileInfo,
        );
        this.person = new ProfileBar_Person(
            this.domPerson,
            this.mediator,
            this.orientation,
            this.defaultParameters,
            this.profileInfo,
        );
    }
}

export default ProfileBar_Info;
