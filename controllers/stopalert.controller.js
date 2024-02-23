const { convertTimestampToLocalString } = require("../utils/convertTimestampToLocalString");
const { getDaysOfWeekFromTimestamp } = require("../utils/getDaysOfWeekFromTimestamp");
const { convertTimestampToDate } = require("../utils/convertTimestampToDate");
const config = require("../config/config");
const { convertTimestampToTime } = require("../utils/convertTimestampToTime");
const { sqliteExecute } = require("../database/connect");
const { sendLineNotify } = require("../utils/sendLineNotify");

async function stopAlert(req, res){
    const { secretKey } = req.body ?? {};
    if(!secretKey){
        return res.json({
            status: "FAIL",
            message: "Please complete your information",
        });
    }

    if(secretKey !== config.secretKey){
        return res.json({
            status: "FAIL",
            message: "Invalid secret key",
        });
    }

    const updateTimestampOutQuery = "UPDATE student_timestamp SET timestamp_out=? WHERE timestamp_out IS NULL";
    await sqliteExecute.run(updateTimestampOutQuery, [String("-")]);
    return res.json({
        status: "OK",
        message: "Success",
    });
}


module.exports = {
    stopAlert,
}