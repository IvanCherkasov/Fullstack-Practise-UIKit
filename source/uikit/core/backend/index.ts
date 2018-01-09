const prof1 = require('!!export-from-loader!json-loader!./bd/profile-bar/prof-1.json');
const prof2 = require('!!export-from-loader!json-loader!./bd/profile-bar/prof-2.json');

const news1 = require('!!export-from-loader!json-loader!./bd/news/news-1.json');
const news2 = require('!!export-from-loader!json-loader!./bd/news/news-2.json');

const event1 = require('!!export-from-loader!json-loader!./bd/event/event-1.json');
const event2 = require('!!export-from-loader!json-loader!./bd/event/event-2.json');

const video1 = require('!!export-from-loader!json-loader!./bd/video-player/video-1.json');
const videoFile1 = require('file-loader!./bd/video-player/fg_bird.mp4');
video1.link = `http://localhost/Fullstack-Practise-UIKit/build/${videoFile1}`;

const history1 = require('!!export-from-loader!json-loader!./bd/profile-bar/history/prof-1.json');
const history2 = require('!!export-from-loader!json-loader!./bd/profile-bar/history/prof-1.json');

const location1 = require('!!export-from-loader!json-loader!./bd/location/location-1.json');


class Backend {
    public static getInfo(elementId: string, itemId: string): {[key: string]: any} {
        switch (elementId) {
            case 'profile-bar':
                switch (itemId) {
                    case 'prof-1':
                        return prof1;
                    case 'prof-2':
                        return prof2;
                    default:
                        return undefined;
                }
            case 'news':
                switch (itemId) {
                    case 'news-1':
                        return news1;
                    case 'news-2':
                        return news2;
                    default:
                        return undefined;
                }
            case 'event':
                switch (itemId) {
                    case 'event-1':
                        return event1;
                    case 'event-2':
                        return event2;
                    default:
                        return undefined;
                }
            case 'video-player':
                switch (itemId) {
                    case 'video-1':
                        return video1;
                    default:
                        return undefined;
                }
            case 'message-box':
                switch (itemId) {
                    case 'prof-1':
                        return history1;
                    case 'prof-2':
                        return history2;
                    default:
                        return undefined;
                }
            case 'location':
                switch (itemId) {
                    case 'location-1':
                        return location1;
                    default:
                        return undefined;
                }
            default:
                return undefined;
        }
    }
}

export default Backend;
