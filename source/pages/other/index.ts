import UIKit from 'uikit';

const profileBar1 = new UIKit.ProfileBar($('#profile-1-bar-id'), { 'variant': 'orangered' });
const profileBar2 = new UIKit.ProfileBar($('#profile-2-bar-id'), { 'variant': 'aqua' });
const news1 = new UIKit.News($('#news-1-id'), { 'variant': 'orangered' });
const news2 = new UIKit.News($('#news-2-id'), { 'variant': 'aqua' });
const event1 = new UIKit.Event($('#event-1-id'), { 'variant': 'aqua' });
const event2 = new UIKit.Event($('#event-2-id'), { 'variant': 'orangered' });
const video1 = new UIKit.VideoPlayer($('#video-player-1-id'));
const msgbox1 = new UIKit.MessageBox($('#message-box-1-id'));
const msgbox2 = new UIKit.MessageBox($('#message-box-2-id'), { 'variant': 'orangered' });
const location1 = new UIKit.Location($('#location-1-id'));
const calendar1 = new UIKit.Calendar($('#calendar-1-id'));
const stages1 = new UIKit.Stages($('#stages-id-1'));
stages1.stage = 3;
