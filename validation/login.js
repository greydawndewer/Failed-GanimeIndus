const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.fname = !isEmpty(data.fname) ? data.fname : "";
  data.lname = !isEmpty(data.lname) ? data.lname: "";
// Email checks
if (Validator.isEmpty(data.fname)) {
    errors.fname = "UserName field is required";
  }
// Password checks
  if (Validator.isEmpty(data.lname)) {
    errors.lname = "Password field is required";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};