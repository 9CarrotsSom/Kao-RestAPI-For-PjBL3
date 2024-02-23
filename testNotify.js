const { sendLineNotify } = require("./utils/sendLineNotify");
const config = require("./config/config");

(async() =>{
    await sendLineNotify("รหัสนักเรียน : 65202910008 \nพบว่ายังไม่เเสกนบัตรออก", config.api.lineNotifyToken);
})();
