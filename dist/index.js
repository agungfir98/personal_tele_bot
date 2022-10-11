import "dotenv/config";
import TelegramBot from "node-telegram-bot-api";
import { MessageHandler } from "./handler/index.js";
import mongoose from "mongoose";
import { createCatetan, getCatetan } from "./handler/catetanHandler/index.js";
import { BalanceHandler, getBalance, getSpecificBalance, handleNarik, } from "./handler/balanceHandler/index.js";
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
// * Set Balance Track ==================
bot.onText(/set balance (.+)/i, BalanceHandler);
bot.onText(/\/get_balance/i, getBalance);
bot.onText(/\/see_history_([A-Z]+)/g, getSpecificBalance);
bot.onText(/narik (.+)/, handleNarik);
bot.onText(/\/help/, (msg, _) => {
    bot.sendMessage(msg.chat.id, `pilihan perintah:\n
  \n1. "catet (isi pikiran)" untuk mencatat pikiran.
  \n2. "set balance (nama bank) (jumlah)" untuk set balance rekeningmu yang mau di pantau.
  \n3. "beli (tipe: ['fnb', 'fuel', 'goods', 'parking', 'tarik_tunai']) (nama barang) (harga)" untuk mencatat pembelian.
  \n4. "narik (jumlah narik)" untuk mencatat penarikan rekeningmu.`);
});
//# sourceMappingURL=index.js.map