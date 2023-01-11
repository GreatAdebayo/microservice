//Modules
const express = require("express");
const { check } = require("express-validator");

// Import express router
const router = express.Router();

// Import controller
const customerController = require("../controllers/index");

/* @route   POST api/auth
   @desc    Creates a new customer
   @access  Public */
router.post("/new_customer", [
  [
    /* Validation rules */
    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email Address required")
      .isEmail()
      .normalizeEmail()
      .withMessage("Must be a valid email"),
    check("password").trim().not().isEmpty().withMessage("Password required"),
  ],
  customerController.newCustomer,
]);

module.exports = router;
