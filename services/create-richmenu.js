const { readFileSync } = require('fs');
const path = require('path');

const { client } = require("../config/line");

exports.createRichMenu = async () => {
  const richMenuAA = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: "My RichMenu",
    chatBarText: "เมนูหลัก",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 833,
          height: 843,
        },
        action: {
          type: "uri",
          uri: "https://google.com",
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
          type: "message",
          text: "roompromotion",
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
          type: "message",
          text: "covid",
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
  const richMenuAAId = await client.createRichMenu(richMenuAA);

  // 2. upload richmenu image
  const imagePath = path.resolve("./") + "/public/images/static/richmenu-aa.png";
  const bufferImage = readFileSync(imagePath);
  await client.setRichMenuImage(richMenuAAId, bufferImage);
  
  // 3. set default menu
  await client.setDefaultRichMenu(richMenuAAId);

  // 4. create alias to richmenu
  await client.createRichMenuAlias(richMenuAAId, "richmenu-alias-aa");

};
