const router = require('express').Router();

const { getSignatures, getToken } = require('../func');
const moment = require('moment');
const { default: axios } = require('axios');
const Product = require('../models/product_schema');

router.get("/", async (req, res) => {
    const allProds = await Product.find({ updatedAt: { $gt: moment().subtract(28, 'days').toISOString() } });
    
    if (allProds.length > 0) {
        return res.json({
            data: allProds
        })
    }
    
    const { categoryId } = req.query;
    let url = `https://sandbox.woohoo.in/rest/v3/catalog/categories/${categoryId}/products`;
    let token = await getToken();
    const signature = getSignatures("GET", url);

    try {
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,
                "dateAtClient": moment().toISOString(),
                "signature": signature
            }
        }).then(async (data) => {
            // delete all doc
            await Product.deleteMany({})
            // insert new doc
            const newProd = await Product.create(
                data.data
            );

            return res.json(newProd)
        }).catch(e => {
            return res.json({
                message: e.response.data
            })
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})

// GET Product by sku 
router.get("/sku/:sku", async (req, res) => {
    const { sku } = req.params;
    let token = await getToken();

    let url = `https://sandbox.woohoo.in/rest/v3/catalog/products/${sku}`;
    const signature = getSignatures("GET", url);
    try {
        const response = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,
                "dateAtClient": moment().toISOString(),
                "signature": signature
            }
        })

        return res.json({
            data: response.data
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})


module.exports = router;