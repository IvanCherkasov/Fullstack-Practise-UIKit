import * as Core from '../../core/index';
import VideoPlayer_Range from './range/index';
import VideoPlayer_Sound from './sound/index';

class VideoPlayer_Controls extends Core.Element {

    private domPP: JQuery;
    private domRange: JQuery;
    private domFsBtn: JQuery;
    private domSound: JQuery;

    private range: VideoPlayer_Range;
    private sound: VideoPlayer_Sound;

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
    ) {
        super(dom, mediator, orientation);
        this.initialize();
    }

    protected initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.domPP = this.dom.find('.uikit-video-player-pp');
        this.domRange = this.dom.find('.uikit-video-player-range');
        this.domFsBtn = this.dom.find('.uikit-video-player-fsbtn');
        this.domSound = this.dom.find('.uikit-video-player-sound');
        this.range = new VideoPlayer_Range(
            this.domRange,
            this.mediator,
            this.orientation,
        );
        this.sound = new VideoPlayer_Sound(
            this.domSound,
            this.mediator,
            this.orientation,
        );
    }

    private applyEvents() {
        this.domPP.on('click', () => {
            this.mediator.setData('model.isPlaying', 
            `${(this.mediator.getData('model.isPlaying') === 'false')}`);
        });
    }
}

export default VideoPlayer_Controls;
