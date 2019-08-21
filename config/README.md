```javascript
// config.js
resolve = require('path').resolve;
module.exports = {
    templateBucketName: 'YOUR TEMPLATE BUCKET NAME',
    stackName: 'YOUR STACK NAME',
    templateFolder: resolve('./cloudformation'),
    rootStack: 'root-stack.json'
}
```