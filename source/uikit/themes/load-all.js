import * as jsonFile from './themes.conf.json';

jsonFile.list.map((item) => {
    require(`./${item}/style.styl`);
});

export default jsonFile;
