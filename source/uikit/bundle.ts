import * as Core from './core/index';

import Input from './input/index';
import InputText from './input/input-text/index';
import InputToggle from './input/toggle/index';
import InputButton from './input/input-button/index';
import InputSubmit from './input/input-submit/index';
import InputTextarea from './input/input-textarea/index';
import InputRadio from './input/input-radio/index';
import InputCheckbox from './input/input-checkbox/index';
import InputSearch from './input/input-search/index';
import InputDropdown from './input/input-dropdown/index';
import InputArrow from './input/input-arrow-button/index';
import ProfileBar from './profile-bar/index';
import News from './news/index';
import Event from './event/index';
import VideoPlayer from './video-player/index';
import MessageBox from './message-box/index';
import Location from './location/index';
import Calendar from './calendar/index';
import Stages from './stages/index';
import Tickbox from './tickbox/index';

const Inputs = {
    InputText,
    InputToggle,
    InputButton,
    InputSubmit,
    InputTextarea,
    InputRadio,
    InputCheckbox,
    InputSearch,
    InputDropdown,
    InputArrow,
};

Core.ThemeController.initialize();

export default {
    Core,
    Input,
    Inputs,
    ProfileBar,
    News,
    Event,
    VideoPlayer,
    MessageBox,
    Location,
    Calendar,
    Stages,
    Tickbox,
};
