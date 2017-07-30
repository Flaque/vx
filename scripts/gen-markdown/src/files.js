const path = require('path');

const inTemplates = filepath => path.resolve(__dirname, "..", "templates", filepath);
const files = {
    props: inTemplates("props.mustache")
}

module.exports = files;
