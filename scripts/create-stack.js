const {createStack} = require('../helpers/stacks');
const {appName, pipelineStack, pipelineParams, templateBucketName, testBucketFolder} = require('../config/config');

createStack(`test-${appName}`, pipelineStack, pipelineParams, templateBucketName, testBucketFolder)
.then((created) => {
    console.log(created);
    console.log('Stack created.');
})
.catch((err) => console.log(err));
