const express = require("express");
const router = express.Router();
const axios = require("axios");
const moment = require("moment");
const { getToken, getSignatures } = require("../func");

router.post("/", async (req, res) => {
  try {
    const url = "https://sandbox.woohoo.in/rest/v3/orders";
    const token = await getToken();
    const signature = getSignatures("POST", url, req.body);

    axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        'Authorization': `Bearer ${token}`,
        'dateAtClient': moment().toISOString(),
        'signature': signature
      }
    })
      .then((data) => {
        if (data) {
          return res.json({
            data: data.data
          })
        }
      })
      .catch((err) => {
        return res.json({
          message: err.message
        })
      })

  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const url = "https://sandbox.woohoo.in/rest/v3/orders";
    const token = await getToken();
    const signature = getSignatures("GET", url);

    axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "*/*",
        "Authorization": `Bearer ${token}`,
        "dateAtClient": moment().toISOString(),
        "signature": signature
      }
    }).then((data) => {
      if (data) {
        return res.json(data.data)
      }
    }).catch((err) => {
      return res.json({
        message: err.message
      })
    })

  } catch (err) {
    return res
      .status(500)
      .send({ message: err.message });
  }
});



module.exports = router;
