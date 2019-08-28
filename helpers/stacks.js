process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

/**
 * Function creates CloudFormation stack.
 * @param {stackName} stackName Name of the CloudFormation stack.
 * @param {template} template CloudFormation template file (json or yml).
 * @param {bucketName} bucketName Template bucket name.
 * @param {bucketFolder} bucketFolder Template bucket folder.
 */
const createStack = (...p) => {
    if (!p || p.length === 0) console.log('Err: No parameters.');
    const [stackName, template, parameters, bucketName, bucketFolder] = [...p];
    const params = {
        StackName: stackName, /* required */
        Capabilities: ['CAPABILITY_IAM'],
        OnFailure: 'ROLLBACK',
        Parameters: parameters,
        TemplateURL: `https://${bucketName}.s3.amazonaws.com/${bucketFolder}/${template}`,
        TimeoutInMinutes: 30
    };
    
    return new Promise((resolve, reject) => {
        cloudformation.createStack(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else {
                resolve(data);
            }
        });
    });
};

/**
 * Function deletes a stack or group of stacks that have
 * the same prefix.
 * @param {name} name Name or part of the name of a stack.
 */
const deleteStack = async(name) => {
    if (!name || name === '') console.log('Error: No stack name specified');
    
    const findStacks = () => {
        return new Promise((resolve, reject) => {
            cloudformation.describeStacks({}).promise()
            .then((result) => {
                resolve(result.Stacks);
            })
            .catch((err) => console.log(err));
        })
    };
    const stacks = await findStacks();
    // Filter stacks by name and exclude nested stacks - they have ParentId
    const stacksWanted = stacks.filter((stack) => stack.StackName.includes(name) && !stack.ParentId);

    if (stacksWanted.length != 0) {
        return new Promise((resolve, reject) => {
            stacksWanted.forEach((stack) => {
                const params = {
                    StackName: stack.StackName, /* required */
                };
                cloudformation.deleteStack(params, (err, data) => {
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                        if (data.ResponseMetadata) resolve('200');
                    }
                });
            });
        });
    }
    else return '200';
};

module.exports = {createStack, deleteStack};
