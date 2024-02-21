require("dotenv").config();

module.exports = {
    port: process.env.PORT,
    secretKey: process.env.SECRET_KEY,
    api: {
        lineNotifyToken: process.env.LINE_NOTIFY_TOKEN,
    }
}