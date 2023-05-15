const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateRegisterInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.lname = !isEmpty(data.lname) ? data.lname : "";
// Name checks
  if (Validator.isEmpty(data.fname)) {
    errors.fname = "Username field is required";
  }
// Email checks
  /*if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }*/
// Password checks
  if (Validator.isEmpty(data.lname)) {
    errors.lname = "Password field is required";
  }
  else if (!Validator.isLength(data.lname, { min: 6, max: 30 })) {
    errors.lname = "Password must be at least 6 characters";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};1