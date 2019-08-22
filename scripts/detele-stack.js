const {deleteStack} = require('../helpers/stacks');

deleteStack(process.argv[2])
.then((deleted) => {
    console.log(deleted);
})
.catch((err) => console.log(err));
