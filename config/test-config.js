/**
 * All test variables.
 */
resolve = require('path').resolve;
const bucket = require('./config').templateBucket;

module.exports = {
    uploadTemplates: {
        testFolder : '../cloudformation',
        testType : 'json',
        testBucket : `${bucket}/test`,
        expectedOutput : [ 
            'api-gateway.json',
            'cognito.json',
            'dynamodb.json',
            'identity-pool.json',
            'root-stack.json',
            's3-static-website-react.json'
        ]
    }
}
