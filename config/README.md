```javascript
// config.js
const path = require('path');

module.exports = {
    appName: 'YOUR APP NAME',
    templateBucketName: 'YOUR TEMPLATE BUCKET NAME',
    stackName: 'YOUR STACK NAME',
    templateFolder: path.join(__dirname, '..', 'cloudformation'),
    rootStack: 'root-stack.json',
    pipelineStack: 'pipeline.json',
    pipelineParams: [
        {
            ParameterKey: 'BucketName',
            ParameterValue: 'NAME OF WEBSITE BUCKET CREATED BY NESTED STACKS'
        },
        {
            ParameterKey: 'GitHubUser',
            ParameterValue: 'YOUR GITHUB USER NAME'
        },
        {
            ParameterKey: 'GitHubRepo',
            ParameterValue: 'YOUR GITHUB REPOSITORY NAME'
        },
        {
            ParameterKey: 'GitHubBranch',
            ParameterValue: 'GITHUB BRANCH HOOKED WITH THE PIPELINE'
        }
    ]
}
```