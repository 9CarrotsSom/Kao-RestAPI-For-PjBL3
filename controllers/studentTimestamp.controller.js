const { sqliteExecute } = require("../database/connect");
const { convertTimestampToLocalString } = require("../utils/convertTimestampToLocalString");
const { getDaysOfWeekFromTimestamp } = require("../utils/getDaysOfWeekFromTimestamp");
const { convertTimestampToDate } = require("../utils/convertTimestampToDate");
const { sendLineNotify } = require("../utils/sendLineNotify");
const config = require("../config/config");

async function studentTimestamp(req, res){
    const { secretKey, studentId, timestamp } = req.body ?? {};

    if(!secretKey || !studentId || !timestamp){
        return res.json({
            status: "FAIL",
            message: "Please complete require information",
            error: "Please complete require information"
        });
    }

    if(secretKey !== config.secretKey){
        return res.json({
            status: "FAIL",
            message: "Invalid secret key",
            error: "Invalid secret key"
        });
    }

    const dateObj = convertTimestampToDate(parseInt(timestamp));
    const dateString = `${dateObj.day},${dateObj.month},${dateObj.year}`;

    const getCurrentStudentDataQuery = "SELECT unique_id FROM student_timestamp WHERE student_id=? AND date=? AND timestamp_out IS NULL";
    const getStudentTimestampCache = await sqliteExecute.get(getCurrentStudentDataQuery, [String(studentId), String(dateString)]);

    if(getStudentTimestampCache.results.length === 0){
        await sendLineNotify(`รหัสนักเรียน : ${studentId} \nได้ขึ้นรถเเล้ว`, config.api.lineNotifyToken);
        const getCurrentServerTime = new Date().getTime();
        const createNewStudentTimestampCacheQuery = "INSERT INTO student_timestamp(student_id,timestamp_in,create_at,date) VALUES (?,?,?,?)";
        await sqliteExecute.run(createNewStudentTimestampCacheQuery, [String(studentId), String(timestamp), String(getCurrentServerTime), String(dateString)]);
        return res.json({
            status: "OK",
            message: `Create new timestamp for ID : ${studentId} SUCCESS!`,
            error: null,
        });
    }
    else {
        await sendLineNotify(`รหัสนักเรียน : ${studentId} \nได้ลงจากรถเเล้ว`, config.api.lineNotifyToken);
        const getCurrentServerTime = new Date().getTime();
        const updateOutTimeQuery = "UPDATE student_timestamp SET timestamp_out=? WHERE unique_id=?";
        await sqliteExecute.run(updateOutTimeQuery, [String(getCurrentServerTime), String(getStudentTimestampCache.results[0].unique_id)]);
        return res.json({
            status: "OK",
            message: `Update timestamp_out for ID : ${studentId} SUCCESS!`,
            error: null,
        });
    }
}


module.exports = {
    studentTimestamp,
}