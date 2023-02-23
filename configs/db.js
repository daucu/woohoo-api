const mongoose = require("mongoose")
mongoose.set("strictQuery", true);

const db = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
        }).then((data, err) => {
            if (err) {
                console.log(err)
            }
            else{
                console.log("DB Connected")
            }
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

module.exports = db
