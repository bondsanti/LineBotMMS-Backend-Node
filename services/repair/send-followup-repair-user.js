const { format } = require('date-fns');
const { th } = require('date-fns/locale');
const { getRepairAllByUser } = require(".");

exports.sendFollowupRepairUser = async (event) => {
  const repairForms = await getRepairAllByUser(event.source.userId);

  let bubbles = [];

  bubbles = repairForms.map((item) => {
    let status = "";
    if (item.repair_status === 1) {
      status = "อยู่ระหว่างดำเนินการ";
    } else if (item.repair_status === 2) {
      status = "ซ่อมสำเร็จเรียบร้อย";
    }

    return {
      type: "bubble",
      hero: {
        type: "image",
        url: process.env.BASE_URL + "/uploads/" + item.picture,
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "ใบแจ้งซ่อม No. " + item.id,
            weight: "bold",
            size: "xl",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "อาการเสีย:",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: item.detail,
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 2,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "แจ้งเมื่อ: ",
                    color: "#aaaaaa",
                    size: "sm",
                    flex: 1,
                  },
                  {
                    type: "text",
                    text: format(
                      new Date(item.created_at),
                      "d MMMM yyyy HH:mm:ss",
                      { locale: th }
                    ),
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "text",
            text: "สถานะ: " + status,
            size: "lg",
            align: "center",
            color: status === "อยู่ระหว่างดำเนินการ" ? "#F34237" : "#07A673",
          },
        ],
        flex: 0,
      },
    };
  });

  let msg = {
    type: "flex",
    altText: "รายการแจ้งซ่อมของฉัน",
    contents: {
      type: "carousel",
      contents: bubbles,
    },
  };

  return msg;
};
