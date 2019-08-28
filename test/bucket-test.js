const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
// const should = chai.should;

process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const myFuncPromise = async() => {
    const params = {
        Bucket: "veglist-test-edb8f258-f5b9-48b5-bf87-3fd21f3c318e-website"
    };

    s3.listObjectsV2(params).promise()
    .then((res) => {
        const objects = res.Contents;
        const objKeys = objects.map((object) => {
            return object.Key;
        });

        console.log(objKeys);
    })
    .catch((err) => console.log(err));
    return 'something';
};

describe('myFuncPromise', () => {
    it('should eventually return string something', () => {
        expect(myFuncPromise()).eventually.to.equal('something');
    });
});