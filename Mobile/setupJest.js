const babelJest = require('babel-jest');
const includeStylesSvg = new RegExp(/require\(\s*\'.*\.(css|svg)\'\);/gm);
const storeStylesSvg = new RegExp(/= require\(\s*\'.*\.(css|svg)\'\);/gm);

module.exports = {
    process: (src, filename) => {
        return babelJest
            .process(src, filename)
            .replace(storeStylesSvg, '= \'\';')
            .replace(includeStylesSvg, '');
        }
};