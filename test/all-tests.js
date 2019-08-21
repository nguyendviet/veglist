const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

const {uploadTemplates} = require('../helpers/upload-templates');
const {testType, testFolder, testBucket} = require('../config/test-config').uploadTemplates;

describe('Function uploadTemplates', () => {
    it(`should upload files to S3 bucket without errors`, () => {
        expect(uploadTemplates(testType, testFolder, testBucket)).eventually.to.not.throw(Error);
    });
});