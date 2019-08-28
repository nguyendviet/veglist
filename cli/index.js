const path = require('path');
const uuidv4 = require('uuid/v4');
const CONFIG = require(path.join(__dirname, '..', 'config'));
const HELPERS = require(path.join(__dirname, '..', 'helpers'));
const APP_CONFIG = CONFIG.app;
const PIPELINE_CONFIG = CONFIG.pipeline;
const {uploadTemplates} = HELPERS.templates;
const {createStack, deleteStack} = HELPERS.stacks;
const args = process.argv;
const STAGE = args[2];
const SCRIPT = args[3];

/**
 * Function executes scripts based on stage.
 * @param {stage} stage Stage of the app passed in from the terminal.
 */
const runAppIn = (stage) => {
    const {appName, rootTemplate, templateBucketName, templateFolder, templateType} = APP_CONFIG;
    const pathToTemplate = `${templateBucketName}/${appName}/${stage}`;
    // If stage is not prod, add random string to the end of the stage name.
    const stackName = stage === 'prod' ? appName : `${appName}-${stage}-${uuidv4()}`;

    switch(SCRIPT) {
        case 'upload-templates':
            uploadTemplates(templateType, templateFolder, pathToTemplate)
            .then((uploaded) => {
                uploaded.forEach((upload) => {
                    console.log(upload.Location);
                });
                console.log(`DONE! ${uploaded.length} template(s) uploaded for ${stage} stage.`);
            })
            .catch((err) => console.log(err));            
        break;
        case 'create-app-stack':
            const stackParams = [
                {
                    ParameterKey: 'TemplateBucketPath',
                    ParameterValue: pathToTemplate
                }
            ];
            

            createStack(stackName, rootTemplate, stackParams, templateBucketName, `${appName}/${stage}`)
            .then((res) => {
                console.log(res);
                console.log(`Started creating CloudFormation stack for:\nApplication: ${appName}\nStack: root\nStage: ${stage}`);
                console.log('This may take a while. Check AWS Console or CLI.');
            })
            .catch((err) => console.log(err));
        break;
        case 'create-pipeline-stack':
            const {bucketName, pipelineTemplate, githubUser, githubRepo, githubBranch} = PIPELINE_CONFIG;
            const pipelineParams = [
                {
                    ParameterKey: 'BucketName',
                    ParameterValue: bucketName
                },
                {
                    ParameterKey: 'GitHubUser',
                    ParameterValue: githubUser
                },
                {
                    ParameterKey: 'GitHubRepo',
                    ParameterValue: githubRepo
                },
                {
                    ParameterKey: 'GitHubBranch',
                    ParameterValue: githubBranch
                }
            ];

            createStack(stackName, pipelineTemplate, pipelineParams, templateBucketName, `${appName}/${stage}`)
            .then((res) => {
                console.log(res);
                console.log(`Started creating CloudFormation stack for:\nApplication: ${appName}\nStack: pipeline\nStage: ${stage}`);
                console.log('This may take a while. Check AWS Console or CLI.');
            })
            .catch((err) => console.log(err));
        break;
        default:
            console.log('No script specified. Please run with a script like this: stage test upload-templates');
            process.emit(0);
    }
};

/**
 * Switch between stage passed in as 2nd arg
 */
switch(STAGE) {
    case 'prod':
        runAppIn('prod');
    break;
    case 'dev':
        runAppIn('dev');
    break;
    case 'test':
        runAppIn('test');
    break;
    default:
        console.log('Error: Please run with stage test, dev or prod.');
        process.exit(1);
}
