const userService = require('./user/index');


exports.handleUnfollow = async(event) =>{
    const userId = event.source.userId;
    console.log('มีคน block / เลิกเป็นเพื่อนแล้ว คือ : '+ userId);

    const isCheckUser = await userService.isUserExist(userId);

    if(isCheckUser){
        //await userService.removeUserById(userId);
        await userService.updateIsActiveUser(userId,0); //is_active =0 (block/unfollow)
    }

}