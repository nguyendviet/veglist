```javascript
// config.js
const path = require('path');

module.exports = {
    appName: 'YOUR APP NAME',
    templateBucketName: 'YOUR TEMPLATE BUCKET NAME',
    templateFolder: path.join(__dirname, '..', 'cloudformation'),
    templateType: 'json OR yml',
    rootTemplate: 'root-stack.json OR .yml' // This creates the app stack.
};

// pipeline-config.js
module.exports = {
    pipelineTemplate: 'pipeline.json',
    bucketName: 'YOUR WEBSITE BUCKET NAME. GET THIS FROM CLOUDFORMATION APP STACK OUTPUT',
    githubUser: 'YOUR GITHUB USERNAME',
    githubRepo: 'YOUR GITHUB REPO',
    githubBranch: 'YOUR GITHUB BRANCH'
};
```

The `test-config.js` file contains test variables for functions only. Don't use it for dev or prod. Specify each function's variable in that file.