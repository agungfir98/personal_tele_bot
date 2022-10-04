import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { MessageHandler } from "./handler/messageHandler.js";
import mongoose from "mongoose";
const token = process.env.TELE_BOT_TOKEN;

mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    console.log("Database berhasil terhubung");
  })
  .catch((err) => {
    console.log(err);
  });

export const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  MessageHandler(msg);
});
