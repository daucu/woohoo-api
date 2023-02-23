// env 
require('dotenv').config();
// data base connection 
require('./configs/db')();

// express app 
const express = require("express");
const app = express();
const port = 4000;

// express json body parser
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/auth", require("./routes/auth"));
//Get token by id 
app.use("/token", require("./routes/token"));
//Orders
app.use("/orders", require("./routes/orders"));
//categories
app.use("/categories", require("./routes/categories"));
//products
app.use("/products", require("./routes/products"));

app.listen(port, () => console.log(`Orders cg, Quick api listening on port ${port}!`));
