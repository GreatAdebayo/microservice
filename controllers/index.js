const { validationResult } = require("express-validator");
const connection = require("../utils/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.newCustomer = async (req, res) => {
  /* Request validation */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  try {
    // check if email already exists
    connection.execute(
      "SELECT * FROM `customer` WHERE `email` = ?",
      [email],
      function (err, results, fields) {
        if (err)
          return res.status(500).json({
            msg: "something is wrong, we are fixing it",
            status: 500,
            isSucess: false,
          });
        if (results.length > 0)
          return res.status(200).json({
            msg: "customer already exists",
            status: 500,
            isSucess: false,
          });
        // save user details in db
        connection.execute(
          "INSERT INTO customer (id, email, password) VALUES (?, ?, ?)",
          [uuidv4(), email, hash],
          function (err, result) {
            if (err)
              return res.status(500).json({
                msg: "something is wrong, we are fixing it",
                status: 500,
                isSucess: false,
              });
            return res.status(200).json({
              msg: "customer succesfully created",
              status: 200,
              isSucess: true,
            });
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      msg: "something is wrong, we are fixing it",
      status: 500,
      isSucess: false,
    });
  }
};
