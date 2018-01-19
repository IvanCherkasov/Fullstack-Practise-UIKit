import * as Core from '../core/index';
import * as _ from 'lodash';
import VideoPlayer_Controls from './controls/index';
import './themes/index';
import { setTimeout } from 'timers';
const templatePug = require('./body.pug');
const template = $(templatePug());

interface DomTitle {
    domName: JQuery;
    domAuthor: JQuery;
    domLink: JQuery;
}

class VideoPlayer extends Core.Component {

    private videoInfo: {[key: string]: any};

    private controls: VideoPlayer_Controls;

    private domTitle: DomTitle;
    private domControls: JQuery;
    private domVideo: JQuery;
    private domMask: JQuery;

    private timer: number;
    private moveTimer: number;
    private moveTimerValue: boolean = true;

    private videoHtmlDom: HTMLVideoElement;

    private parametersObject: Core.TParameters = {
        'video-id': '',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new VideoPlayer_Model();
        this.mediator = new Core.Mediator(model);
        this.initialize();
    }

    private initialize() {
        this.build();
        this.dom.attr('data-playing', 'false');
        this.isBuilded = true;
        this.applyEvents();
    }

    protected build() {
        this.dom.empty();
        this.dom.addClass('uikit-video-player');
        if (this.parametersObject['video-id']) {
            if (this.dom.attr('data-video-id') !== this.parametersObject['video-id']) {
                this.dom.attr('data-video-id', this.parametersObject['video-id']);
            }
        } else {
            this.parametersObject['video-id'] = this.dom.attr('data-video-id');
        }
        this.videoInfo = Core.Backend.getInfo('video-player', this.dom.attr('data-video-id'));
        this.dom.append(template.clone());
        this.domControls = this.dom.find('.uikit-video-player-controls');
        this.domTitle = {
            domAuthor: this.dom.find('.uikit-video-player-author'),
            domLink: this.dom.find('.uikit-video-player-link p'),
            domName: this.dom.find('.uikit-video-player-name'),
        };
        this.domMask = this.dom.find('.mask');
        this.domVideo = this.dom.find('video');
        this.applyContent();
        this.domVideo.attr('src', this.videoInfo.link);
        this.videoHtmlDom = (this.domVideo.get(0) as HTMLVideoElement);
        this.controls = new VideoPlayer_Controls(
            this.domControls,
            this.mediator,
            this.orientation,
        );
    }

    private applyContent() {
        this.domTitle.domName.text(this.videoInfo.title.name);
        this.domTitle.domAuthor.text(this.videoInfo.title.author);
        this.domTitle.domLink.text(this.videoInfo.link);
    }

    private applyEvents() {
        this.mediator.subscribe('parameters.video-id', () => {
            this.applyContent();
        });

        this.domVideo.on('timeupdate', () => {
            this.mediator.publish('video.timeupdate', this.videoHtmlDom.currentTime);
        });

        this.domVideo.on('canplaythrough', () => {
            this.mediator.publish(
                'video.canplaythrough', 
                this.videoHtmlDom.duration, 
                this.videoHtmlDom.volume);
        });

        this.domVideo.on('playing', () => {
            this.mediator.publish('video.playing');
            this.dom.attr('data-playing', 'true');
        });

        this.domVideo.on('pause', () => {
            this.mediator.publish('video.pause');
            this.dom.attr('data-playing', 'false');
        });

        this.mediator.subscribe('model.isPlaying', (modelData) => {
            if (modelData.isPlaying === 'true') {
                this.videoHtmlDom.play();
            } else {
                this.videoHtmlDom.pause();
            }
        });

        this.dom.on('mouseenter', (event) => {
            this.mediator.publish('mouseenter', event);
            if (this.isPlaying) {
                this.showControls(3000);
            } else {
                this.showControls();
            }
        });

        this.dom.on('mouseleave', (event) => {
            this.mediator.publish('mouseleave', event);
            if (this.isPlaying) {
                this.hideControls();
            }
        });

        this.dom.on('mousemove', (event) => {
            if (this.moveTimerValue) {
                this.moveTimerValue = false;
                if (this.isPlaying) {
                    this.showControls(3000);
                }
                this.mediator.publish('mousemove', event);
                this.moveTimer = window.setTimeout(() => {this.moveTimerValue = true;}, 250);
            }
        });

        this.domVideo.on('volumechange', () => {
            this.mediator.publish('video.volumechange', this.videoHtmlDom.volume);
        });

        this.mediator.subscribe('video.volumechange', (volume) => {
            if (volume !== this.videoHtmlDom.volume) {
                this.videoHtmlDom.volume = volume;
            }
        });

        this.mediator.subscribe('video.rewind', (current) => {
            this.videoHtmlDom.currentTime = current;
        });

        this.domMask.on('click', () => {
            if (!this.isPlaying) {
                this.play();
            } else {
                this.pause();
            }
        });
    }

    private showControls(delay?: number) {
        window.clearTimeout(this.timer);
        this.timer = null;
        this.dom.attr('data-controls-show', 'true');
        if (delay) {
            this.timer = window.setTimeout(() => {
                this.hideControls();
            }, delay);
        }
    }

    private hideControls() {
        if (this.isPlaying) {
            this.dom.attr('data-controls-show', 'false');
        }
    }

    public get parameters(): Core.TParameters {
        return _.cloneDeep(this.parametersObject);
    }

    public set parameters(newParams: Core.TParameters) {
        _.merge(this.parametersObject, newParams);
        const keys = Object.keys(newParams);
        keys.map((current) => {
            switch (current) {
                case 'video-id':
                    this.videoInfo = Core.Backend.getInfo('video-player', newParams[current]);
                    this.mediator.publish(`parameters.video-id`, this.videoInfo);
                    break;
                default:
                    this.mediator.publish(`parameters.${current}`, newParams[current]);
            }
        });
    }

    public play() {
        this.mediator.setData('model.isPlaying', 'true');
    }

    public pause() {
        this.mediator.setData('model.isPlaying', 'false');
    }

    public get isPlaying(): boolean {
        return (this.mediator.getData('model.isPlaying') === 'true');
    }

    public get duration(): number {
        return this.mediator.getData('model.duration');
    }

    public get currentTime(): number {
        return this.mediator.getData('model.currentTime');
    }

    public set currentTime(value: number) {
        this.mediator.setData('model.currentTime', value);
    }
}

class VideoPlayer_Model extends Core.Model {
    constructor() {
        super({
            isPlaying: 'false',
            duration: 0,
            currentTime: 0,
        });
    }

    public getData(property: string): any {
        switch (property) {
            case 'isPlaying':
                return this.data.isPlaying;
            case 'duration':
                return this.data.duration;
            case 'currentTime':
                return this.data.currentTime;
                default:
                    return undefined;
        }
    }

    public setData(property: string, data: any): boolean {
        switch (property) {
            case 'isPlaying':
                this.data.isPlaying = data;
                return true;
            case 'duration':
                this.data.duration = data;
                return true;
            case 'currentTime':
                this.data.currentTime = data;
                return true;
                default:
                    return false;
        }
    }
}

export default VideoPlayer;
