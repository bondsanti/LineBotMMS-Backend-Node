const { client } = require("../config/line");
const { updateRepair } = require("./repair");


exports.handlePostback =  async(event)=>{

    let detail = event.postback.data; //อาการเสียงต่าง ๆ
    //console.log(detail);
    const repairData = {
        detail: detail,
        repair_status:1, //1 = แจ้งซ่อมสำเร็จสมบูรณ์
    }

    await updateRepair(global.repairId,repairData);

    let msg = { type: "text", text: "แจ้งซ่อมสำเร็จ!!\nสามารถติดตามงาน ได้ที่เมนู 'ติดตามงานซ่อม' ครับ"};

return client.replyMessage(event.replyToken,msg);
}