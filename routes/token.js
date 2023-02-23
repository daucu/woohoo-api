const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:id", (req, res) => {
  //Get auth code from id
  const authorizationCode = req.params.id;

  var clientId = "d70aad72e6ca71e7d2114a38bfd4630a";
  var clientSecret = "6fd59feb7effbde5d3c1fba488db6e1a";

  const data = {
    clientId,
    clientSecret,
    authorizationCode,
  };

  axios
    .post("https://sandbox.woohoo.in/oauth2/token", data)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        res.send(response.data);
      } else {
        console.error(response.data);
      }
    });
});

module.exports = router;
