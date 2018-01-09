import * as Core from '../../../core/index';

class ProfileBar_Social extends Core.Element {

    private domFB: JQuery;
    private domTW: JQuery;
    private domDR: JQuery;

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
        this.domFB = this.dom.find('.social-facebook');
        this.domTW = this.dom.find('.social-twitter');
        this.domDR = this.dom.find('.social-dribbble');
        this.domFB.attr('href', this.profileInfo.social.facebook);
        this.domTW.attr('href', this.profileInfo.social.twitter);
        this.domDR.attr('href', this.profileInfo.social.dribbble);
    }

    private applyEvents() {
        this.mediator.subscribe('parameters.profile-id', (info) => {
            this.profileInfo = info;
            this.domFB.attr('href', this.profileInfo.social.facebook);
            this.domTW.attr('href', this.profileInfo.social.twitter);
            this.domDR.attr('href', this.profileInfo.social.dribbble);
        });
    }
}

export default ProfileBar_Social;
