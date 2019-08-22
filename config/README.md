```javascript
// config.js
const path = require('path');

module.exports = {
    appName: 'YOUR APP NAME',
    templateBucketName: 'YOUR TEMPLATE BUCKET NAME',
    stackName: 'YOUR STACK NAME',
    templateFolder: path.join(__dirname, '..', 'cloudformation'),
    rootStack: 'root-stack.json'
}
```