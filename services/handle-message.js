const config = require('../config/line');
const { sendWelcomeMsg } = require('./send-welcome-msg');

exports.handleMessage = async (event) => {
    let msg;

    msg = sendWelcomeMsg();

    return config.client.replyMessage(event.replyToken, msg);
}