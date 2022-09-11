const { readFileSync } = require('fs');
const path = require('path');

const { client } = require("../../config/line");

exports.createRichMenuRepairman = async (userId) => {
  const richMenuRepairman = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: "My RichMenu Repairman",
    chatBarText: "เมนูหลักสำหรับช่าง",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 833,
          height: 843,
        },
        action: {
          type: "message",
          text: "รายการแจ้งซ่อม",
        },
      },
      {
        bounds: {
          x: 834,
          y: 0,
          width: 833,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "https://facebook.com",
        },
      },
      {
        bounds: {
          x: 1666,
          y: 0,
          width: 833,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "https://codingthailand.com",
        },
      },
      {
        bounds: {
          x: 0,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "tel:09001234567",
        },
      },
      {
        bounds: {
          x: 843,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "https://hotmail.com",
        },
      },
      {
        bounds: {
          x: 1666,
          y: 843,
          width: 833,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "https://codingthailand.com",
        },
      },
    ],
  };

  // 1. create richmenu
  const richMenuRepairmanId = await client.createRichMenu(richMenuRepairman);

  // 2. upload richmenu image
  const imagePath = path.resolve("./") + "/public/images/repairman-menu.png";
  const bufferImage = readFileSync(imagePath);
  await client.setRichMenuImage(richMenuRepairmanId, bufferImage);

  // 3. create alias to richmenu
  await client.createRichMenuAlias(richMenuRepairmanId, "richmenu-alias-repairman");

  // 4. set richmenu to userId (Repairman)
  await client.linkRichMenuToUser(userId, richMenuRepairmanId);

};