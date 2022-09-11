const { client } = require("../../config/line");

exports.unlinkRichMenuRepairman = async (userId) => {
  // unlink richmenu by userId
  await client.unlinkRichMenuFromUser(userId);
};