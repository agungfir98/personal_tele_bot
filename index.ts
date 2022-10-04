import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { MessageHandler } from "./handler/index.js";
import mongoose from "mongoose";
import { createCatetan, getCatetan } from "./handler/catetanHandler/index.js";
const token = process.env.TELE_BOT_TOKEN;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database berhasil terhubung");
  })
  .catch((err) => {
    console.log(err);
  });

export const bot = new TelegramBot(token, { polling: true });

// * Just greeting dan goodbye message ====
bot.on("message", (msg) => {
  MessageHandler(msg);
});

// * Nulis Catetan ========================
bot.onText(/catet (.+)/i, createCatetan);

// * Liat daftar Catetan ======================
bot.onText(/\/catetan/, getCatetan);
