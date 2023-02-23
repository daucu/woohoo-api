const router = require('express').Router();
const { default: axios } = require('axios');
const moment = require('moment');
const { getSignatures, getToken } = require('../func');
const Category = require('../models/category_schema');


router.get("/", async (req, res) => {
    const allCats = await Category.find({ updatedAt: { $gt: moment().subtract(28, 'days').toISOString() } });

    if (allCats.length > 0) {
        return res.json(allCats)
    }


    const token = await getToken();
    console.log(token);
    const signature = getSignatures('GET', 'https://sandbox.woohoo.in/rest/v3/catalog/categories')

    try {
        axios.get("https://sandbox.woohoo.in/rest/v3/catalog/categories?q=1", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": `Bearer ${token}`,
                "dateAtClient": moment().toISOString(),
                "signature": signature
            }
        }).then(async (data) => {
            // delete all doc
            await Category.deleteMany({});
            // insert new doc
            const newCat = await Category.create(
                data.data
            );

            return res.json(newCat)
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})

router.get("/:categoryId", async (req, res) => {
    const { categoryId } = req.params;
    const allCats = await Category.findOne({
        id: categoryId,
        updatedAt: {
            $gt: moment().subtract(28, 'days').toISOString()
        }
    });

    if (allCats) {
        return res.json(allCats)
    }


    const token = await getToken();
    const url = `https://sandbox.woohoo.in/rest/v3/catalog/categories/${categoryId}`;

    const signature = getSignatures('GET', url);

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
            await Category.deleteOne({
                id: categoryId
            });
      
            // insert new doc
            const newCat = await Category.create(
                data.data
            );

            return res.json(newCat)
        }).catch((err) => {
            return res.json(err.response.data)
        })
    } catch (e) {
        return res.json({
            message: e.message
        })
    }
})


module.exports = router;