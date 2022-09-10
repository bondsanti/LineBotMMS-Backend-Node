const express = require("express");
const router = express.Router();

const { createRichMenu } = require("../services/create-richmenu");
const { deleteRichMenu } = require("../services/delete-richmenu");

// localhost:4000/createrichmenu
router.get("/createrichmenu", async function (req, res, next) {
  await createRichMenu();
  return res.status(200).json({ message: "สร้างเมนูสำเร็จ" });
});

// localhost:4000/deleterichmenu
router.get("/deleterichmenu", async function (req, res, next) {
  await deleteRichMenu();
  return res.status(200).json({ message: "ลบเมนูสำเร็จ" });
});

module.exports = router;
