import * as Core from '../../../core/index';

class VideoPlayer_Range extends Core.Element {

    private duration: number;

    private domTrack: JQuery;
    private domFiller: JQuery;
    private domFilled: JQuery;
    private domUpper: JQuery;
    private domUpperText: JQuery

    private domDuration: JQuery;
    private domCurrentTime: JQuery;

    private rangeMinimum: number = 0;
    private rangeMaximum: number;
    private coordSystem: Core.CoordinateSystem;

    private isMouseDrag: boolean = false;

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
        this.domTrack = this.dom.find('.track');
        this.domCurrentTime = this.dom.find('.current-time');
        this.domDuration = this.dom.find('.duration');
        this.domFilled = this.dom.find('.filled');
        this.domFiller = this.dom.find('.filler');
        this.domUpper = this.dom.find('.upper');
        this.domUpperText = this.domUpper.find('div');
        this.coordSystem = new Core.CoordinateSystem(this.domTrack);
    }

    private applyEvents() {
        this.mediator.subscribe('video.canplaythrough', (duration) => {
            this.duration = duration;
            this.rangeMaximum = this.duration;
            this.domDuration.text(this.secondsToTime(this.duration));
        });

        this.mediator.subscribe('video.timeupdate', (currentTime) => {
            const percent = (100 / this.rangeMaximum) * currentTime;
            this.domFilled.attr('style', `width: ${percent}%;`);
            this.domCurrentTime.text(this.secondsToTime(currentTime));
        });

        this.domTrack.on('mouseenter', () => {
            this.domUpper.attr('data-show', 'true');
        });

        this.domTrack.on('mouseleave', () => {
            this.domUpper.attr('data-show', 'false');
        });

        this.domTrack.on('mousemove', (event) => {
            let position: number = 0;
            let percent: number = 0;
            position = event.pageX - this.coordSystem.xMin;
            percent = (100 / (this.coordSystem.width)) * position;
            this.domUpper.attr('style', `left: ${percent}%;`);
            const current = (percent / 100) * this.duration;
            this.domUpperText.text(this.secondsToTime(current));
            if (this.isMouseDrag) {
                this.rewind(event);
            }
        });

        this.domTrack.on('click', (event) => {
            this.rewind(event);
        });

        this.domTrack.on('mousedown', (event) => {
            this.isMouseDrag = true;
            $(document).on('mouseup.uikit.video.track', () => {
                this.isMouseDrag = false;
                $(document).off('mouseup.uikit.video.track');
            });
        });
    }

    private rewind(event) {
        const position = event.pageX - this.coordSystem.xMin;
        const percent = (100 / (this.coordSystem.width)) * position;
        const current = (percent / 100) * this.duration;
        this.mediator.publish('video.rewind', current);
}

    private secondsToTime(secNum: number) {
        const hours = Math.floor(secNum / 3600);
        const minutes = Math.floor((secNum - (hours * 3600)) / 60);
        const seconds = Math.floor(secNum - (hours * 3600) - (minutes * 60));

        let hStr = `${hours}`;
        let mStr = `${minutes}`;
        let sStr = `${seconds}`;

        if (hours   < 10) { hStr = `0${hStr}`;}
        if (minutes < 10) { mStr = `0${mStr}`;}
        if (seconds < 10) { sStr = `0${sStr}`;}

        return `${hStr}:${mStr}:${sStr}`; 
    }
}

export default VideoPlayer_Range;
