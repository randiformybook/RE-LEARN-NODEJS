const validator = require("validator");
const chalk = require("chalk");
const { default: isEmail } = require("validator/lib/isEmail");

console.log(validator, isEmail(""));
console.log(chalk.blue("Hello world!"));
