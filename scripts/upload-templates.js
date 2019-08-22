const {uploadTemplates} = require('../helpers/templates');
const {templateBucketName, testBucketFolder, templateFolder} = require('../config/config');

uploadTemplates('json', templateFolder, `${templateBucketName}/${testBucketFolder}`)
.then((uploaded) => {
    console.log(uploaded);
    console.log(`${uploaded.length} template(s) uploaded.`);
})
.catch((err) => console.log(err));
