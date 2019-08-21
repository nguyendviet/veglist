/**
 * All test variables.
 */
resolve = require('path').resolve;
const uuidv4 = require('uuid/v4');
const {templateBucketName, templateFolder, rootStack} = require('./config');

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
            'root-stack.json',
            's3-static-website-react.json'
        ]
    },
    provision: {
        testStackName: `test-veglist-${uuidv4()}`,
        testTemplate: rootStack,
        templateBucketName: templateBucketName,
        testTemplateBucketFolder: 'test'
    }
}
