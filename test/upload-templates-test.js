const chai = require('chai');
const expect = chai.expect;

const fs = require('fs');
const testParams = [
    '../cloudformation',
    '.',
    'json'
];

const myFunc = (params) => {
    if (!params || params.length === 0) console.log('Err: No parameters.');
    const folder = params[0];
    const char = params[1];
    const fileType = params[2];
    const fileList = fs.readdirSync(folder).filter((file) => {
        let str = file;
        if (str.substring(str.lastIndexOf(char) + 1) === fileType) {
            return file;
        }
    });
    console.log(fileList);
    return 'something';
};

describe('myFunc', () => {
    it('should return string something', () => {
        expect(myFunc(testParams)).to.equal('something');
    });
});
