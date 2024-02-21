const { convertTimestampToLocalString } = require("../utils/convertTimestampToLocalString");
const { getDaysOfWeekFromTimestamp } = require("../utils/getDaysOfWeekFromTimestamp");
const { convertTimestampToDate } = require("../utils/convertTimestampToDate");
const config = require("../config/config");
const { convertTimestampToTime } = require("../utils/convertTimestampToTime");
const { sqliteExecute } = require("../database/connect");
const { sendLineNotify } = require("../utils/sendLineNotify");

async function checkTime(req, res){
    const { secretKey, currentTime } = req.body ?? {};

    if(!secretKey || !currentTime){
        return res.json({
            status: "FAIL",
            message: "Please complete require information",
            error: "Please complete require information",
        });
    }

    if(secretKey !== config.secretKey){
        return res.json({
            status: "FAIL",
            message: "Invalid secret key",
            error: "Invalid secret key"
        });
    }

    const convertedToGMTPlus7Time = parseInt(currentTime) + (7 * 60 * 60 * 1000);

    const dayOfWeek = getDaysOfWeekFromTimestamp(convertedToGMTPlus7Time);
    if(dayOfWeek === "Saturday" || dayOfWeek === "Sunday"){
        return res.json({
            status: "OK",
            message: "Now is Weekend no student naja",
            error: "",
        });
    }

    const dateObj = convertTimestampToDate(parseInt(currentTime));
    const dateString = `${dateObj.day},${dateObj.month},${dateObj.year}`;
    const convertedToTime = convertTimestampToTime(parseInt(currentTime));
    if(convertedToTime.hours >= 8 && convertedToTime.minutes >= 30){
        const checkForLeftStudentInBusQuery = "SELECT * FROM student_timestamp WHERE date=? AND timestamp_out IS NULL";
        const { results } = await sqliteExecute.all(checkForLeftStudentInBusQuery, [String(dateString)]);
        if(results.length === 0){
            return res.json({
                status: "OK",
                message: "Everything is OK",
                error: null,
                data: {
                    alert: "false",
                }
            });
        }
        results.forEach(async studentData =>{
            await sendLineNotify(`ลูกคุณมึงตัวไหนมัน ID : ${studentData.student_id} ลูกมึงจะเเห้งตายในรถกูอยู่เเล้วอีดอก!`, config.api.lineNotifyToken);
        });
        return res.json({
            status: "OK",
            message: "Found student not checkout in time",
            error: null,
            data: {
                alert: "true"
            }
        });
    }
    else {
        return res.json({
            status: "OK",
            message: "Not time for check",
            error: null,
            data: {
                alert: "false",
            }
        });
    }
}


module.exports = {
    checkTime,
}