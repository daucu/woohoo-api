const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  var clientId = "d70aad72e6ca71e7d2114a38bfd4630a";
  var username = "techtreeapisandboxb2b@woohoo.in";
  var password = "techtreeapisandboxb2b@123";

  const data = {
    clientId,
    username,
    password,
  };

  axios
    .post("https://sandbox.woohoo.in/oauth2/verify", data)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        res.send(response.data);
      } else {
        console.error(response.data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
