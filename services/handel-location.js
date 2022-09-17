const { client } = require("../config/line");
const { updateRepair } = require("./repair");
const { sendDetail } = require("./user_step/step3-detail");

exports.handleLoc =  async(event)=>{

//console.log(event.message);


//update lat,long to repair table
let location = {type:'Point', coordinates:[event.message.latitude,event.message.longitude]};
const repairData = {
    location:location,
    repair_status:0
}
await updateRepair(global.repairId,repairData);


//รายละเอียด/อาการ เสีย
let msg = sendDetail();

return client.replyMessage(event.replyToken,msg);
}