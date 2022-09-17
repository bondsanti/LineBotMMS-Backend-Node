exports.sendDetail= () => {
  let items=[];

  let detail =['เปิดไม่ติด','ปริ้นไม่ออก','เชื่อมอินเตอร์เน็ตไม่ติด','เครื่องค้าง','อื่น ๆ'];

  items = detail.map((item)=>{
    return{
        type:"action",
        action:{
            type:"postback",
            label:item,
            data:item
        }
    }
  });

  let msg = 
    {
      type: "text",
      text: "โปรดเลือกอาการเบื้องต้น?",
      quickReply: {
        items: items
      },
    };

  return msg;
};
