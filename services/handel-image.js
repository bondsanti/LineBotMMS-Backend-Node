const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const config = require('../config/line');
const { sendLocation } = require('./user_step/step2-location');
const axios = require('axios').default;

exports.handleImage = async (event) => {
    let msg;
    //console.log(event);
    //get content from line server
    const  res  = await axios.get(`https://api-data.line.me/v2/bot/message/${event.message.id}/content`,{
        headers:{ Authorization:"Bearer " + process.env.CHANNEL_ACCESS_TOKEN },
        responseType:"stream"
    });
  

    //กำหนดหรือหา image path
    const projectPath = path.resolve('./');
    const imagePath =  `${projectPath}/public/uploads/`;

    //ส่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    const newFilename = `${uuid.v4()}.jpg`;
    //เขียนไฟล์ไปยัง image path
    res.data.pipe(fs.createWriteStream(imagePath + newFilename));

    //step 2 send Location
    msg = sendLocation();

    return config.client.replyMessage(event.replyToken, msg);
}