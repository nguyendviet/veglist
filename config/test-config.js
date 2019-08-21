/**
 * All test variables.
 */
resolve = require('path').resolve;
const {name, testFolder} = require('./config').buckets.template;

module.exports = {
    uploadTemplates: {
        testFolder : '../cloudformation',
        testType : 'json',
        testBucket : `${name}/${testFolder}`,
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
