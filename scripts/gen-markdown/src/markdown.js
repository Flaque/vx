const mrk = require('mark-dom');
const reactDocs = require('react-docgen');
const mustache = require('mustache');
const fs = require("fs");
const files = require("./files.js");
const util = require("./util.js");
const showHelpAndQuit = require("./help.js");

/**
 * Renders a mustache template file.
 * @param {filepath} templateFile
 * @param {JSON} data
 */
function renderFile(templateFile, data) {
    if (!fs.existsSync(templateFile)) throw new Error(`ERROR: Can't find file: ${templateFile}. :(`);

    const template = fs.readFileSync(templateFile, "utf8");
    return mustache.render(template, data);
}

/**
 * A wrapper around `reactDocs` that gives you a better error message if something goes wrong.
 */
function parse(file) {
    try {
        return reactDocs.parse(fs.readFileSync(file));
    } catch (err) {
        throw new Error(`Failed to parse file: ${file}. \n\n${err}`);
    }
}

function toMarkdownTable(table) {
  // TODO: mark-dom probably shouldn't work this way...
  return mrk().setTable(table).getAll();
}

function toMarkdown(file) {
    const component = parse(file);
    const markdownTable = toMarkdownTable(util.propsToArray(component.props));
    return renderFile(files.props, {table: markdownTable});
}

module.exports = { toMarkdown }
