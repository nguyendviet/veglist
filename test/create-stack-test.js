const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});
const {templateBucketName, testStackName, testTemplate, testTemplateBucketFolder} = require('../config/test-config').provision;

/**
 * Function creates CloudFormation root stack.
 * @param {stackName} stackName Name of the CloudFormation stack.
 * @param {template} template CloudFormation template file (json or yml).
 * @param {bucketName} bucketName Template bucket name.
 * @param {bucketFolder} bucketFolder Template bucket folder.
 */
const createStack = (stackName, template, bucketName, bucketFolder) => {
    const params = {
        StackName: stackName, /* required */
        Capabilities: ['CAPABILITY_IAM'],
        OnFailure: 'ROLLBACK',
        Parameters: [
            {
                ParameterKey: 'TemplateBucketPath',
                ParameterValue: `${bucketName}/${bucketFolder}`
            }
        ],
        TemplateURL: `https://${bucketName}.s3.amazonaws.com/${bucketFolder}/${template}`,
        TimeoutInMinutes: 30
    };
    
    return new Promise((resolve, reject) => {
        cloudformation.createStack(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else {
                console.log(data);
                resolve(data);
            }
        });
    });
};

describe('createStack', () => {
    it('should return stack id', () => {
        expect(createStack(testStackName, testTemplate, templateBucketName, testTemplateBucketFolder)).eventually.to.deep.include('StackId');
    });
});
