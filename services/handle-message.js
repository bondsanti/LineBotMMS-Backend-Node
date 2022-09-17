const config = require('../config/line');
const { deleteImageWhenUnCompleted, deleteRepairFormUnCompleted } = require('./repair');
const { sendFollowupRepairUser } = require('./repair/send-followup-repair-user');
const { takePhoto } = require('./user_step/step1-takephoto');


exports.handleMessage = async (event) => {
    let msg;

    let msgFormChat = event.message.text.trim();

    const userId = event.source.userId;
    
    if (msgFormChat === "เริ่มการแจ้งซ่อม") {
        await deleteImageWhenUnCompleted(userId);
        await deleteRepairFormUnCompleted(userId);
        msg = takePhoto();
    }else if(msgFormChat === "ยกเลิกการแจ้งซ่อม"){
        await deleteImageWhenUnCompleted(userId);
        await deleteRepairFormUnCompleted(userId);
        msg = [
        { type: "text", text: "ขอบคุณที่ใช้บริการ \n ไว้มาใช้บริการใหม่นะครับ" },
        { type: "sticker", "packageId": "789","stickerId": "10888" }];
    }else if(msgFormChat === "ติดตามงานซ่อมของฉัน"){
  
        msg=await sendFollowupRepairUser(event);

    }else{
        msg = { type: "text", text: "ต้องการแจ้งซ่อม กรุณาเลือกที่รีชเมนู" };
    }

    return config.client.replyMessage(event.replyToken, msg);
}