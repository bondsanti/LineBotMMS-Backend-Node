const { client } = require("../../config/line");

exports.deleteRichMenuUser = async () => {
  // delete richmenu by alias
  await client.deleteRichMenuAlias("richmenu-alias-user-1");
};