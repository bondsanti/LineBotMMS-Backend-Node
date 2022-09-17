const fs = require('fs').promises;
const path =require('path');
const { Op } = require('sequelize'); //!= >= <= ==
const Repair = require('../../models/repair');


/*
repair_status
0 = อยู่ระหว่างดำเนินการแจ้ง
1 = แจ้งซ่อมสำเร็จสมบูรณ์
2 = ซ่อมเสร็จแล้ว
*/

//สร้าง repair

exports.createRepair = async(repairData)=>{
    return await Repair.create(repairData);
}

exports.updateRepair = async(repairID,repairData)=>{
    return await Repair.update(repairData,{
        where:{
            id:repairID
        }
    });
}


// ลบ record ของ user อยู่ระหว่างดำเนินการแจ้ง (repair_status = 0)
exports.deleteRepairFormUnCompleted = async (userId) => {
    return await Repair.destroy({
      where: {
        created_by: userId,
        repair_status: 0,
      },
    });
  };
  
  // ค้นหาภาพที่ อยู่ระหว่างดำเนินการแจ้ง แล้วลบออกจาก server
  exports.deleteImageWhenUnCompleted = async (userId) => {
    const repairForm = await Repair.findOne({
      attributes: ["picture"],
      where: {
        created_by: userId,
        repair_status: 0,
      },
    });
  
    if (repairForm) {
      //หา path จริงของโปรเจค
      const projectPath = path.resolve("./");
      //path ของไฟล์ภาพที่ต้องการลบ พร้อมชื่อที่ได้จาก table
      const filePath = `${projectPath}/public/uploads/${repairForm.picture}`;
  
      await fs.unlink(filePath); // delete image
    }
  };

  // ค้นหาการแจ้งซ่อมของ UserId
  exports.getRepairAllByUser = async (userId) =>{
    return await Repair.findAll({
      where:{
        created_by:userId,
        repair_status:{
          [Op.ne]:0 // not eq
        }
      },
      order:[['id','DESC']],
      limit:10
    })
  }