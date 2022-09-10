const User = require('../../models/user');

exports.createUser =  async(userId,displayName, pictureUrl) => {
    // const user = await User.create({
    //     //ซ้าย = คอลัมในฐานข้อมูล
    //     user_id:userId,
    //     display_name:displayName,
    //     picture_url :pictureUrl
    // });
    // return user;
    return await User.create({
        user_id:userId,
        display_name:displayName,
        picture_url :pictureUrl  
    });
}


exports.isUserExist =  async(userId) => {

    return await User.findOne({ where:{
        user_id:userId
    }});
}

exports.removeUserById =  async(userId) => {

    return await User.destroy({ where:{
        user_id:userId
    }});
}

exports.updateUser =  async(userId,displayName,pictureUrl,isActive) => {

    return await User.update({
        display_name:displayName,
        picture_url:pictureUrl,
        is_active:isActive
    },{
        where:{
        user_id:userId
    }});
}

exports.updateIsActiveUser =  async(userId,isActive) => {

    return await User.update({
        is_active:isActive
    },{
        where:{
        user_id:userId
    }});
}