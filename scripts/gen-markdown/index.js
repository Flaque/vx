const {toMarkdown} = require("./src/markdown.js");
const readArgs = require('minimist');
const fs = require('fs');

// Read in arguments and validate that we're good
const args = readArgs(process.argv.slice(2));
if (args._.length === 0) { showHelpAndQuit("Error: path is required."); }

const string = toMarkdown(args._[0]);
fs.writeFileSync("output.md", string);
