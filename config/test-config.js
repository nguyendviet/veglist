/**
 * All test variables.
 */
const uuidv4 = require('uuid/v4');
const {appName, templateBucketName, templateFolder, rootStack} = require('./config');

module.exports = {
    uploadTemplates: {
        testFolder : templateFolder,
        testType : 'json',
        testBucket : `${templateBucketName}/test`,
        expectedOutput : [ 
            'api-gateway.json',
            'cognito.json',
            'dynamodb.json',
            'identity-pool.json',
            "pipeline.json",
            'root-stack.json',
            's3-static-website-react.json'
        ]
    },
    createTestStack: {
        testStackName: `test-${appName}-${uuidv4()}`,
        testTemplate: rootStack,
        templateBucketName: templateBucketName,
        testTemplateBucketFolder: 'test'
    },
    deleteTestStack: {
        appName: appName
    }
}
