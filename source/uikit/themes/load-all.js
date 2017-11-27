import * as jsonFile from './themes.conf.json';

if (jsonFile.list.indexOf(jsonFile.base) > -1) {
    throw new ReferenceError('список тем не должен содержать базовую тему!');
}
const base = jsonFile.baseTheme;
jsonFile.list.map((item) => {
    require(`./${item}/index.js`);
});
require(`./${base}/index.js`);

export default jsonFile;
