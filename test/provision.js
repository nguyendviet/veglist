const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});
const STACK = require('../config/config').stack;
const TEMPLATE_BUCKET = require('../config/config').buckets.template;

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
    cloudformation.createStack(params, (err, data) => {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
};

describe('createStack', () => {
    it('should return stack id', () => {
        expect(createStack(STACK.name, STACK.rootStack, TEMPLATE_BUCKET.name, TEMPLATE_BUCKET.testFolder)).eventually.to.not.throw(Error);
    });
});
