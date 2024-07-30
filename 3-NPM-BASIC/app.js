const validator = require("validator");
const chalk = require("chalk");
// const isEmail = require("validator/lib/isEmail");

// console.log(isEmail("randi@email.com"));
console.log(validator.isEmail("randi.triconville@gmail.com"));
console.log(validator.isMobilePhone("0819873964", "id-ID"));
console.log(chalk.black.bgWhite.underline.bold("Hello world!"));
