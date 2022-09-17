const { readFileSync } = require('fs');
const path = require('path');

const { client } = require("../../config/line");

exports.createRichMenuUser = async () => {
  const richMenuUser = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: "My RichMenu User",
    chatBarText: "เมนูหลักสำหรับผู้ใช้",
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
          text: "เริ่มการแจ้งซ่อม",
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
          type: "message",
          text: "ติดตามงานซ่อมของฉัน",
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
  const richMenuUserId = await client.createRichMenu(richMenuUser);

  // 2. upload richmenu image
  const imagePath = path.resolve("./") + "/public/images/user-menu.png";
  const bufferImage = readFileSync(imagePath);
  await client.setRichMenuImage(richMenuUserId, bufferImage);
  
  // 3. set default menu for all users
  await client.setDefaultRichMenu(richMenuUserId);

  // 4. create alias to richmenu *ถ้าไม่อยากติดแคชให้สร้างชื่อใหม่
  await client.createRichMenuAlias(richMenuUserId, "richmenu-alias-user-1");

};