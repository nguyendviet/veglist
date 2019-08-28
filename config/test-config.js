const uuidv4 = require('uuid/v4');
const {appName, templateBucketName, templateFolder, rootTemplate} = require('./config');

module.exports = {
    cleanBucket: {
        // Replace this bucket name with existing pipeline bucket.
        bucket: 'veglist-test-7d54aa10-2cd8-4c39-a4-pipelinebucket-13pepu4z4um6y'
    },
    createStack: {
        testStackName: `test-${appName}-${uuidv4()}`,
        testTemplate: rootTemplate,
        templateBucketName: templateBucketName,
        templateBucketFolder: `${appName}/test`,
        parameters: [
            {
                ParameterKey: 'TemplateBucketPath',
                ParameterValue: `${templateBucketName}/${appName}/test`
            }
        ]
    },
    deleteTestStack: {
        appName: appName
    },
    uploadTemplates: {
        folder : templateFolder,
        type : 'json',
        bucket : `${templateBucketName}/${appName}/test`,
        expectedOutput : [ 
            'api-gateway.json',
            'cognito.json',
            'dynamodb.json',
            'identity-pool.json',
            'pipeline.json',
            'root-stack.json',
            's3-static-website-react.json'
        ]
    }
}