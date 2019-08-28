const path = require('path');
const {deleteStack} = require(path.join(__dirname, '..', 'helpers')).stacks;
const STACK_NAME = process.argv[2];

deleteStack(STACK_NAME)
.then((deleted) => {
    console.log(deleted);
    console.log(`Started deleting CloudFormation stack: ${STACK_NAME}`);
    console.log('This may take a while. Check AWS Console or CLI.');
})
.catch((err) => console.log(err));
