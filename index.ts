import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";

import { MessageHandler } from "./utils/switch.js";

const token = process.env.TELE_BOT_TOKEN;

export const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  MessageHandler(msg);
});
