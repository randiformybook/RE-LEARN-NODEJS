const { body } = require("express-validator");
const { findContact } = require("./contact-system");

const validateContact = () => {
  return [
    body("id").custom(async (value, { req }) => {
      const existingContact = await findContact(value);
      if (existingContact && existingContact.id !== req.params.id)
        throw new Error("Contact ID already exist");
      return true;
    }),
    body("nama")
      .trim()
      .escape()
      .isLength({ min: 3 })
      .withMessage("Name minimal 3 caracters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email is not valid, Please check Again"),
    body("nohp")
      .isMobilePhone("id-ID")
      .withMessage("Phone Number is not valid"),
  ];
};

module.exports = {
  validateContact,
};
