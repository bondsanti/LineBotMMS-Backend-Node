const { client } = require('../config/line');
const userService = require('./user/index');

exports.handleFollow = async(event) => {
    const userId = event.source.userId;
    console.log('มีคนติดตาม / เลิก block คือ : '+ userId);

    //get user profile
   const profile = await client.getProfile(userId);
   //console.log(profile);

   //insert user to table

   const isCheckUser = await userService.isUserExist(userId);
   
   if(!isCheckUser){
    //ถ้าไม่มี user ให้เพิ่ม user ใหม่
    await userService.createUser(
        profile.userId,
        profile.displayName,
        profile.pictureUrl
    )
   }else{
    //ถ้ามี user ให้อัพเดทข้อมูล user คนนั้นใหม่
    await userService.updateUser(profile.userId,profile.displayName,profile.pictureUrl,1);
   }

}