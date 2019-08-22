/**
 * All test variables.
 */
const uuidv4 = require('uuid/v4');
const {appName, templateBucketName, templateFolder, rootStack, testBucketFolder} = require('./config');

module.exports = {
    uploadTemplates: {
        testFolder : templateFolder,
        testType : 'json',
        testBucket : `${templateBucketName}/${testBucketFolder}`,
        expectedOutput : [ 
            'api-gateway.json',
            'cognito.json',
            'dynamodb.json',
            'identity-pool.json',
            'pipeline.json',
            'root-stack.json',
            's3-static-website-react.json'
        ]
    },
    createStack: {
        testStackName: `test-${appName}-${uuidv4()}`,
        testTemplate: rootStack,
        templateBucketName: templateBucketName,
        testTemplateBucketFolder: testBucketFolder,
        parameters: [
            {
                ParameterKey: 'TemplateBucketPath',
                ParameterValue: `${templateBucketName}/${testBucketFolder}`
            }
        ]
    },
    deleteTestStack: {
        appName: appName
    }
}
