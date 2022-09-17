const path = require('path');
const fs = require('fs');
const uuid = require('uuid');

const config = require('../config/line');
const { sendLocation } = require('./user_step/step2-location');
const { takePhoto } = require('./user_step/step1-takephoto');
const { createRepair } = require('./repair');
const axios = require('axios').default;

exports.handleImage = async (event) => {
    let msg;
    //console.log(event.message);
    //get content from line server

    //ถ้าส่งมารูปเดียวจริง
    if (event.message.imageSet == undefined) {
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

        //สร้างใบแจ้งซ่อมใหม่ บันทึกไปที่ตาราง repair
         const repairData = {
            created_by:event.source.userId,
            picture: newFilename,
            repair_status:0,

         }
         const  repairForm = await createRepair(repairData);
         global.repairId = repairForm.id; //last insert id
         

    
        //step 2 send Location
        msg = sendLocation();
    
        return config.client.replyMessage(event.replyToken, msg);
    }else{
        //ถ้าส่งมาหลายภาพ 
        if (event.message.imageSet.index ===1) {
            let msg =[{ type: "text", text: "ขอภัยในความไม่สะดวก \n สามารถส่งรูปได้เพียง 1 รูปเท่านั้น \n กรุณาลองใหม่อีกครั้ง" },
            { type: "sticker", "packageId": "789","stickerId": "10882" }];
            let msg2 = takePhoto();
            msg.push(msg2);


             return config.client.replyMessage(event.replyToken, msg);
        }
    }
}