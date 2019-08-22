const fs = require('fs');
process.env.AWS_SDK_LOAD_CONFIG=1;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

/**
 * Function returns a list of files in a folder,
 * filtered by file type.
 * @param  {...any} params file type, path to folder.
 */
const filterFiles = (...params) => {
    if (!params || params.length === 0) console.log('Err: No parameters.');
    const fileType = params[0];
    const folder = params[1];
    const fileList = fs.readdirSync(folder).filter((file) => {
        let str = file;
        if (str.substring(str.lastIndexOf('.') + 1) === fileType) {
            return file;
        }
    });

    return fileList;
};

/**
 * Function uploads list of files to S3 bucket.
 * @param  {...any} params file type, path to folder, bucket name.
 */
const uploadTemplates = (...p) => {
    if (!p || p.length === 0) console.log('Err: No parametes.');
    const [type, folder, bucket] = [...p];
    const fileList = filterFiles(type, folder);
    const promises = fileList.map((file) => {
        const params = {
            Bucket: bucket,
            Key: file,
            Body: fs.readFileSync(`${folder}/${file}`)
        };

        return new Promise((resolve, reject) => {
            s3.upload(params).promise()
            .then((data) => {
                resolve(data);
            })
            .catch((err) => console.log(err));
        });
    });

    return Promise.all(promises)
    .then((allDone) => {
        return allDone;
    })
    .catch((err) => console.log(err));
};

module.exports = {uploadTemplates};
