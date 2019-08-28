const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

const {uploadTemplates} = require('../helpers/templates');
const {type, folder, bucket} = require('../config/test-config').uploadTemplates;

describe('uploadTemplates', () => {
    it(`should upload files to S3 bucket without errors`, () => {
        uploadTemplates(type, folder, bucket)
        .then((results) => {
            expect(results).to.be.an('array');
            results.forEach((result) => {
                expect(result).to.be.an('object').that.have.property('Location');
            })
        });
    });
});
