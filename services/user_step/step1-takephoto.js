exports.takePhoto = () => {
  let msg = [
    {
      type: "text",
      text: "ถ่ายภาพอุปกรณ์ที่ต้องการซ่อม",
      quickReply: {
        items: [
          {
            type: "action",
            imageUrl: "https://codingthailand.com/site/img/camera.png",
            action: {
              type: "camera",
              label: "ถ่ายภาพ",
            },
          },
          {
            type: "action",
            imageUrl: "https://codingthailand.com/site/img/camera_roll.png",
            action: {
              type: "cameraRoll",
              label: "ภาพจากอัลบั้ม",
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
    },
  ];
  return msg;
};
