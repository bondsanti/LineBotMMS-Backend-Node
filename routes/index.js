const express = require("express");
const { createRichMenuRepairman } = require("../services/richmenu/create-rich-repairman");
const { createRichMenuUser } = require("../services/richmenu/create-rich-user");
const { deleteRichMenuRepairman } = require("../services/richmenu/delete-rich-repairman");
const { deleteRichMenuUser } = require("../services/richmenu/delete-rich-user");
const { unlinkRichMenuRepairman } = require("../services/richmenu/unlink-rich-repairman");
const router = express.Router();



// localhost:4000/create/rich/user
router.get("/create/rich/user", async function (req, res, next) {
  await createRichMenuUser();
  return res.status(200).json({ message: "สร้างรีชเมนู User สำเร็จ" });
});

// localhost:4000/delete/rich/user
router.get("/delete/rich/user", async function (req, res, next) {
  await deleteRichMenuUser();
  return res.status(200).json({ message: "ลบรีชเมนู User สำเร็จ" });
});


//// repairman ////

// localhost:4000/create/rich/repairman/U860a2eb74fbb8a10ef8233f99c532479
router.get("/create/rich/repairman/:userId", async function (req, res, next) {
  await createRichMenuRepairman(req.params.userId);
  return res.status(200).json({ message: "สร้างรีชเมนู Repairman สำเร็จ" });
});

// localhost:4000/delete/rich/repairman
router.get("/delete/rich/repairman", async function (req, res, next) {
  await deleteRichMenuRepairman();
  return res.status(200).json({ message: "ลบรีชเมนู Repairman สำเร็จ" });
});

//// unlink repairman ////
// localhost:4000/unlink/rich/repairman/U860a2eb74fbb8a10ef8233f99c532479
router.get("/unlink/rich/repairman/:userId", async function (req, res, next) {
  await unlinkRichMenuRepairman(req.params.userId);
  return res.status(200).json({ message: "ยกเลิกสิทธ์ Repairman สำเร็จ" });
});


module.exports = router;
