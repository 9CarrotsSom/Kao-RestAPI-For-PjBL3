const express = require("express");
const { checkTime } = require("../controllers/checktime.controller");
const { studentTimestamp } = require("../controllers/studentTimestamp.controller");
const router = express.Router();

router.post("/checktime", checkTime);
router.post("/timestamp", studentTimestamp);

module.exports = router;