import * as Core from '../../../core/index';

class ProfileBar_Person extends Core.Element {

    private domName: JQuery;
    private domOccupation: JQuery;

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
        this.applyEvents();
    }

    protected build() {
        this.domName = this.dom.find('.uikit-profile-bar-name');
        this.domOccupation = this.dom.find('.uikit-profile-bar-occupation');
        this.domName.text(this.profileInfo.name);
        this.domOccupation.text(this.profileInfo.occupation);
    }

    private applyEvents() {
        this.mediator.subscribe('parameters.profile-id', (info) => {
            this.profileInfo = info;
            this.domName.text(this.profileInfo.name);
            this.domOccupation.text(this.profileInfo.occupation);
        });
    }
}

export default ProfileBar_Person;
