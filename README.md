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
```

Create `./config/config.js` based on `./config/README.md`.

Upload templates to template bucket:

```bash
$ pwd
<YOUR PATH>/veglist
$ npm run upload-templates
$ npm run create-stack.js
```

If you need to delete a stack:

```bash
$ npm run delete-stack <YOUR STACK NAME>
```

Once you've created the nested stack and the pipeline stack, every commit to this repository will trigger the pipeline to make a build to the designated S3 bucket for website hosting.


## Test

- Modify `.config/test-config.js` for test variables:
```bash
$ npm test
```