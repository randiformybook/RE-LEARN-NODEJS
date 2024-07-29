const validator = require("validator");
const chalk = require("chalk");
const { default: isEmail } = require("validator/lib/isEmail");

console.log(validator, isEmail("randi@email.com"));
console.log(chalk.bgRed.white("Hello world!"));
