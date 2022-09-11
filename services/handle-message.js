const config = require('../config/line');
const { takePhoto } = require('./user_step/step1-takephoto');


exports.handleMessage = async (event) => {
    let msg;

    let msgFormChat = event.message.text.trim();
    
    if (msgFormChat === "เริ่มการแจ้งซ่อม") {
        msg = takePhoto();
    }else if(msgFormChat === "ยกเลิกการแจ้งซ่อม"){
        msg = [
        { type: "text", text: "ขอบคุณที่ใช้บริการ \n ไว้มาใช้บริการใหม่นะครับ" },
        { type: "sticker", "packageId": "789","stickerId": "10888" }];
    }else{
        msg = { type: "text", text: "ต้องการแจ้งซ่อม กรุณาเลือกที่รีชเมนู" };
    }

    return config.client.replyMessage(event.replyToken, msg);
}