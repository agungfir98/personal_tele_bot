import { Message } from "node-telegram-bot-api";
import { bot } from "../index.js";
import { byeText, haloText } from "../keyword.js";
import { HandlerCatetan } from "./Catetan/index.js";

export const MessageHandler = (msg: Message) => {
  const { OWNER } = process.env;
  const chatId = msg.chat.id;
  const text = msg.text;

  if (OWNER !== chatId.toString()) {
    bot.sendMessage(chatId, "ga blh msk! 😜");
  }

  switch (true) {
    case byeText.includes(text):
      bot.sendMessage(
        chatId,
        "Terima kasih, silahkan hubungi aku lagi dikala perlu! 💗"
      );
      break;
    case haloText.includes(text):
      bot.sendMessage(chatId, `Haloo ${msg.chat.first_name}`);
      break;
    default:
      break;
  }

  HandlerCatetan(chatId);
};
