const {deleteStack} = require('../helpers/stacks');

deleteStack(process.argv[2])
.then((deleted) => {
    console.log(deleted);
    console.log('Stack deletion may take a while. Make sure all resources are deleted by checking AWS Console or CLI.');
})
.catch((err) => console.log(err));
