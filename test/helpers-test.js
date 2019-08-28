const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const {uploadTemplates} = require('../helpers/templates');
const {testType, testFolder, testBucket} = require('../config/test-config').uploadTemplates;

describe('Function uploadTemplates', () => {
    it(`should upload files to S3 bucket without errors`, () => {
        uploadTemplates(testType, testFolder, testBucket)
        .then((results) => {
            expect(results).to.be.an('array');
            results.forEach((result) => {
                expect(result).to.be.an('object').that.have.property('Location');
            })
        });
    });
});
