/**
 * All test variables.
 */
resolve = require('path').resolve;
const {name, testFolder} = require('./config').buckets.template;
const {folder} = require('./config').stack;

module.exports = {
    uploadTemplates: {
        testFolder : folder,
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
