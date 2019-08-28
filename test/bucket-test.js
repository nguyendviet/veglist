const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
// const should = chai.should;

process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const BUCKET = "veglist-test-7d54aa10-2cd8-4c39-a4-pipelinebucket-13pepu4z4um6y";

/**
 * Function delete all objects inside a bucket,
 * based on objects and bucket name.
 * @param {obj} obj Objects to be deleted.
 * @param {bucket} bucket Bucket name.
 */
const deleteThis = (obj, bucket) => {
    var params = {
        Bucket: bucket, 
        Delete: {
            Objects: obj,
            Quiet: false
        }
    };

    return new Promise((ressolve, reject) => {
        s3.deleteObjects(params).promise()
        .then((deleted) => {
            console.log(`Bucket ${bucket} is now empty.`);
            ressolve(deleted);
        })
        .catch((err) => console.log(err));
    })
};

/**
 * Function remove all objects inside a bucket,
 * based on the bucket name.
 * @param {bucket} bucket Bucket name.
 */
const cleanThis = async(bucket) => {
    const params = {
        Bucket: bucket
    };

    return new Promise((resolve, reject) => {
        // Get list of object keys.
        s3.listObjectsV2(params).promise()
        .then((res) => {
            const objects = res.Contents;
    
            if (objects.length === 0) {
                console.log(`Bucket ${bucket} is empty.`);
            }
            else {
                console.log(`Deleting objects in bucket ${bucket}.`);
                const keyObj = objects.map((object) => {
                    return {Key: object.Key};
                });
                // Start deleting objects.
                resolve(deleteThis(keyObj, bucket));
            }
        })
        .catch((err) => console.log(err));
    });
};

describe('cleanThis', () => {
    it('should eventually return confirmation Deleted', () => {
        expect(cleanThis(BUCKET)).eventually.to.have.property('Deleted');
    });
});
