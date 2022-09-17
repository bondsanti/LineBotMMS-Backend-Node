const { handleImage } = require("./handel-image");
const { handleLoc } = require("./handel-location");
const { handlePostback } = require("./handel-postback");
const { handleFollow, handleUnFollow } = require("./handel-users");
const { handleMessage } = require("./handle-message");


// event handler
exports.handleEvent =  (event) => {
  // console.log(event.message.type);
  switch (event.type) {
    case "message":
      switch (event.message.type) {
        case "text":
           handleMessage(event);
          break;
        case "image":
          // console.log("image message");
          handleImage(event);
          break;
        case "location":
         //console.log("location"+ event);
         handleLoc(event);
          break;
        default:
          throw new Error(
            "Unknown message " + JSON.stringify(event.message.type)
          );
      }
      break;
    case "postback":
      //console.log("postback");
      handlePostback(event);
      break;
    case "follow":
      //console.log('มีคนติดตาม / เลิก block คือ : ' + event.source.userId);
      handleFollow(event);
      break;
    case "unfollow":
      //console.log('มีคน block / เลิกเป็นเพื่อนแล้ว');
      handleUnFollow(event);
      break;
    default:
      throw new Error("Unknown event " + JSON.stringify(event));
  }
};
