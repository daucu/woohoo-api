const router = require("express").Router();

const { getSignatures, getToken } = require("../func");
const moment = require("moment");
const { default: axios } = require("axios");
const Product = require("../models/product_schema");

router.get("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const { offset, limit } = req.query;
    try {
        const url = `https://sandbox.woohoo.in/rest/v3/order/${orderId}/cards/`;
        if (offset != undefined && offset != null && offset != "") {
            url = url + `?offset=${offset}`;
        }
        if (limit != undefined && limit != null && limit != "") {
            url = url + `&limit=${limit}`;
        }
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
            return res.json(err.response.data)
        })

    } catch (err) {
        return res
            .status(500)
            .send({ message: err.message });
    }
});
module.exports = router;