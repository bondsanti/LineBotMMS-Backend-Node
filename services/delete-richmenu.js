const { client } = require("../config/line");

exports.deleteRichMenu = async () => {
  // delete richmenu by alias
  await client.deleteRichMenuAlias("richmenu-alias-aa");
};
