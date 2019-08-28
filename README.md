# veglist

## Installation

Prerequisite:

- AWS account and privileges.
- Package manager [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable).

Clone repository (using SSH) and install dependencies:

```bash
$ git clone git@github.com:nguyendviet/veglist.git
$ cd veglist
$ yarn install
$ cd client
$ yarn install
$ cd ..
```

Create `./config/config.js` based on `./config/README.md`.

Upload templates to template bucket:

```bash
$ pwd
<YOUR PATH>/veglist
$ npm run stage <STAGE NAME> upload-templates
```

Provision infrastructure for the app:

```bash
$ npm run stage <STAGE NAME> create-app-stack
```

Provision infrastructure for the pipeline:

```bash
$ npm run stage <STAGE NAME> create-pipeline-stack
```

Once you've created the nested stack and the pipeline stack, every commit to this repository will trigger the pipeline to make a build to the designated S3 bucket for website hosting.

If you need to delete a stack:

1. Check if the stack created a bucket that contains objects. E.g.: the pipeline stack creates a bucket that contains the artifacts of the pipeline. Also it graps the build from GitHub to put files into the website bucket. So you need to empty those buckets first.
1. Empty bucket:
    ```bash
    $ npm run clean-bucket <BUCKET NAME>
    ```
1. Then you can delete the stack:
    ```bash
    $ npm run delete-stack <YOUR STACK NAME>
    ```

## Test

Modify `.config/test-config.js` for test variables:

```bash
$ npm test
```