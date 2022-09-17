exports.sendLocation = () => {
  let msg = 
    {
      type: "text",
      text: "สถานที่ของคุณอยู่ที่ไหน?",
      quickReply: {
        items: [

          {
            type: "action",
            imageUrl: "https://codingthailand.com/site/img/location.png",
            action: {
              type: "location",
              label: "ส่งตำแหน่ง/สถานที่",
            },
          },
          {
            type: "action",
            imageUrl: "https://codingthailand.com/site/img/cancel.png",
            action: {
              type: "message",
              label: "ยกเลิกแจ้งซ่อม",
              text: "ยกเลิกการแจ้งซ่อม",
            },
          },
        ],
      },
    };
  return msg;
};
