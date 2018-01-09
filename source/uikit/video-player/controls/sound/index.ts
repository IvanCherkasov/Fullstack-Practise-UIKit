import * as Core from '../../../core/index';

class VideoPlayer_Sound extends Core.Element {

    private domTrack: JQuery;
    private domFilled: JQuery;
    private isDrag: boolean;
    private coordSystem: Core.CoordinateSystem;
    private volume: number = -1;

    constructor(
        dom: JQuery,
        mediator: Core.Mediator,
        orientation: string,
    ) {
        super(dom, mediator, orientation);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.domTrack = this.dom.find('.sound-track');
        this.domFilled = this.dom.find('.sound-filled');
        this.coordSystem = new Core.CoordinateSystem(this.domTrack);
    }

    private applyEvents() {
        this.domTrack.on('click', (event) => {
            this.changeSound(event);
        });

        this.domTrack.on('mousedown', (event) => {
            this.isDrag = true;
            $(document).on('mouseup.uikit.video.sound.track', () => {
                this.isDrag = false;
                $(document).off('mouseup.uikit.video.sound.track');
            });
        });

        this.domTrack.on('mousemove', (event) => {
            if (this.isDrag) {
                this.changeSound(event);
            }
        });

        this.mediator.subscribe('video.volumechange', (volume) => {
            if (this.volume !== volume) {
                this.domFilled.css('height', `${volume * 100}%`);
                this.volume = volume;
            }
        });

        this.mediator.subscribe('video.canplaythrough', (duration, volume) => {
            this.mediator.publish('video.volumechange', volume);
        });
    }

    private changeSound(event) {
        const position = event.pageY - this.coordSystem.yMin;
        const percent = 100 - (100 / (this.coordSystem.height)) * position;
        console.log(percent);
        this.mediator.publish('video.volumechange', percent / 100);
    }
}

export default VideoPlayer_Sound;
