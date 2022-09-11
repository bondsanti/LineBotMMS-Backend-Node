const { client } = require('../config/line');
const userService = require('./user/index');
const { sendWelcomeMsg } = require('./send-welcome-msg');

exports.handleFollow = async(event) => {
    const userId = event.source.userId;
    console.log('มีคนติดตาม / เลิก block คือ : '+ userId);

    //get user profile
   const profile = await client.getProfile(userId);
   //console.log(profile);

   //insert user to table

   const isCheck = await userService.isUserExist(userId);
   
   if(!isCheck){
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

   let msg;
   msg = sendWelcomeMsg();
   return client.replyMessage(event.replyToken, msg);

}

exports.handleUnFollow = async(event) =>{
    const userId = event.source.userId;
    console.log('มีคน block / เลิกเป็นเพื่อนแล้ว คือ : '+ userId);

    const isCheck = await userService.isUserExist(userId);

    if(isCheck){
        //await userService.removeUserById(userId);
        await userService.updateIsActiveUser(userId,0); //is_active =0 (block/unfollow)
    }

}