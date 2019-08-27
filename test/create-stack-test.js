const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const {templateBucketName, testStackName, parameters, testTemplate, testTemplateBucketFolder} = require('../config/test-config').createStack;

process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

/**
 * Function creates CloudFormation stack.
 * @param {stackName} stackName Name of the CloudFormation stack.
 * @param {template} template CloudFormation template file (json or yml).
 * @param {bucketName} bucketName Template bucket name.
 * @param {bucketFolder} bucketFolder Template bucket folder.
 */
const createStack = (...p) => {
    if (!p || p.length === 0) console.log('Err: No parameters.');
    const [stackName, template, parameters, bucketName, bucketFolder] = [...p];
    const params = {
        StackName: stackName, /* required */
        Capabilities: ['CAPABILITY_IAM'],
        OnFailure: 'ROLLBACK',
        Parameters: parameters,
        TemplateURL: `https://${bucketName}.s3.amazonaws.com/${bucketFolder}/${template}`,
        TimeoutInMinutes: 30
    };
    
    return new Promise((resolve, reject) => {
        cloudformation.createStack(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else {
                resolve(data);
            }
        });
    });
};

describe('createStack', () => {
    it('should return stack id', () => {
        createStack(testStackName, testTemplate, parameters, templateBucketName, testTemplateBucketFolder)
        .then((result) => {
            expect(result).to.be.an('object').that.have.property('StackId');
        });
    });
});
