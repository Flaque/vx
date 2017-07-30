const pkg = require("../package.json");

const HELP_TEXT = `
description:
  ${pkg.description}
usage:
  ${pkg.name} <path>`

function showHelpAndQuit(error) {
  if (error) console.error(error);
  console.log(HELP_TEXT);
  process.exit();
}

module.exports = showHelpAndQuit;
