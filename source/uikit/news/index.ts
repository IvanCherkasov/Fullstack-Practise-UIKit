import * as Core from '../core/index';
import * as _ from 'lodash';
import './themes/index';
const templatePug = require('./body.pug');
const template = $(templatePug());

interface DomArticle {
    domHeader: JQuery;
    domDate: JQuery;
    domContent: JQuery;
}

class News extends Core.Component {

    private newsInfo: {[key: string]: any};

    private domPicture:JQuery;
    private domArticle: DomArticle;

    private static readonly VARIANTS = {
        'aqua': 'aqua',
        'orangered': 'orangered',
    };

    private parametersObject: Core.TParameters = {
        'variant': 'orangered',
        'news-id': '',
    };

    constructor(dom: JQuery, parameters?: Core.TParameters) {
        super(dom);
        if (parameters) {
            _.merge(this.parametersObject, parameters);
        }
        const model = new News_Model();
        this.mediator = new Core.Mediator(model);
        this.availableVariants = new Core.Orientations(News.VARIANTS);
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
        this.dom.addClass('uikit-news');
        if (this.parametersObject['news-id']) {
            if (this.dom.attr('data-news-id') !== this.parametersObject['news-id']) {
                this.dom.attr('data-news-id', this.parametersObject['news-id']);
            }
        } else {
            this.parametersObject['news-id'] = this.dom.attr('data-news-id');
        }
        this.newsInfo = Core.Backend.getInfo('news', this.dom.attr('data-news-id'));
        this.dom.append(template.clone());
        this.domPicture = this.dom.find('.uikit-news-picture img');
        this.domArticle = {
            domHeader: this.dom.find('.uikit-news-article .uikit-news-header'),
            domContent: this.dom.find('.uikit-news-article .uikit-news-content'),
            domDate: this.dom.find('.uikit-news-article .uikit-news-date p'),
        };
        this.domPicture.attr('src', this.newsInfo.picture);
        this.domArticle.domHeader.text(this.newsInfo.header);
        this.domArticle.domDate.text(this.newsInfo.date);
        this.domArticle.domContent.empty();
        this.newsInfo.content.map((line) => {
            const p = $('<p>').text(line);
            this.domArticle.domContent.append(p);
        });
    }

    private applyEvents() {
        this.mediator.subscribe('parameters.news-id', () => {
            this.domPicture.attr('src', this.newsInfo.picture);
            this.domArticle.domHeader.text(this.newsInfo.header);
            this.domArticle.domDate.text(this.newsInfo.date);
            this.domArticle.domContent.empty();
            this.newsInfo.content.map((line) => {
                const p = $('<p>').text(line);
                this.domArticle.domContent.append(p);
            });
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
                    case 'news-id':
                        this.newsInfo = Core.Backend.getInfo('news', newParams[current]);
                        this.mediator.publish(`parameters.news-id`, this.newsInfo);
                        break;
                    default:
                        this.mediator.publish(`parameters.${current}`, newParams[current]);
                }
            }
        });
    }
}

class News_Model extends Core.Model {
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

export default News;
