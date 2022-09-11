const { client } = require("../../config/line");

exports.deleteRichMenuRepairman = async () => {
  // delete richmenu by alias
  await client.deleteRichMenuAlias("richmenu-alias-repairman");
};