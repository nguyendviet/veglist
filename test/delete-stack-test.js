const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
// const should = chai.should;

const {appName} = require('../config/test-config').deleteTestStack;

process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const cloudformation = new AWS.CloudFormation({apiVersion: '2010-05-15'});

/**
 * Function deletes a stack or group of stacks that have
 * the same prefix.
 * @param {name} name Name or part of the name of a stack.
 */
const deleteStack = async(name) => {
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
                        if (data.ResponseMetadata) resolve('All stacks deleted.');
                    }
                });
            });
        });
    }
    else return 'All stacks deleted.';
};

describe('deleteStack', () => {
    it('should eventually return confirmation: All stacks deleted', () => {
        expect(deleteStack(`test-${appName}`)).eventually.to.equal('All stacks deleted.');
    });
});
